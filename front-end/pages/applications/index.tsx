import { WideContainer } from "../../components/container";
import ApplicationCard from "../../components/application/card";
import { application_dummy } from "../../_dummy";

export default function ApplicationsPage() {
  return (
    <WideContainer>
      <ApplicationCard application={application_dummy} />
    </WideContainer>
  );
}
