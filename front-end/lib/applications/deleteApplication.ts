import type { NextApiRequest, NextApiResponse } from "next";
import type { User, Comment } from "../../interfaces";
import redis from "../redis";
import getUser from "../getUser";
import clearUrl from "../clearUrl";

/**
 * 댓글 삭제
 * @param req 요청 객체
 * @param res 응답 객체
 * @returns 프로미스 객체
 */
export default async function deleteComments(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 요청 정보 조회
  const url = clearUrl(req.headers.referer);
  const { comment }: { url: string; comment: Comment } = req.body;
  const { authorization } = req.headers;

  if (!comment || !authorization) {
    return res.status(400).json({ message: "Missing parameter." });
  }

  if (!redis) {
    return res.status(500).json({ message: "Failed to connect to redis." });
  }

  try {
    // 사용자 토큰 검증
    const user: User = await getUser(authorization);
    if (!user) return res.status(400).json({ message: "Invalid token." });
    comment.user.email = user.email;

    const isAdmin = process.env.NEXT_PUBLIC_AUTH0_ADMIN_EMAIL === user.email;
    const isAuthor = user.sub === comment.user.sub;

    // 권한 없음
    if (!isAdmin && !isAuthor) {
      return res.status(400).json({ message: "Need authorization." });
    }

    // redis에서 댓글 삭제
    await redis.lrem(url, 0, JSON.stringify(comment));

    return res.status(200).end();
  } catch (err) {
    return res.status(400);
  }
}
