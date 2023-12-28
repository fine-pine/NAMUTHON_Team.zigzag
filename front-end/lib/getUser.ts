/**
 * 사용자 조회
 * @param token 조회할 사용자 토큰
 * @returns 조회된 사용자 정보
 */
export default async function getUser(token: string) {
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/userinfo`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await response.json();
}
