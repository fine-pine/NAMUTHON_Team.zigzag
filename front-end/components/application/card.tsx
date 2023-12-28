import type { Application } from "../../interfaces";
import distanceToNow from "../../lib/dateRelative";
import { useAuth0 } from "@auth0/auth0-react";

type ApplicationCardProps = {
  application?: Application;
};

export default function ApplicationCard({ application }: ApplicationCardProps) {
  // Auth0를 이용한 인증
  const { user } = useAuth0();

  return (
    <div className="space-y-6 mt-10">
      {application && (
        // 권한 확인
        // const isAuthor = user && user.email === application.user_email;
        // const isAdmin =
        //   user && user.email === process.env.NEXT_PUBLIC_AUTH0_ADMIN_EMAIL;
        <div key={application.id} className="flex space-x-4">
          <div className="flex-grow">
            <div className="flex space-x-2">
              <b>{application.user_id}</b>
              <time className="text-gray-400">
                {distanceToNow(application.createdAt)}
              </time>
            </div>
            <div>application.content</div>
          </div>
        </div>
      )}
    </div>
  );
}
