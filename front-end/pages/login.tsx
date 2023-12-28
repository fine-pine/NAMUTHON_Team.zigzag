import { useEffect } from "react";
import { Container } from "../components/container";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { setAccessCookie } from "../lib/handleCookie";

function ProfilePage() {
  const { getAccessTokenSilently } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      fetch(`http://localhost:8080/v1/oauth/login?code=${token}`, {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        credentials: "include",
      }).then((res) => {
        setAccessCookie(res.headers.get("authorization"));
        router.push("/");
      });
    })();
  }, []);

  return (
    <>
      <Container>loading..</Container>
    </>
  );
}

export default ProfilePage;
