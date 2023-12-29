import { useEffect } from "react";
import { Container } from "../components/container";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { setAccessCookie } from "../lib/handleCookie";

function LoginPage() {
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
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(() => {
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

export default LoginPage;
