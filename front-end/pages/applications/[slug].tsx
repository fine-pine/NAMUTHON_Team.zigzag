import type { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Comment from "../../components/comment";
import { Container } from "../../components/container";
import distanceToNow from "../../lib/dateRelative";
import { getAllPosts, getPostBySlug } from "../../lib/getPost";
import markdownToHtml from "../../lib/markdownToHtml";
import Head from "next/head";
import { useAuth0 } from "@auth0/auth0-react";

export default function ApplicationPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { isAuthenticated } = useAuth0();
  const router = useRouter();
  if (!isAuthenticated) {
    alert("로그인이 필요합니다.");
    router.push("/");
  }

  if (!router.isFallback && !post?.slug) {
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
              <h1 className="text-4xl font-bold">{post.title}</h1>
              {post.excerpt ? (
                <p className="mt-2 text-xl">{post.excerpt}</p>
              ) : null}
              <time className="flex mt-2 text-gray-400">
                {distanceToNow(new Date(post.date))}
              </time>
            </header>

            <div
              className="prose mt-10"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          <Comment />
        </div>
      )}
    </Container>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

/**
 * 정적 데이터를 바탕으로 페이지를 빌드 타임에 사전 렌더링합니다
 */
export async function getStaticProps({ params }: Params) {
  // 게시글 조회
  const post = getPostBySlug(params.slug, [
    "slug",
    "title",
    "excerpt",
    "date",
    "content",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

/**
 * 동적 라우팅과 getStaticProps를 사용할 때, 정적으로 사전 랜더링할 경로를 지정합니다.
 * @returns
 */
export async function getStaticPaths() {
  // 게시글의 slug 속성 목록조회
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map(({ slug }) => {
      return {
        params: {
          slug,
        },
      };
    }),
    fallback: false,
  };
}
