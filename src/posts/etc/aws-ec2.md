---
title: AWS EC2로 express 서버 배포하기
tag: AWS, EC2, pm2, nginX
date: 2023-06-21 17:25:31
description: EC2를 이용해 배포하고 로드밸런서를 이용해 HTTPS 연결하는 과정에 대해 정리합니다.
type: blog
---

<!-- TOC tocDepth:2..3 chapterDepth:2..6 -->

- [이 포스트에서 다루는 것](#이-포스트에서-다루는-것)
- [EC2로 배포하기](#ec2로-배포하기)
  - [1. 위치 설정하기](#1-위치-설정하기)
  - [2. EC2 인스턴스 생성하기](#2-ec2-인스턴스-생성하기)
  - [3. 인스턴스 내 환경 셋팅하기](#3-인스턴스-내-환경-셋팅하기)
  - [4. 프로젝트 실행해보기](#4-프로젝트-실행해보기)
  - [5. HTTPS 연결을 위해 로드밸런서 생성하기](#5-https-연결을-위해-로드밸런서-생성하기)
  - [6. 도메인 레코드 추가하기](#6-도메인-레코드-추가하기)
  - [7. pm2로 서버 띄우기](#7-pm2로-서버-띄우기)
  - [8. 리버스 프록시 설정하기](#8-리버스-프록시-설정하기)
- [요약](#요약)
- [마무리](#마무리)

<!-- /TOC -->

---

EC2로 배포하는 방법을 정리해놓기 위해 포스트를 작성한다. (정리하지 않으면 까먹기에..) 포스트를 보기 전에 [Proxy에 대해 알아보기 (+ Reverse Proxy, Foward Proxy)](https://www.im-alex.dev/posts/etc/proxy)를 먼저 보면 더 도움이 될 것 같습니당.

<br />

### 이 포스트에서 다루는 것

- 리눅스 EC2 인스턴스를 생성한 후 EC2 환경 설정을 위해 필요한 툴들을 설치하고, pm2를 이용해 백그라운드 서버를 실행하는 방법
- nginX 설치하고, 리버스 프록시 설정 적용을 위한 기본 설정 적용 방법
- HTTP에서 HTTPS로 연결하기 위한 로드밸런서를 생성하는 방법

## EC2로 배포하기

(참고로, SSL 인증서와 도메인이 준비되어 있어야 한다. SSL 인증서 받는 방법과 도메인 구입하는 방법은 다른 블로그나 AWS 공식 문서에 정리가 잘 되어있기 때문에 따로 정리해놓지는 않았다.)

<div class="point">

EC2 다룰 때는 절대적으로 보안에 주의하기. 꼭 root 유저가 아닌 IAM 유저로 로그인하기.

</div>

<br />

### 1. 위치 설정하기

AWS EC2로 들어간다.

<img width="328" alt="ec2" src="https://github.com/h-alex2/imgaes/assets/84281505/9ae2ef10-f864-40b1-8dba-f39951415e82">
cloudfront를 사용한다면 버지니아 북부로 설정해야 한다. JaamToast에서는 cloudfront를 사용했기 때문에 버지니아 북부를 선택했다.  
지역은 가까운 곳으로 설정해야 비용면에서 이득이 있는 걸로 알고 있다. 사용할 툴을 보고 지역이 제한되어있지는 않은지 체크한 후 위치를 선택해야 한다.

<br />

### 2. EC2 인스턴스 생성하기

<img width="269" alt="ec2" src="https://github.com/h-alex2/imgaes/assets/84281505/a2308295-7f7d-4b65-a18f-651a12c394ea">

<img width="977" alt="ec2" src="https://github.com/h-alex2/imgaes/assets/84281505/e73004c1-be7a-474a-8eb4-46253d912f49">

인스턴스 시작 클릭

이름 작성

<img width="754" alt="ec2" src="https://github.com/h-alex2/imgaes/assets/84281505/3bfa2a1e-e55e-41d5-b4dd-b797863deb02">

난 리눅스로 선택했다. 우분투 등 선택할 수 있는 설정이 많으니 취향껏 선택하면 된다. 만약 SSH 접속을 하게 된다면 환경에 따라 터미널 명령어가 달라지니 참고하기
Amazon Machine Image(AMI)는 프리 티어 사용 가능 중에 고르면 된다. 본인에게 맞는 환경으로 선택하기.

<img width="797" alt="ec2" src="https://github.com/h-alex2/imgaes/assets/84281505/68b32780-643b-4e44-a584-b008f4c03518">

인스턴스 유형 중에 프리 티어가 적용되는 t2.micro는 메모리가 굉장히 작다. 처음에 t2를 선택했다가 메모리가 부족해 t3로 변경했는데, 변경하게 되면 배포 셋팅을 다시 해야하니 굉장히 번거로웠다. 처음부터 너무 작은 사이즈 보다는 t3 이상을 선택하는 게 나을 수도 있다. (beanstalk으로 배포하게 되면 t3 인스턴스가 생성된다.) 시간당 요금이 적혀있으니 참고하여 선택하기

키 페어는 없다면 새 키 페어 생성하기 클릭 - 기본 설정된 그대로 (RSA, .pem형식) 생성하기. pem키는 나중에 터미널로 SSH 연결하거나 할 때 필요하니 위치 기억하기. (키페어 절대 유출되지 않도록 조심히 관리하기)

<img width="796" alt="ec2" src="https://github.com/h-alex2/imgaes/assets/84281505/ab3eba80-5fb9-49d4-a139-27d74ac7914d">
SSH, HTTPS, HTTP 트래픽 허용에 체크해준다. 0.0.0.0/0 위치 무관으로 설정하면 경고 메시지가 뜨니 나중에 IP 주소를 설정하는 게 좋을듯.

<img width="823" alt="ec2" src="https://github.com/h-alex2/imgaes/assets/84281505/9a8c2470-7366-4f65-b373-0c5195019917">

인스턴스 "시작" 클릭하면 생성이 시작된다.

<br />

### 3. 인스턴스 내 환경 셋팅하기

이제 인스턴스 내에 환경을 셋팅해야 한다. 생성된 인스턴스 클릭 후 "연결"을 클릭한다.
<img width="850" alt="ec2" src="https://github.com/h-alex2/imgaes/assets/84281505/b5b7219d-b391-4eb3-aee1-b64d0542e0ca">
이런 화면이 나오면 그대로 연결 클릭하기.

#### 1. root 모드로 변경하기

패키지 설치하기 전에 터미널 모드를 root로 변경하자. `sudo su` 입력

#### 2. yum 업데이트 하기

리눅스에서는 `yum` 을 이용해 패키지를 설치할 수 있다. `yum`은 패키지 관리자이다. [Amazon Linux 인스턴스에서 소프트웨어 패키지 설치](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/install-software.html) 참고하기.

`yum update -y` 을 입력하여 yum을 업데이트한다.

#### 3. git 설치

`yum install git -y`

#### 4. nvm 설치

node를 설치하기 위해 nvm을 설치하자. [자습서: Amazon EC2 인스턴스에서 Node.js 설정](https://docs.aws.amazon.com/ko_kr/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html) 참고하기.

현재 2023.06.21 AWS 공식문서에는 이렇게 나와있으니 리눅스 2 사용시 참고하기. (난 노드 16.20 버전을 설치했다.)

> 아마존 리눅스 2는 현재 Node.js 최신 LTS 릴리스 (버전 18.x) 를 지원하지 않습니다. 이 다음 다음 다음 다음 다음 다음 다음 명령을 대신 다음 명령을 실행합니다. Node.js nvm install 16

1. `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash`
2. `source /root/.nvm/nvm.sh`
3. `nvm install 노드 버전 입력`
4. `nvn use 노드 버전 입력`

#### 5. pm2 설치

EC2에서 배포하는 건 우리가 우리 노트북에서 로컬 호스트로 테스트하듯이 EC2 인스턴스라는 로컬 환경에서 로컬 호스트를 띄우는 것과 같다. 즉 인스턴스 내에서 `npm start` 를 입력해서 서버를 띄우는 것이다. 하지만 npm start를 입력하면 그 이후에 터미널을 쓸 수가 없다. 그렇기 때문에 서버 애플리케이션을 백그라운드에서 실행하도록 변경해야하는데 그걸 위해서 pm2를 사용한다.

pm2는 Node.js 애플리케이션 프로세스 관리자 도구다. Node.js 애플리케이션을 실행, 관리, 모니터링하는 데 도움이 된다. pm2를 이용해 무중단 배포하는 방법도 있고 Node.js의 클러스터 모듈을 이용해 멀티 스레드로 구동시켜주는 기능도 있지만 난 Node.js 애플리케이션을 백그라운드로 실행하는 기능만을 이용했다.

1. `npm install pm2 -g`

#### 6. nginX 설치

- `yum install nginx`
- `nginx -v` 설치 잘 됐는지 확인
- `service nginx start` nginx 시작하기
- 인스턴스 페이지로 돌아가서 퍼블릭 IPv4 주소 복사하고 주소창에 입력하기

<img width="1434" alt="ec2" src="https://github.com/h-alex2/imgaes/assets/84281505/8acdf389-a928-4542-8be1-5f18e9121f98">
이런 화면 또는 nginX 관련 화면이 나온다면 nginX 설정 잘 된 것

#### (선택) AMI 설정하기

모든 환경을 설치했다면 프로젝트 레포지토리를 클론하기 전에 인스턴스 환경을 저장하는 게 도움이 될 수 있다. AMI는 아마존 머신 이미지의 줄임말로 인스턴스 생성에 필요한 소프트웨어 정보를 담고 있는 것을 말한다.
AMI 설정하는 방법에 대해서는 검색하면 많이 나온다.(😴)

#### 7. 프로젝트 레포지토리 클론하기

- `git clone 레포지토리 주소` 로 클론하기
- `cd 프로젝트 이름` 으로 클론한 폴더로 들어가기

환경 변수가 필요하다면

- `cat .env` 로 .env 파일을 만든다.

```
echo '
환경변수=여기다
환경변수=적기
환경변수=...
' > .env
```

echo 의 따옴표 안에 환경 변수 값을 넣어 그대로 입력한다.

- `cat .env` 를 입력해 .env의 내용이 잘 들어갔는지 확인한다.
- `npm install` 또는 `yarn` 입력하여 의존성 설치하기

<br />

### 4. 프로젝트 실행해보기

이제 프로젝트를 실행하고 IP 주소를 통해 잘 접속되는지 테스트 먼저 해보자. 만약 프로젝트의 포트가 8000이라면 보안그룹에 8000 포트를 추가해줘야 한다.

#### 1. 인스턴스 페이지로 들어가기

<img width="1019" alt="instance" src="https://github.com/h-alex2/imgaes/assets/84281505/08e0af92-3d3a-4e6e-9baa-563e49ae30f2">
밑에 보안 클릭
<img width="905" alt="instance" src="https://github.com/h-alex2/imgaes/assets/84281505/a4427da2-6016-4449-90be-d6f143b09985">
저기 클릭
<img width="1033" alt="instance" src="https://github.com/h-alex2/imgaes/assets/84281505/89708d4b-6b1d-46eb-ae4d-91d41f33fa4c">
순서대로 클릭

<img width="854" alt="instance" src="https://github.com/h-alex2/imgaes/assets/84281505/394993da-0650-476f-a606-cb7e65774702">
규칙 추가 후 포트 번호 입력 후 저렇게 설정 (포트 번호는 자신의 프로젝트 포트 번호를 입력해야 함)

- 다시 인스턴스 SSH로 돌아가기
- clone한 폴더로 들어가서 한 번 실행해보기
- 인스턴스의 퍼블릭 IPv4 주소 + ":포트번호" 브라우저 주소창에 입력해보기 (예시: 12.345.678:8000) -> 정상적으로 잘 됐다면 잘 나와야 함 (HTTPS가 아니라서 크롬에서 안된다면 사파리로 해보기)

이제 남은 것은 HTTPS 연결과 리버스 프록시 설정만이 남았다. HTTPS 연결을 위해서는 SSL 인증서가 준비되어있어야 한다.

<br />

### 5. HTTPS 연결을 위해 로드밸런서 생성하기

HTTPS을 연결하는 방법으로는 AWS 로드밸런서 말고도 certbot을 이용한 방법도 가능하다. 이 방법의 장점은 무료라는 점이고, 단점은 3개월에 한 번씩 갱신이 필요하다는 점이다. 무료로 인증서를 발급받고 싶다면 certbot을 이용한 방법을 찾아 적용하면 된다. certbot을 이용한 방법은 certbot과 nginX를 함께 사용해 적용할 수 있다. 난 로드밸런서를 이용한 방법을 택했다.

<img width="238" alt="load" src="https://github.com/h-alex2/imgaes/assets/84281505/689962cf-64b1-4030-a588-b45fde7b5178">
EC2 메뉴에서 로드밸런서를 클릭 - 로드 밸런서 생성을 클릭한다.

<img width="988" alt="load" src="https://github.com/h-alex2/imgaes/assets/84281505/401567ec-cf5f-4439-9bcb-8d0750e4f4c5">
Application Load Balancer 생성을 클릭한다.

> Application Load Balancer는 OSI(Open Systems Interconnection) 모델의 **7번째 계층인 애플리케이션 계층**에서 작동합니다. 로드 밸런서는 요청을 수신한 후 우선 순위에 따라 리스너 규칙을 평가하여 적용할 규칙을 결정한 다음 규칙 작업을 위해 대상 그룹에서 대상을 선택합니다. 애플리케이션 트래픽의 내용에 따라 요청을 다른 대상 그룹으로 라우팅하도록 리스너 규칙을 구성할 수 있습니다. 대상이 여러 대상 그룹에 등록된 경우에도 각 대상 그룹에 대해 라우팅이 독립적으로 수행됩니다. 대상 그룹 수준에서 사용되는 라우팅 알고리즘을 구성할 수 있습니다. 기본 라우팅 알고리즘은 라운드 로빈입니다. - [Application Load Balancer란 무엇입니까?](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html)

설명을 보면 OSI 7번째 계층인 애플리케이션 계층에서 작동한다는 걸 알 수 있다. 그럼 다른 로드밸런서들도 어떤 계층에서 작동하는지 예측할 수 있다. 네트워크 로드밸런서는 3계층, 게이트웨이 로드밸런서는 4계층이라는 걸 예측할 수 있다. 그리고 부하분산 알고리즘은 라운드 로빈이라는 걸 알 수 있다.

<img width="1111" alt="load" src="https://github.com/h-alex2/imgaes/assets/84281505/0e3d3808-b117-4a6d-a094-391a5d482725">
이름 입력하고 나머지는 그대로 놔두기

<img width="1103" alt="load" src="https://github.com/h-alex2/imgaes/assets/84281505/258ab747-830c-43b2-9e26-1875c45034a1">
- 4개 다 체크
- ap-northeast-2a 여기서 northeast는 지역 이름으로 선택한 지역이름에 따라 다를 수 있음

<img width="1106" alt="load" src="https://github.com/h-alex2/imgaes/assets/84281505/1ccd4de6-6dab-4070-8c50-e272eae73355">
- 새 보안그룹 생성 클릭

<img width="1285" alt="load" src="https://github.com/h-alex2/imgaes/assets/84281505/1848f17d-dd71-4750-a189-4bcc1703ce05">
- 보안 그룹 이름, 설명 작성
- 사진과 같이 HTTP, HTTPS, SSH 포트 설정

<img width="1093" alt="load" src="https://github.com/h-alex2/imgaes/assets/84281505/f998621b-836a-47a6-b528-ce6fc3786e3d">
- 생성한 보안그룹 추가

<img width="1105" alt="load" src="https://github.com/h-alex2/imgaes/assets/84281505/38aa70b0-bfab-403c-9a52-4c9555f2abe6">
- 대상 그룹 생성 클릭
- 인스턴스 클릭하고, 대상 그룹 이름 적은 후  "다음" 클릭 (상태 검사 경로는 프로젝트 상태 경로에 따라 설정하기)
- 생성한 인스턴스 체크

<img width="1027" alt="load" src="https://github.com/h-alex2/imgaes/assets/84281505/b648c4a3-4d38-4e3f-b0fc-fb6e2864ed55">
- 대상 그룹 생성 클릭

<img width="1111" alt="load" src="https://github.com/h-alex2/imgaes/assets/84281505/823fd08a-b409-4fa8-a1bf-5eaa8c354380">
- 새로고침 클릭 후 생성한 대상 그룹 생성 클릭

<img width="1108" alt="load" src="https://github.com/h-alex2/imgaes/assets/84281505/fc79998c-e450-4d3d-8bcb-65f9dd95a460">
- 리스너 추가
- HTTPS 추가

<img width="1131" alt="load" src="https://github.com/h-alex2/imgaes/assets/84281505/69100cf1-62ca-4a65-8520-265517646e10">
- SSL 인증서 추가
- 로드 밸런서 생성 클릭

<br />

### 6. 도메인 레코드 추가하기

Route53으로 가서 - 호스팅 영역 - 도메인 클릭 - 레코드 생성 클릭
<img width="1123" alt="load" src="https://github.com/h-alex2/imgaes/assets/84281505/8a9a6250-154f-4f40-818d-e8869f6d6b36">

- 레코드 유형은 A레코드로 설정한 후 "별칭" 을 클릭한다.
- 레코드 이름에 서브 도메인을 입력한다.

<img width="1092" alt="load" src="https://github.com/h-alex2/imgaes/assets/84281505/3a81ff8a-5de3-4a63-b59b-3e08f790276b">
<img width="982" alt="load" src="https://github.com/h-alex2/imgaes/assets/84281505/e9415646-668d-4f9c-98c2-d40d7575579f">
- region을 선택하고, 생성한 로드밸런서를 클릭한다.
- 레코드 생성을 클릭한다.

이제 좀 전에 생성한 로드밸런서를 바라보는 도메인 레코드를 추가했다. 레코드가 생성되면 (한 1분 이상 걸린다) 도메인을 입력해보자. 그럼 인스턴스의 퍼블릭 IPv4 주소를 입력한 것과 같은 창이 뜰 것이다. 이제 마지막으로 pm2를 이용해 node 서버를 띄우고, 리버스 프록시를 이용해서 해당 도메인을 입력하면 인스턴스의 ip주소:포트번호의 위치로 이동하도록 설정해보자.

<br />

### 7. pm2로 서버 띄우기

- pm2로 서버를 시작하기 위해서는 `pm2 start app.js` 와 같이 입력하면 된다. 나의 경우에 `package.json`의 start script 자체에 밑 코드처럼 `pm2 start`를 적어놓았다.

```js
  "scripts": {
    "start": "NODE_ENV=production pm2 start ts-node -- --project ./tsconfig.json ./src/index.ts",
    // ...
  },
```

- TypeScript가 아니라면 `"start": "NODE_ENV=production pm2 start ./src/index.js",` 로 작성하면 된다.
- `package.json`에 작성하지 않을거라면 터미널에서 바로 `pm2 start ./src/index.js`를 입력하면 된다.

#### pm2 리스트 확인하기

- 리스트를 확인하기 위해서는 `pm2 ls`를 입력하면 된다.

#### 로그 확인하기

- 로그를 확인하려면 `pm2 log`를 입력하면 된다.

#### 프로세스 중지하기

- 서버를 중지하려면 `pm2 stop 프로세스번호`를 입력하면 된다.

<br />

### 8. 리버스 프록시 설정하기

- 다시 인스턴스 페이지로 들어가서 연결을 클릭해보자. 다시 root 모드로 변경해보자 `sudo su`
- `cd /etc/nginx/conf.d` 이동

```
echo '
server {
  listen 80;
  listen [::]:80;
  server_name test.air-mind.live; // 도메인 입력
  location / {
      proxy_pass http://127.0.0.1:3000; // 3000에 본인 프로젝트에 맞는 포트 번호 입력
  }
}
' > default.conf
```

- 터미널에 이렇게 입력해보자. (위 처럼 주석이 포함되면 안된다. 도메인, 포트 번호 바꾼 후 주석은 제거해야한다.)
  - 위 코드는 기본적인 코드만 작성되어 있다. 잘 작동되지만 추가 설정해야 할 속성이 있다면 공식문서를 참고하세요..!
- `cat default.conf` 로 올바르게 입력됐는지 확인

- 저 코드 내에 server 부분은 여러 개 넣을 수 있다. 예를 들어

```
// 예시
server {
  listen 80;
  listen [::]:80;
  server_name *.jaamtoast.click;
  location / {
      proxy_pass http://127.0.0.1:8000/api;
  }
}
server {
  listen 80;
  listen [::]:80;
  server_name api.jaamtoast.click;
  location / {
      proxy_pass http://127.0.0.1:8000;
  }
  location /api/favicon {
      proxy_pass http://127.0.0.1:8080/favicon;
  }
}
server {
  listen 80;
  listen [::]:80;
  server_name jaamtoast.click www.jaamtoast.click;
  location / {
      proxy_pass https://jaam-toast.vercel.app;
  }
  location /images {
      proxy_pass https://jaam-toast.vercel.app/images;
  }
}
```

- 이런 식으로 작성할 수도 있다. 이렇게 여러 개의 도메인 레코드를 생성해서 여러 개의 배포 서버를 만들어낼 수 있다.

- 올바르게 입력됐다면
- `sudo service nginx status -l`
- `sudo systemctl restart nginx` 입력하기
- 브라우저 주소창에 도메인을 입력해보자. 잘 나온다면 성공이다. (이 때 프로젝트는 pm2로 서버가 돌아가고 있어야 한다.)

## 요약

1. region 설정
2. 인스턴스 생성
3. 인스턴스 환경 설정
4. 로드밸런서 설정
5. 도메인 레코드 추가
6. pm2로 서버 실행
7. 리버스 프록시 설정

## 마무리

사실 내가 정리한 배포 방법대로 한다고 잘 된다는 보장을 할 수는 없는 것 같다.. 나도 남이 정리한 것대로 해도 잘 되지 않았기 때문에..🥺

배포 과정을 겪는 분들이 AWS라는 툴을 사용하는 시간은 적게 들이되 좀 더 의미있는 목표를 위해 배포 작업을 거치시길 바라며 포스트를 작성했다.
