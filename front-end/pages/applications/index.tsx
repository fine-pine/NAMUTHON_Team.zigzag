import { Container } from "../../components/container";
import ApplicationCard from "../../components/application/card";
import { application_dummy } from "../../_dummy";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";

export default function ApplicationsPage() {
  const { isAuthenticated } = useAuth0();
  const router = useRouter();
  if (!isAuthenticated) {
    alert("로그인이 필요합니다.");
    router.push("/");
  }

  return (
    <Container>
      <h2 className="text-2xl font-semibold leading-7 text-gray-900">
        신청서 목록
      </h2>
      <div className="border-solid border-b-2 pt-10"></div>
      <ApplicationCard application={application_dummy} />
      <ApplicationCard application={application_dummy} />
      <ApplicationCard application={application_dummy} />
      <ApplicationCard application={application_dummy} />
      <ApplicationCard application={application_dummy} />
    </Container>
  );
}
