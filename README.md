# NAMUTHON_Team.zigzag
2023 GDSC 나무톤 팀 지그재그의 깃 레포지토리 입니다.

## 프론트서버

* npm 설치가 필요합니다.

* 아래 코드를 순차적으로 실행합니다.
```bash
cd .\front-end\
npm i
npm run dev
```

* 환경 변수는 ./front-end/.env.local 에 작성해주시기 바랍니다.
* 브라우저에서 `http://localhost:3000`으로 접속합니다.

## DB서버

* mysql 설치가 필요합니다.

* mysql을 다운받은 후 아래 코드를 순차적으로 실행합니다.

```bash
sudo /etc/init.d/mysql start
sudo mysql
```

* 데이터베이스를 생성하고 사용자를 생성합니다.

```bash
CREATE DATABASE namutondb;
USE namutondb;

CREATE USER 'namuadmin'@'%' identified by '1210';
GRANT ALL PRIVILEGES ON *.* to 'namuadmin'@'%';
FLUSH PRIVILEGES;
``


## 백엔드 서버

* node 설치가 필요합니다.
* 알맞은 JDK와 Gradle을 설치한 후 IDE에서 프로젝트를 실행합니다.
* 클라이언트에서 `http://localhost:8080`으로 API를 호출합니다.
* 환경 변수는 ./ZigzagBE/src/main/resources/application.properties 에 작성해주시기 바랍니다.
