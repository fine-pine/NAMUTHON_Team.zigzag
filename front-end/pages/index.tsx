import { Container, WideContainer } from "../components/container";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

// 첫 화면
function HomePage() {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      console.log(token);
    })();
  }, []);

  return (
    <>
      <WideContainer>
        <section className="space-y-6">
          <div className="flex flex-col gap-4 items-center">
            <img className="w-96" src="/zigzag_logo.png" alt="zigzag_logo" />
            <div className="flex gap-2 items-end">
              <h1 className="text-xl">환경을 생각한다면,</h1>
              <h1 className="text-4xl font-bold text-yellow-400">지그재그</h1>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-6 mt-10 lg:px-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 bg-white py-24 sm:py-32 space-y-6">
          <p className="mt-2 text-xl leading-8 text-gray-600 mb-14">
            안녕하세요. 지그재그입니다.
          </p>
          <div className="flex gap-8 mx-auto gap-x-8 gap-y-16lg:mx-0 lg:max">
            <div className="shadow-lg p-4 flex max-w-xl flex-col items-start justify-between">
              <img className="w-full" src="/banner1.png" alt="banner1" />
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                <p className="text-base">
                  지그재그는 낭비되는 <b>소용량</b>의 에너지 자원을 거래하는
                  <b>플랫폼</b>입니다.
                </p>
              </p>
            </div>
            <div className="shadow-lg p-4 flex max-w-xl flex-col items-start justify-between">
              <img className="w-full" src="/banner2.png" alt="banner1" />
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                <p className="text-base">
                  태양광, 태양열, 지열 등 남은 신재생에너지로 <b>수익</b>을
                  얻어보세요.
                </p>
              </p>
            </div>
            <div className="shadow-lg p-4 flex max-w-xl flex-col items-start justify-between">
              <img className="w-full" src="/banner3.png" alt="banner1" />
              <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                <p className="text-base">
                  구매를 원하시나요? 전기 에너지를 <b>저렴</b>하게 구매할 수도
                  있습니다.
                </p>
              </p>
            </div>
          </div>
        </section>
      </WideContainer>
    </>
  );
}

export default HomePage;
