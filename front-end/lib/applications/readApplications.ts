import type { NextApiRequest, NextApiResponse } from "next";
import type { Comment } from "../../interfaces";
import redis from "../redis";
import clearUrl from "../clearUrl";

/**
 * 댓글 목록조회
 * @param req 요청 객체
 * @param res 응답 객체
 * @returns 프로미스 객체
 */
export default async function fetchComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = clearUrl(req.headers.referer);

  if (!redis) {
    return res.status(500).json({ message: "Failed to connect to redis." });
  }

  try {
    // redis에서 댓글 가져오기
    const rawComments = await redis.lrange(url, 0, -1);

    // 문자열을 JSON로 파싱
    const comments = rawComments.map((c) => {
      const comment: Comment = JSON.parse(c);
      delete comment.user.email;
      return comment;
    });

    return res.status(200).json(comments);
  } catch (_) {
    return res.status(400).json({ message: "Unexpected error occurred." });
  }
}
