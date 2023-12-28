import type { NextApiRequest, NextApiResponse } from "next";
import type { Comment } from "../../interfaces";
import redis from "../redis";
import { nanoid } from "nanoid";
import getUser from "../getUser";
import clearUrl from "../clearUrl";

/**
 * 댓글 생성
 * @param req 요청 객체
 * @param res 응답 객체
 * @returns 프로미스 객체
 */
export default async function createComments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 요청 정보 조회
  const url = clearUrl(req.headers.referer);
  const { text } = req.body;
  const { authorization } = req.headers;

  if (!text || !authorization) {
    return res.status(400).json({ message: "Missing parameter." });
  }

  if (!redis) {
    return res
      .status(400)
      .json({ message: "Failed to connect to redis client." });
  }

  try {
    // 사용자 토큰 검증
    const user = await getUser(authorization);
    if (!user) return res.status(400).json({ message: "Need authorization." });

    const { name, picture, sub, email } = user;

    const comment: Comment = {
      id: nanoid(),
      created_at: Date.now(),
      url,
      text,
      user: { name, picture, sub, email },
    };

    // redis에 댓글 추가
    await redis.lpush(url, JSON.stringify(comment));

    return res.status(200).json(comment);
  } catch (_) {
    return res.status(400).json({ message: "Unexpected error occurred." });
  }
}
