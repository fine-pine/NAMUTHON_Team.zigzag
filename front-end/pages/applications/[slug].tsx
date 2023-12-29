import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { Container } from "../../components/container";
import distanceToNow from "../../lib/dateRelative";
import Head from "next/head";
import { useAuth0 } from "@auth0/auth0-react";
import { application_dummy } from "../../_dummy";
import { Bank } from "../../interfaces";
import StatusChip from "../../components/StatusChip";

const bankToString = (bank: Bank) => {
  switch (bank) {
    case 0:
      return "국민";
    case 1:
      return "신한";
    case 2:
      return "하나";
  }
};

export default function ApplicationPage({ application = application_dummy }) {
  const { isAuthenticated } = useAuth0();
  const router = useRouter();
  if (!isAuthenticated) {
    alert("로그인이 필요합니다.");
    router.push("/");
  }

  console.log(router.query.slug);

  // if (!router.isFallback && !application?.slug) {
  //   return <ErrorPage statusCode={404} />;
  // }

  if (!application?.id) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Container>
      <Head>
        <title>신청서 상세보기</title>
      </Head>

      <div className="flex flex-col gap-4">
        <article>
          <header>
            <div className="flex items-end gap-4">
              <h1 className="text-4xl font-bold">신청서 상세보기</h1>
              <StatusChip status={application.status} />
            </div>
            <div className="flex justify-between items-end">
              <time className="flex mt-2 text-gray-400 text-base">
                {distanceToNow(new Date(application.date))}
              </time>
              <div>
                <span className="text-base text-gray-400">작성자 </span>
                <span className="text-base">{application.user_id}</span>
              </div>
              {/* TODO: 상태 */}
            </div>
          </header>

          <div className="shadow-lg p-12 rounded-xl justify-between prose mt-10">
            <div className="flex items-center justify-between">
              <div className="flex flex-col font-bold gap-4">
                <div>판매할 전력량</div>
                <div>주소</div>
                <div>전화번호</div>
                <div>희망 수거 날짜</div>
                <div>계좌</div>
                <div>{application.description && "사유"}</div>
                <div>승인 날짜</div>
                <div>수거 날짜</div>
              </div>
              <div className="flex flex-col gap-4">
                <div>{application.watt} kWh</div>
                <div>{application.address}</div>
                <div>{application.phone_number}</div>
                <div>{application.date.toISOString().slice(0, 10)}</div>
                <div>{`${bankToString(application.bank)} ${
                  application.account
                }`}</div>
                <div>{application.description}</div>
                <div>{application.admittedAt?.toISOString()?.slice(0, 10)}</div>
                <div>
                  {application.collectedAt?.toISOString()?.slice(0, 10) ??
                    "미정"}
                </div>
              </div>
            </div>
            <hr />
            <div className="flex justify-between">
              <div>총 예상 금액</div>
              <div>{application.watt * 120} 원</div>
            </div>
          </div>
        </article>
        <button
          type="submit"
          className="rounded-md bg-yellow-500 px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
        >
          승인
        </button>
      </div>
    </Container>
  );
}
