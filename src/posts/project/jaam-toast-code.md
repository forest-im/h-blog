---
title: jaam toast code
tag: project
date: 2023-03-10 01:44:06
---

코드 톺아보기

# route - repos

```js
const reposRouter = (app: Router) => {
	app.use("/repos", route);

	route.post("/hooks", verifyGithubSignature, UpdateController.updateDeployment);
};
```

## scripts 1. UpdateController.updateDeployment

### 사용 scripts

- `getHeadCommitMessage`
- `runUpdateDeploymentCommands`

### 로직 순서

- 배포 업데이트 할 때 사용
- 유저가 pr을 올리면 등록된 웹훅으로 이 라우트에 post요청이 간다.

- Repo DB를 업데이트 함 (도중에 error나면 전체 취소해주기 위해서 트랜잭션 사용함)

  - `repoCloneUrl`
  - `lastCommitMessage`
  - `session`

## scripts 1-2. runUpdateDeploymentCommands

### 로직 순서

- 자식 프로세서 생성하는 `spawn` 사용
- 시그널 옵션을 설정해 자식 프로세스에 시그널을 전달하고 있음
- `new AbortController()`
  - AbortController는 `new AbortController()`를 사용해서 생성해서 사용하고 생성된 인스턴스에서 signal 프로퍼티로 AbortSignal을 받아서 fetch() 같은 DOM 요청과 통신할 수 있다.

---

# routes - deploy - post

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

---

# DeployController.deployInstance

## 사용 scripts

- `createDeploymentInstance`

## 로직 순서

- req.body에 유저가 입력한 node 버전, 빌드 명령어, cra인지 next인지 등 들어옴
- ```
   const repoBuildOptions = {
    repoOwner,
    repoName,
    repoCloneUrl,
    repoUpdatedAt,
    nodeVersion,
    installCommand,
    buildCommand,
    envList,
    buildType,
    lastCommitMessage,
  };
  ```

- ```js
  const { deployedUrl, instanceId } = await createDeploymentInstance(repoBuildOptions);
  ```

- buildOptions 넣어서 `createDeploymentInstance`실행 후 `deployedUrl`, `instanceId` 얻기
- `createRepoWebhook`으로 유저 레포지토리에 웹훅 생성
- `req.deploymentData`에 데이터 넣어서 `next()` 실행

  - ```js
    req.deploymentData = {
    	...repoBuildOptions,
    	instanceId,
    	deployedUrl,
    	lastCommitMessage,
    	webhookId
    };
    ```

## script 1-1. createDeploymentInstance

### 사용 scripts

- `buildDeploymentCommands`
  - `buildDeploymentCommands`으로 새 인스턴스 만들기 위한 `commands` (명령어들 모음) 생성
- `createInstance` (deploy/aws/ec2_createinstances.ts)

### script 1-1-1. createInstance

#### 사용 scripts

- `RunInstancesCommand`(@aws-sdk/client-ec2) [Class RunInstancesCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/classes/runinstancescommand.html)
  - 권한 있는 AMI 사용해서 지정된 수의 인스턴스 시작하는 명령어
- `ec2Client` (`new EC2Client({ region: REGION })`)
  - [인터페이스 Ec2Client](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/services/ec2/Ec2Client.html)
  - EC2에 액세스하기 위한 서비스 클라이언트

#### 로직 순서

```js
const instanceParams = {
	ImageId: Config.AMI_ID,
	InstanceType: Config.INSTANCE_TYPE,
	KeyName: Config.KEY_PAIR_NAME,
	MinCount: 1,
	MaxCount: 1,
	UserData: Buffer.from(commands.join("\n")).toString("base64"),
	IamInstanceProfile: {
		Arn: Config.IAM_INSTANCE_PROFILE
	}
};
```

- `RunInstancesCommand` instance 옵션 넣어서 실행 후 command 변수에 저장
- `ec2Client.send(command)`
- `return instance id`

---

# DeployController.deployDomain

## 사용 scripts

- `describeInstanceIp`
- `changeDNSRecord`

## 로직 순서

- req.query에서 githubAccessToken 얻기
- req.deploymentData에서 repoName, instanceId 얻기
- public ib 주소 얻는 `setInterval` 실행
- recordId 상태가 pending 또는 insync가 아닌 경우 `changeDNSRecord`실행해서 `recordChangeInfo` 얻음
- `recordChangeInfo`가 없으면 에러 처리
- `recordChangeInfo`에 recordId가 있으면 인터벌 clear
- `req.deploymentData`에 데이터 업데이트

### scripts 1. describeInstanceIp

#### 사용 scripts

- `DescribeInstancesCommand`

  - [Class DescribeInstancesCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ec2/classes/describeinstancescommand.html)
  - 저장된 인스턴스 또는 모든 인스턴스를 설명함
  - 인스턴스 ID 지정하는 경우 출력에는 지정된 인스턴스에 대한 정보만 포함됨

- `ec2Client`

### scripts 2. changeDNSRecord

#### 사용 scripts

- `ChangeResourceRecordSetsCommand` [Class ChangeResourceRecordSetsCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-route-53/classes/changeresourcerecordsetscommand.html)
  - 지정된 도메인 이름 또는 하위 도메인 이름에 대한 권한 있는 DNS 정보가 포함된 리소스 레코드 집합을 만들거나, 변경하거나 삭제한다.
  - 예를 들어 ChangeResourceRecordSets를 사용하여 test.example.com에 대한 트래픽을 IP 주소가 192.0.2.44인 웹 서버로 라우팅하는 리소스 레코드 집합을 만들 수 있습니다.
- `RRType`
- `route53Client`
  - [인터페이스 Route53Client](https://sdk.amazonaws.com/java/api/latest/software/amazon/awssdk/services/route53/Route53Client.html)
  - route 53에 액세스하기 위한 서비스 클라이언트 (route 53은 dns 웹 서비스)
  - route 53을 사용해 다음을 할 수 있음
    - 도메인 이름 등록
    - 인터넷 트래픽을 도메인 리소스로 라우팅
    - 리소스 상태 확인

#### 로직 순서

- 레코드 이름 : `${subdomain}.${Config.SERVER_URL}`
- recordParams(옵션) 설정
- ChangeResourceRecordSetsCommand에 옵션 넣어 실행한 다음 command 얻기
- `route53Client`에 command넣어서 data 얻기

---

# DeployController.deployCertbot

## 사용 scripts

- `runCertbot`

## 로직 순서

- `req.deploymentData`에서 repoName, instanceId, recordId 얻기
- `runCertbot`에 instanceId, recordId, repoName, req.deploymentData 넣어서 실행

### scripts 1. runCertbot

#### 사용 scripts

- `getRecordInstanceStatus`
- `runCertbotCommands`
- `RRType`
- `runCertbotCommands`
- `terminateInstance`
- `changeDNSRecord`
- `deleteRepoWebhook`

#### 로직 순서

- 인터벌 (핑) 실행
- record, instance 상태 수집
- 조건 1. record 상태가 INSYNC(변경 사항이 모든 dns 서버에 전파됨)이고 instance 상태가 running일 때 인터벌을 제거하고 2분(120000ms) 후에 `runCertbotCommandsDelay` 실행
  - `runCertbotCommandsDelay`:
- 조건 2. triesLeft가 1보다 작거나 같을 때 interval 제거
  - `terminateInstance` 이용해서 `TerminateInstancesCommand` (지정된 인스턴스 종료)메서드 실행
  - 웹훅 제거 `deleteRepoWebhook`
  - dns record delete 명령 `changeDNSRecord`
  - 프로미스 reject 반환

### scripts 1-1. getRecordInstanceStatus

#### 사용 scripts

- `describeInstanceIp`
- `describeRecord`

#### 로직 순서

- describeInstanceIp로 인스턴스 변경 상태를 수집
- describeRecord로 record 변경 상태 수집해서 recordStatus(INSYNC 또는 PENDING)에 담음

### scripts 1-1-2. describeRecord

#### 사용 scripts

- `GetChangeCommand`
  - 변경 batch request 현재 상태 반환한다. 상태는 PENDING 또는 INSYNC
  - pending: 이 요청 변경 사항이 모든 route 53 dns 서버에 전파되지 않았음을 나타냄 이건 모든 변경 배치 req의 초기 상태임
  - insync: 변경 사항이 모든 route 53 dns 서버에 전파되었음을 나타냄

### scripts 1-2. runCertbotCommands

#### 사용 scripts

- `spawn` (자식 프로세스 생성)

#### 로직

- 자식 프로세스 사용해서 certbot command 실행

# DeployController.deployLogs

## 사용 scripts

- `runGetFilteredLogEvents`

## 로직 순서

- `req.deploymentData`에서 repoName, instanceId 얻음
-

## script 1. runGetFilteredLogEvents

### 사용 scripts

- `getLogStreamStatus`
- `getFilteredLogEvents`

### 로직 순서

- promise 반환하는 함수 안에서 `logStreamStatusInterval` 이름의 인터벌 실행
- `getLogStreamStatus`으로 로그 상태 얻음
- `logStreamName`이 instance id와 같으면 인터벌 종료
  - 1분 뒤에 실행하는

### script 1-1. getLogStreamStatus

#### 사용 scripts

- `describeLogStreams`

#### 로직 순서

- debug에 log stream 상태 찍으면서, 로그 상태 return

#### script 1-1-1. describeLogStreams

##### 사용 scripts

- `DescribeLogStreamsCommand`
  - [Class DescribeLogStreamsCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudwatch-logs/classes/describelogstreamscommand.html)
  - 지정된 로그 그룹에 대한 로그 스트림을 나열함. 모든 스트림 나열 또는 접두사별로 결과 필터링 가능

##### 로직

- log 그룹 이름을 "user-data.log"로 한 특정 instance id 로그 얻은 후 return

### script 1-2. getFilteredLogEvents

#### 사용 scripts

- `FilterLogEventsCommand`
  - [Class FilterLogEventsCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-cloudwatch-logs/classes/filterlogeventscommand.html)
  - 지정된 로그 그룹의 로그 이벤트 나열함. 기본적으로 이 작업은 1MB(최대 10,000개의 로그 이벤트)에 들어갈 수 있는 만큼의 로그 이벤트 또는 지정된 시간 범위 내에서 발견된 모든 이벤트를 반환함.

# DeployController.deploySaveData
## 사용 scripts

## 로직 순서
- 세션 시작 (트랜잭션 사용)
  - 레포 생성
  - User에 레포 추가
- 세션 종료

# DeployController.deployFilterData
## 로직
- 데이터 response로 전송

# routes - deploy - get
```js
  route.get(
    "/:user_id",
    validateSchema(
      Joi.object({
        user_id: Joi.string().regex(/^[a-f\d]{24}$/i),
      }),
      "params[user_id]",
    ),
    DeployController.getUserDeployList,
  );
```

# DeployController.getUserDeployList
## 로직
- 유저 모델에서 id와 맞는 값 찾아서 myRepos 값만 response로 전송

# routes - deploy - delete
```js
  route.delete(
    "/:user_id/:repo_id",
    validateSchema(
      Joi.object({
        user_id: Joi.string().regex(/^[a-f\d]{24}$/i),
      }),
      "params[user_id]",
    ),
    UpdateController.deleteDeployment,
  );
```

# UpdateController.deleteDeployment
## 사용 scripts
- `deleteLogStream`
  - `DeleteLogStreamCommand`
- `describeInstanceIp`
  - `DescribeInstancesCommand` 저장된 인스턴스 또는 모든 인스턴스를 설명함
- `changeDNSRecord`
## 로직
- 세션 시작
  - 유저 모델 업데이트 
  - 레포 모델에서 삭제
- 세션 종료

## changeDNSRecord
### 사용 scripts
- `ChangeResourceRecordSetsCommand`
  - 지정된 도메인 이름 또는 하위 도메인 이름에 대한 권한 있는 DNS 정보가 포함된 리소스 레코드 집합을 만들거나, 변경하거나 삭제한다.
- `terminateInstance`
- `deleteRepoWebhook`