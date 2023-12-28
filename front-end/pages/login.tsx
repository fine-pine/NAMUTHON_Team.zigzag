import { useEffect } from "react";
import { Container } from "../components/container";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";

function ProfilePage() {
  const { getAccessTokenSilently } = useAuth0();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      fetch(`http://localhost:8080/v1/oauth/login?code=${token}`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
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

export default ProfilePage;
