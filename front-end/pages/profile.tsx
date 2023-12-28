import { Container } from "../components/container";
import { useAuth0 } from "@auth0/auth0-react";

function ProfilePage() {
  const { user } = useAuth0();

  return (
    <>
      <Container>
        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
          마이페이지
        </h2>
        <section className="flex gap-8 items-center justify-center mx-auto px-6 lg:px-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 py-6 sm:py-8 space-y-6">
          <img src={user.picture} alt="user_picture" />
          <div className="flex gap-8 text-2xl">
            <div className="font-bold">
              <h2>이름</h2>
              <h2>이메일</h2>
            </div>
            <div>
              <h2>{user.name}</h2>
              <h2>{user.email}</h2>
            </div>
          </div>
        </section>
        <hr />
        <h2 className="text-2xl font-semibold leading-7 text-gray-900 pt-10 sm:mt-16 sm:pt-8 py-6 sm:py-8 space-y-6">
          나의 신청 목록
        </h2>
        TODO
      </Container>
    </>
  );
}

export default ProfilePage;
