import type { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { WideContainer } from "../../components/container";
import distanceToNow from "../../lib/dateRelative";
import { getAllPosts } from "../../lib/getPost";
import ApplicationCard from "../../components/application/card";

export default function ApplicationsPage() {
  return (
    <WideContainer>
      {/* <ApplicationCard application={application_dummy}/> */}
      index
    </WideContainer>
  );
}
