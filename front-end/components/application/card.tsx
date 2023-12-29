import Link from "next/link";
import type { Application } from "../../interfaces";
import distanceToNow from "../../lib/dateRelative";
import { useAuth0 } from "@auth0/auth0-react";

type ApplicationStatusProps = {
  status: 0 | 1 | 2 | 3;
};

const ApplicationStatus = ({ status }) => {
  switch (status) {
    case 0:
      return (
        <div className="px-3 rounded-full border-solid border-2 border-ornage-500">
          접수 대기
        </div>
      );
    case 1:
      return (
        <div className="px-3 rounded-full border-solid border-2 border-yellow-500">
          수거 대기
        </div>
      );
    case 2:
      return (
        <div className="px-3 rounded-full border-solid border-2 border-indigo-500">
          입금 대기
        </div>
      );
    case 3:
      return (
        <div className="px-3 rounded-full border-solid border-2 border-green-500">
          입금완료
        </div>
      );
  }
};

type ApplicationCardProps = {
  application?: Application;
  isIncreased: boolean;
};

export default function ApplicationCard({
  application,
  isIncreased = true,
}: ApplicationCardProps) {
  // Auth0를 이용한 인증
  const { user } = useAuth0();

  return (
    <div className="space-y-6 border-solid border-b-2">
      {application && (
        // 권한 확인
        // const isAuthor = user && user.email === application.user_email;
        // const isAdmin =
        //   user && user.email === process.env.NEXT_PUBLIC_AUTH0_ADMIN_EMAIL;
        <div
          key={application.id}
          className="flex items-center justify-between space-x-4 py-8"
        >
          <ApplicationStatus status={application.status} />
          <time className="text-gray-400">
            {application.createdAt.toISOString().slice(0, 10)}
          </time>
          <div className={isIncreased ? "text-green-500" : "text-red-600"}>
            {isIncreased ? "▲" : "▼"}
            {application.watt} kWh
          </div>
          <div className="flex items-center space-x-2">
            <b>{application.user_id}</b>
          </div>
          <Link
            className="h-full hover:text-yellow-500 transition-colors"
            href={`/applications/${application.id}`}
          >
            자세히보기 ＞
          </Link>
        </div>
      )}
    </div>
  );
}
