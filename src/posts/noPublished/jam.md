---
title: jam
tag: project
date: 2023-03-07 10:18:56
published: false
---

## 읽어볼 것

- [코드 리뷰 in 뱅크샐러드 개발 문화](https://blog.banksalad.com/tech/banksalad-code-review-culture/)

## 물어볼 것

- 노션 아이디어 구상 및 조사에 람다 적혀있는데 안쓰신 건지 이 부분 어떻게 구현됐는지
- 왜 도커 안쓰셨는지
- 추가하고 싶은 기능이나 수정하고 싶은 기능 있는지
- 환경변수 전달받기
- IAM 어떤식으로 사용했는지
  - 깃허브 계정으로 IAM을 만들 수 있는건지
- 배포 하다가 웹 창 닫으면 배포 중지 되는건지

## 개선하고 싶은 점

- 속도 개선
- 대시보드

  - log 히스토리
  - 라이트하우스, 사이트 측정 도구

- 결제 기능 추가?

  - 트래픽이나 사용량 측정

- 셋팅

  - 유저 도메인 연결

- 최대 절전모드?

- cdn 배포?

## ec2 Amazon Elastic Compute Cloud

- aws에서 제공하는 클라우드 컴퓨팅
- 독립된 컴퓨터를 임대해주는 서비스
- 키 페어

  - 인스턴스 연결할 때 자격 증명 입증에 사용
  - 퍼블릭 키를 인스턴스에 저장하고 프라이빗 키는 사용자가 저장함

- 애플리케이션은 aws 자격 증명으로 api 요청에 서명해야 한다. 앱 개발자는 ec2 인스턴스에서 실행되는 인스턴스의 자격 증명을 관리할 전략을 수립해야 함
  - IAM 사용하면 보안 자격 증명 직접 관리할 필요없이 api요청 전송할 수 있는 것 같음

AWS 자격 증명을 생성하고 배포하는 대신 다음과 같이 IAM 역할을 사용하여 API 요청 전송 권한을 위임할 수 있습니다.

- IAM 역할 생성.
- 역할을 수행할 수 있는 계정 또는 AWS 서비스를 정의합니다.
- 역할을 수행하면서 애플리케이션이 사용할 수 있는 API 작업 및 리소스를 정의합니다.
- 인스턴스를 시작할 때 역할을 지정하거나, 기존 인스턴스에 역할을 연결합니다.
- 애플리케이션에서 임시 자격 증명 세트를 검색하여 사용하도록 합니다.

인스턴스 프로파일

- Amazon EC2에서는 인스턴스 프로파일을 IAM 역할의 컨테이너로 사용
- IAM 콘솔을 사용하여 IAM 역할을 생성하면 인스턴스 프로파일이 자동으로 생성되고 해당 역할과 동일한 이름이 지정된다.
- [Amazon EC2의 IAM 역할](https://docs.aws.amazon.com/ko_kr/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html)

## 인스턴스

- 가상 컴퓨터
- 인스턴스 유형에 따라 달라짐

## AWS-SDK란

- Software Development Kit
- 특정 서비스를 프로그래밍적으로 제어하기 편리하도록 제공되는 개발에 필요한 도구들

```
"@aws-sdk/client-cloudwatch-logs": "^3.209.0",
"@aws-sdk/client-ec2": "^3.204.0",
"@aws-sdk/client-route-53": "^3.206.0",
"@aws-sdk/client-s3": "^3.199.0",
```

## AWS-SDK로 EC2 인스턴스 생성

Amazon EC2에서 인스턴스를 시작할 때 User Data를 인스턴스에 전달하여 일반적인 구성 작업을 자동으로 수행하는 데 사용하도록 할 수 있고, 인스턴스가 시작된 후에 스크립트를 실행할 수도 있습니다

## IAM

AWS Identity and Access Management(IAM)은 AWS 리소스에 대한 액세스를 안전하게 제어할 수 있는 웹 서비스

IAM 역할은 계정에 생성할 수 있는, 특정 권한을 지닌 iam 자격 증명
그러나 역할은 한 사람과만 연관되지 않고 해당 역할이 필요한 사람이라면 누구든지 맡을 수 있어야 합니다. 또한 역할에는 그와 연관된 암호 또는 액세스 키와 같은 표준 장기 자격 증명이 없습니다. 대신에 역할을 맡은 사람에게는 해당 역할 세션을 위한 임시 보안 자격 증명이 제공됩니다.

## 배포 기능 순서

1. AWS-SDK로 EC2 인스턴스 생성

new project

```
- getOrgs 요청 (`/users/${userId}/orgs`)
- type ListUserOrgsResponse = Endpoints["GET /users/{username}/orgs"]["response"];
- github api/orgs에 요청보내서 데이터 받기
```

```
spaceName: org.login,
spaceUrl: org.repos_url,
spaceImage: org.avatar_url,
```

- org는 organization인감

deployRepo

```js
route.post(
	"/:user_id",
	validateSchema(
		Joi.object({
			user_id: Joi.string().regex(/^[a-f\d]{24}$/i)
		}),
		"params[user_id]"
	),
	DeployController.deployInstance,
	DeployController.deployDomain,
	DeployController.deployCertbot,
	DeployController.deployLogs,
	DeployController.deploySaveData,
	DeployController.deployFilterData
);
```

### deployInstance로

- 아마존 머신 이미지 - 새로운 이미지 만들 때 더 빨리 만들 수 있다?

```js
  req.deploymentData = {
    ...repoBuildOptions,
    instanceId,
    deployedUrl,
    lastCommitMessage,
    webhookId,
      - github 웹훅 이용(pr)
  };
```

- 내려주기

- publicIpAddress가 뭐지?
  퍼블릭 IPv4 주소
  기본 VPC에서 인스턴스를 시작하면 기본적으로 퍼블릭 IP 주소가 할당됩니다. 기본이 아닌 VPC에서 인스턴스를 시작할 때 서브넷에는 해당 서브넷으로 시작한 인스턴스가 퍼블릭 IPv4 주소 풀에서 퍼블릭 IP 주소를 수신하는지 여부를 결정하는 속성이 있습니다. 기본적으로 기본이 아닌 서브넷에서 시작된 인스턴스에 퍼블릭 IP 주소를 할당하지 않습니다.

### deployDomain

## IAM

- 권한 관련된 iam role
  - 권한 설정 해줄 수 있다.

```js
req.deploymentData.recordId = recordChangeInfo.recordId;
req.deploymentData.publicIpAddress = recordChangeInfo.publicIpAddress;
req.deploymentData.githubAccessToken = githubAccessToken as string;
```

- route53 레코드 생성
  탄력적 IP 주소(EIP): 동적 클라우드 컴퓨팅을 위한 고정 IPv4 주소

### deployCerbot

- 엔진x랑 묶어서 해주고 있음
- https 인증서 받는 것 같은뎅?

```js
  const runCertbotResponse = await runCertbot(
    instanceId as string,
    recordId as string,
    repoName,
    req.deploymentData,
  );
```

- Route53
  - 인터벌로 핑을 보내서 인스턴스가 다 만들어졌는지 답변을 받을 때 까지 기다림

### deploySaveData

- User에 새 session, new repo 추가

### deployFilterData

- 디플로이 데이터 리스폰스 전달

3월 28일 (3월 31일)

7일

- 기능 구현 정하기

8일

- 칸반

vercel - front

- line 블로그 oneclick 배포 툴

https://engineering.linecorp.com/ko/blog/how-to-quickly-develop-static-pages-in-line/

람다 -> 테스팅 잘 안됨 (arg)

lambda edge로 경로 바꾸는 작업
요금제.. 요청 변조..

웹사이트 - 도메인

s3 - static

- static hosting
- csr은 여기서 처리하고

csr, ssr

-

인스턴스의 ip주소

엔진x

- 로드밸런싱도 가능..
- 프록시 서버 (프론트단도 가능.. reverse 프록시 (서버단..))

- 대시보드 보완 (vercel 클론)

- 빌딩로그

## 인터벌

-

-y ?

- 2분 .. 1분
  - 인스턴스가 잘 돌아가는지.. route53잘 돌아가는지 핑으로 확인 후 준비가 됐다고 해도 안됐던..
  - ec2, 도메인이 미리 준비되어있어야
    - 버셀은 미리 만들어놓는 것 같음.. 인스턴스를 미리 만들어놓기
- 절전모드 휴먼처리
- 실시간 로그들이 아니라서 에러가 났을 때 대응.. 어떻게 롤백..

## front

- 유저 사용성
  - 실패시 ui
  - 백에서도 실패시 데이터 롤백. (실제로 롤백이 잘 되는지)

## back

- 버셀 클론 (기획은 정해진 것 대로)
- 강제로 대기하는 부분, 리소스 낭비 최소화 할 수 잇는 오토 스케일링 기능
- 브랜치 크기 줄이기
- 과금..

버셀 장점

- 컴파일 속도

사용성 측면..

## 소켓

- 많은 유저가 요청을 하면 소켓이 어떻게 될지 (트래픽이 한번에 몰리면)
  - 트래픽 스로틀링, 토큰 버킷 알고리즘
- 에러..

스위치 맵

- 데이터 날라오면 rxjx 데이터 구독 -> 다른 요청을 보내면 취소할 수 있음

## 깃헙

- 버셀 앱
  - 깃헙앱을 처음에 만들면 활용할 수 있는
  - ci도 여러가지 해볼 수 있을 것 같다.

pr, 칸반..

## 깃헙

- cors
  - 백엔드에서 (oAuth) 요청 -> 클라이언트

## 유저 라우터

- 레포, 올게니제이션 가져오는 거 (깃헙 api 요청 형식에 따라서 한 것)

## 디플로이 라우터

### 인스턴스 만들

- builddeploycommands
  - 필요한 명령어를 조합하는 곳
  - ec2 인터슽 환경에 필요한 명령어들 받아서

#### debug

cloud로그 쓰려면 agent 설정 해야함
템플릿 리터럴 -> 유저가 쓴 것에 따라 다르게

ssma

명령어들의 집합 -> commands
-> 버전들 따라 바꿔줘야할 수도

createInstance(commands) -> id받음
(문서에 나와있는 대로 되어잇음)

## 도메인

인터벌
abortcontroller
실패 -> 캐치에서 넘어왔을 때 인스턴스 삭제.. 웹훅 삭제.. (데이터 롤백인데..)

- 실패했을 때 단계적으로 더 고려해보면 더 좋을 듯.
- 트랜잭션...
- 데이터 무결성을 위해서 어떻게 할건지..
- 몽구스.. 트랜잭션 (전체를 하나로 보고..)

변수명 -> aws 콘솔.. 그 부분의 것을 가져오느라 변수

runCertbotCommands -> 핑
-> 준비 다 됐으면 실행

cli

- child process

log - 1분 기다림

엔진x - 서버의 부하분산

- 프록시.......

file system, file watch

인스턴스의 멀티 프로세스.. 멀티 스레드? 가능?
swc

google athenticat

gmail -> 태완님

iam -> mfa
DailyMentors

---

## 0308 할 것

- [ ] https://vercel.com/blog/behind-the-scenes-of-vercels-infrastructure 보기

## vercel git 리포지토리 자동 배포

## 버셀 까보기

1. 데이터 스토리지 서비스에 업로드할 프로젝트 파일 포함된 post 요청

2. 배포 생성

- 파일이 스토리지에 업로드되면 빌드 및 배포 프로세스 시작하라는 post 요청 이뤄짐
- 배포 생성 전에 vercel은 먼저 사용자 인증하고 무단 액세스, 무결성 손실로부터 보호하기 위해 사용자 권한, 진위 여부 확인 위한 요청 검사함

3. 확인 후 구축 위한 배포 예약

- 버셀 빌드 컨테이너는 돈 내면 빌드 프로세스 즉시 시작 가능 무료 버전은 1개의 동시 빌드 가능, 프로는 최대 12개 가능, 맞춤형도 가능

4.

vercel은 pnpm을 사용한다.

### pnpm performant npm

- npm보다 낫고 yarn보다 빠름
- yarn보다 빠르게 하기 위해서 node_modules를 플랫하기 만들지 않는다.

npm을 사용할 때 종속성을 사용하는 프로젝트가 100개 있는 경우 해당 종속성의 사본 100개가 디스크에 저장된다. pnpm을 사용하면 종속성이 콘텐츠 주소 지정 가능 저장소에 저장된다.

- 다른 버전의 종속성을 사용하는 경우 다른 파일만 저장소에 추가된다. (100개의 파일이 있고 새 버전에서 해당 파일 중 하나만 변경된 경우 pnpm update 단일 변경에 대해서만 전체 종속송얼 복제하는 대신 1개의 새 파일만 저장소에 추가한다.)
- 모든 파일은 디스크의 단일 위치에 저장된다. 패키지가 설치되면 해당 파일이 단일 위치에서 하드 링크되어 추가 디스크 공간을 사용하지 않는다. 이를 통해 프로젝트 간에 동일한 버전의 종속성을 공유할 수 있다.

- 인스톨 엄청 느린데?

- ec2 정리하기
- 로그 관련 자료 찾아보기

## 인스턴스 재사용 방법 생각해보기

## 1. 유저별로 관리하기

### 1-1. 유저별로 인스턴스 재사용

- 같은 유저가 배포 후에 다른 사이트를 배포하는 경우 새 인스턴스 생성하지 않고 하나의 인스턴스에 여러 도메인 서버 구성하기
  - [Lightsail 하나의 인스턴스에 여러 도메인 서버 구성하기](https://lab.naminsik.com/4336)
- 인스턴스를 도커로 컨테이너화 하기

### 1-2. 여러 인스턴스 쿠버네티스 설정

- 인스턴스 하나당 도커 컨테이너가 구성되므로 쿠버네티스를 설정해서 여러 컨테이너 관리가 가능하도록 구축

### 고려해야 할 점

- 지금 현재 인스턴스 옵션으로는 CRA 기본 프로젝트만 배포 가능한 상황. 인스턴스 안에 여러 서버를 구성하면 더 느려질 가능성이 있어 인스턴스 옵션 강화할 필요 있음

## 2. 개수별로 관리하기

### 1-1. 유저 구분 없이 개수로 인스턴스 재사용

- 인스턴스에 서버 개수를 정한 후, 인스턴스 서버 리밋이 차면 다시 인스턴스를 생성하는 식으로 하면 어떨까?
- 로드 밸런서.. 오토 스케일링..

---

1개의 VM 내 도커 구성 -> 컨테이너를 어떤 VM에 넣어줄지 결정하는 로직 필요 -> SSR 서버가 어떤 VM에 어떤 포트로 연결되는지 등의 관리를 위한 DB 필요
Kubernates 란 ?
VM + 컨테이너 관리 시스템(Docker, CRI-O, Containerd, etc.) + 그러한 ( VM + 관리 시스템 )을 관리하는 도구 세트
즉, VM + Docker를 관리할 관리 도구도 필요한 상황
=> 뭔가 쿠버네티스스러운 걸 만들겠다,, ?
EC2 대신, ECS 활용의 경우 ECS 컨테이너를 띄워 달라고 Amazon API에 요청만 넣으면 됨
새 항목

---
