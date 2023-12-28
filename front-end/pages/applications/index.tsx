import { Container } from "../../components/container";
import ApplicationCard from "../../components/application/card";
import { application_dummy } from "../../_dummy";

export default function ApplicationsPage() {
  return (
    <Container>
      <h2 className="text-2xl font-semibold leading-7 text-gray-900">
        신청서 목록
      </h2>
      <div className="border-solid border-b-2 pt-10"></div>
      <ApplicationCard application={application_dummy} />
    </Container>
  );
}
