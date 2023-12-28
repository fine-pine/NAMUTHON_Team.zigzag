import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Comment from "../../components/comment";
import { Container } from "../../components/container";
import distanceToNow from "../../lib/dateRelative";
import Head from "next/head";
import { useAuth0 } from "@auth0/auth0-react";

export default function ApplicationPage({ application }) {
  const { isAuthenticated } = useAuth0();
  const router = useRouter();
  if (!isAuthenticated) {
    alert("로그인이 필요합니다.");
    router.push("/");
  }

  console.log(router.query);

  if (!router.isFallback && !application?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Container>
      <Head>
        <title>신청서 상세보기</title>
      </Head>

      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <div>
          <article>
            <header>
              <h1 className="text-4xl font-bold">{application.title}</h1>
              <time className="flex mt-2 text-gray-400">
                {distanceToNow(new Date(application.date))}
              </time>
            </header>

            <div
              className="prose mt-10"
              dangerouslySetInnerHTML={{ __html: application.content }}
            />
          </article>

          <Comment />
        </div>
      )}
    </Container>
  );
}
