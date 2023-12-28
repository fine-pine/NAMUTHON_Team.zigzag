import Container from "../components/container";
import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";

// 첫 화면
function HomePage() {
  const { user } = useAuth0();
  console.log(user);
  return (
    <>
      <Container>
        <div className="space-y-6">
          <div className="flex gap-4 items-center">
            <img className="w-32" src="/zigzag_logo.png" alt="지그재그 로고" />
            <h1 className="text-4xl font-bold text-yellow-400">지그재그</h1>
          </div>
          <p className="text-lg">
            여태까지 에너지 사용과 관련한 ‘지속 가능한 발전’ 에 대해 여러
            아이디어와 제안들이 나왔지만, 우리 실생활에 크게 다가오지
            못했습니다. 그 이유는 우리가 기존에 생각해오던 발전의 대표적 요소인
            ‘경제성’이 부족하기 때문입니다.
          </p>
          <p className="text-lg">
            그래서 ‘지속 가능한 발전’이 정말 실생활에 적용되기 위해서는 에너지를
            교환하는 입장에서 ‘경제성’ 이 필요하다고 생각했습니다. 그래서 주제와
            관련한 아이디어를 교환하던 중, ‘평소 전기 사용에 있어서, 가정에서
            남는 소용량의 전기 에너지는 판매할 수 없다’ 는 점에 착안하여
            낭비되는 소용량의 전기에너지에 ‘경제성’을 부여할 수 있는 프로그램을
            개발하였습니다.
          </p>
          <p className="text-lg">
            저희 팀의 서비스 ‘지그재그’ 는, 낭비 되는 소용량의 전기 에너지를
            하나로 취합하여 판매할 수 있는 플랫폼을 웹으로서 제공합니다. 이를
            통해, 소비자들은 평소 판매할 수 없었던 소용량 에너지를 판매하여
            수익을 얻을 수 있습니다. 또한, 환경적으로도 소용량 전기에너지가
            낭비되지 않는 효과를 가져올 수 있습니다. 앞으로 재생가능한 에너지의
            생산이 늘어남에 따라 소용량 전기에너지가 늘어날 것으로 기대하고
            있습니다.
          </p>
        </div>
      </Container>
    </>
  );
}

export default HomePage;
