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
          <p className="mt-2 text-2xl font-bold leading-8 text-gray-600 mb-14">
            안녕하세요. 지그재그입니다.
          </p>
          <div className="flex gap-8 mx-auto gap-x-8 gap-y-16lg:mx-0 lg:max">
            <div className="shadow-lg p-4 flex max-w-xl flex-col items-start justify-between">
              <img className="w-full" src="/banner1.png" alt="banner1" />
              <p className="text-base mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                지그재그는 낭비되는 <b>소용량</b>의 에너지 자원을 거래하는
                <b> 플랫폼</b>입니다.
              </p>
            </div>
            <div className="shadow-lg p-4 flex max-w-xl flex-col items-start justify-between">
              <img className="w-full" src="/banner2.png" alt="banner1" />
              <p className="text-base mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                태양광, 태양열, 지열 등 남은 신재생 에너지로 <b>수익</b>을
                얻어보세요.
              </p>
            </div>
            <div className="shadow-lg p-4 flex max-w-xl flex-col items-start justify-between">
              <img className="w-full" src="/banner3.png" alt="banner1" />
              <p className="text-base mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                구매를 원하시나요? 전기 에너지를 <b>저렴</b>하게 구매할 수도
                있습니다.
              </p>
            </div>
          </div>
        </section>
        <section className="flex items-center justify-center mx-auto px-6 lg:px-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 bg-[#F5A034] py-6 sm:py-8 space-y-6">
          <div className="flex flex-col gap-4 items-center justify-center text-white">
            <h1 className="text-4xl font-bold pb-4">오늘의 전력량 예상 가격</h1>
            <div className="flex flex-col gap-4 items-center justify-center w-80 h-80 bg-white text-black rounded-full">
              <div className="text-5xl font-black">121원/kWh</div>
              <span className="text-xl text-gray-600">
                1000kWh 판매시 12만원
              </span>
            </div>
            <span className="text-base">
              *예상 가격이므로 실제 판매 가격은 다를 수 있습니다.
            </span>
          </div>
        </section>
        <section className="flex items-center justify-center mx-auto px-6 lg:px-8 border-t border-gray-200 py-10 bg-[#284952] space-y-6">
          <div className="flex flex-col gap-16 items-center justify-center text-white">
            <h1 className="text-xl font-bold">
              간략한 신청서 작성을 통해 전기 에너지를 판매해보세요.
            </h1>
            <div className="flex gap-24 items-center justify-between text-black rounded-full">
              <img className="w-64" src="/banner4.png" alt="banner4" />
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl text-white">
                  오늘 바로 판매 가능! <br /> 지그재그에서 직접 매매!
                </h2>
                <button
                  type="submit"
                  className="rounded-md bg-white px-6 py-4 text-xl font-semibold shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                >
                  바로 신청하기
                </button>
              </div>
            </div>
          </div>
        </section>
      </WideContainer>
    </>
  );
}

export default HomePage;
