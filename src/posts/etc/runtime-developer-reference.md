---
title: Runtime Developer Reference
tag: Vercel
date: 2023-03-08 19:13:41
---

다음 페이지는 런타임 API 인터페이스를 구현하여 런타임을 생성하는 방법에 대한 참조입니다.
런타임을 만드는 방법에 대한 참조입니다. 이는 버셀에 새로운 프로그래밍 언어에 대한 지원을 추가하는 방법입니다.

> Note: If you're the author of a web framework, please use the [Build Output API](https://vercel.com/docs/build-output-api/v3) instead to make your framework compatible with Vercel.

런타임은 다음 인터페이스를 구현하는 npm 모듈입니다:

```typescript
interface Runtime {
	version: number;
	build: (options: BuildOptions) => Promise<BuildResult>;
	prepareCache?: (options: PrepareCacheOptions) => Promise<CacheOutputs>;
	shouldServe?: (options: ShouldServeOptions) => Promise<boolean>;
	startDevServer?: (options: StartDevServerOptions) => Promise<StartDevServerResult>;
}
```

버전 프로퍼티와 빌드() 함수만 필수 필드입니다. 나머지는 런타임이 기능을 향상하기 위해 구현할 수 있는 선택적 확장 기능입니다. 이러한 함수는 아래에 자세히 설명되어 있습니다.

공식 런타임은 패키지로 [the npm registry](https://npmjs.com)에 게시되며 vercel.json 구성 파일의 use 속성에서 참조됩니다.

> **참고**: `builds` 배열의 `use` 속성은 런타임을 테스트하는 데 유용한 git 저장소 URL과 같은 모든 npm 설치 인수와 함께 작동합니다. 또는 `functions` 속성을 사용하려면 안정성을 위해 npm에 게시된 특정 태그를 지정해야 합니다.

사용 예시를 보려면 [Runtimes Documentation](https://vercel.com/docs/runtimes) 문서를 참조하세요.

## Runtime Exports

### `version`

사용할 런타임 API 버전을 결정하는 **required** exported constant입니다.

최신 및 권장 버전은 `3`입니다.

**Example:**

```typescript
export const version = 3;
```

### `build()`

서버리스 함수를 반환하는 **required** exported function입니다.

> 서버리스 함수란 무엇인가요? 자세한 내용은 [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions) 함수에 대해 읽어보세요.

**Example:**

```typescript
import { BuildOptions, createLambda } from "@vercel/build-utils";

export async function build(options: BuildOptions) {
	// Build the code here…

	const lambda = createLambda(/* … */);
	return {
		output: lambda,
		routes: [
			// If your Runtime needs to define additional routing, define it here…
		]
	};
}
```

### `prepareCache()`

directory, making it faster to install npm dependencies for
future builds.

`build()`가 완료된 후 실행되는 **선택적** 내보내기 함수입니다. 구현은 사용자 프로젝트에서 다음 빌드 실행을 위해 작업 디렉터리에 미리 채워질 `File` 객체를 반환해야 합니다. 사용 사례의 예로 `@vercel/node`는 이 함수를 사용하여 `node_modules` 디렉터리를 캐시하여 향후 빌드에 대한 npm 종속성을 더 빠르게 설치합니다.

**Example:**

```typescript
import { PrepareCacheOptions } from "@vercel/build-utils";

export async function prepareCache(options: PrepareCacheOptions) {
	// Create a mapping of file names and `File` object instances to cache here…

	return {
		"path-to-file": File
	};
}
```

### `shouldServe()`

버셀 CLI에서 `vercel dev`만 사용하는 **선택적** 내보내기 함수이며 [Runtime](https://vercel.com/docs/runtimes)이 특정 요청 경로에 대한 응답을 책임질지 여부를 나타냅니다.

**Example:**

```typescript
import { ShouldServeOptions } from "@vercel/build-utils";

export async function shouldServe(options: ShouldServeOptions) {
	// Determine whether or not the Runtime should respond to the request path here…

	return options.requestPath === options.entrypoint;
}
```

이 함수가 정의되지 않은 경우, Vercel CLI는 [default implementation](https://github.com/vercel/vercel/blob/52994bfe26c5f4f179bdb49783ee57ce19334631/packages/now-build-utils/src/should-serve.ts)사용합니다.

### `startDevServer()`

🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨 중요

[Vercel CLI](https://vercel.com/download)에서 버셀 개발자만 사용하는 선택적 내보내기 함수입니다. 이 함수를 정의하면 버셀 CLI는 `build()` 함수를 호출하지 **않고** 대신 모든 HTTP 요청에 대해 이 함수를 호출합니다. 프로덕션에서 사용되는 `build()` 프로세스 전체를 거치지 않고 최적화된 개발 환경을 제공할 수 있는 기회입니다.

이 함수는 HTTP 요청당 한 번씩 호출되며, HTTP 요청이 수신되면 진입점 코드를 실행할 HTTP 서버를 생성하는 자식 프로세스를 생성할 것으로 예상됩니다. 이 자식 프로세스는 단일 서브입니다(단일 HTTP 요청에만 사용됨). HTTP 응답이 완료되면 `vercel dev`은 자식 프로세스에 종료 신호를 보냅니다.
startDevServer()`함수는`port`번호가 있는 객체를 반환합니다.
자식 프로세스의 HTTP 서버가 수신 대기 중인 객체 (임시 포트여야 합니다.)  와 자식 프로세스의 프로세스 ID를 반환하는데,`vercel dev`가 종료 신호를 보내는 데 사용합니다.
[ephemeral port](https://stackoverflow.com/a/28050404/376773)

> 힌트: 자식 프로세스가 수신 대기 중인 임시 포트를 확인하려면 어떤 형태의 [IPC](https://en.wikipedia.org/wiki/Inter-process_communication)가 필요합니다. 예를 들어, `@vercel/go`에서 자식 프로세스는 포트 번호를 파일 기술자 3[_file descriptor 3_](https://en.wikipedia.org/wiki/File_descriptor)에 쓰고, 이 포트 번호는 `startDevServer()` 함수 구현에서 읽습니다.

또한 특정 요청 경로 또는 진입점에 대해 이 동작을 옵트아웃하려면 `null`을 반환할 수도 있습니다.

**Example:**

```typescript
import { spawn } from "child_process";
import { StartDevServerOptions } from "@vercel/build-utils";

export async function startDevServer(options: StartDevServerOptions) {
	// Create a child process which will create an HTTP server.
	//
	// Note: `my-runtime-dev-server` is an example dev server program name.
	// Your implementation will spawn a different program specific to your runtime.
	const child = spawn("my-runtime-dev-server", [options.entrypoint], {
		stdio: ["ignore", "inherit", "inherit", "pipe"]
	});

	// In this example, the child process will write the port number to FD 3…
	const portPipe = child.stdio[3];
	const childPort = await new Promise((resolve) => {
		portPipe.setEncoding("utf8");
		portPipe.once("data", (data) => {
			resolve(Number(data));
		});
	});

	return { pid: child.pid, port: childPort };
}
```

### Execution Context

- 런타임은 서버리스 함수 런타임 환경과 거의 일치하는 Linux 컨테이너에서 실행됩니다.
- 런타임 코드는 Node.js 버전 `12.x`를 사용하여 실행됩니다.
- 보안상의 이유로 각 배포마다 새로운 샌드박스가 생성됩니다.
- 샌드박스는 실행 사이에 정리되어 빌드 간에 남아있는 임시 파일이 공유되지 않도록 합니다.

내보내는 모든 API(`analyze()`, `build()`, `prepareCache()`, etc.)가 동일한 프로세스에서 실행되는 것은 보장되지 않지만, 노출하는 파일 시스템(예: workPath 및 `getWritableDirectory` 호출 결과)은 유지됩니다.

이러한 단계 간에 상태를 공유해야 하는 경우 파일시스템을 사용하세요.

### Directory and Cache Lifecycle

새 빌드가 생성되면 '분석'에 제공된 '작업 경로'에 이전 빌드의 '준비 캐시' 단계의 이전 빌드.

`분석`단계는 해당 디렉터리를 수정할 수 있으며, 이 디렉터리는`build`및`prepareCache`에 제공될 때 다시 생성되지 않습니다.

### Accessing Environment and Secrets

사용자가 `build.env`로 지정한 Environment and Secrets은 런타임 프로세스에 전달됩니다. 즉, Node.js의 `process.env`를 통해 사용자 환경설정에 액세스할 수 있습니다.

### Supporting Large Environment

4KB 이상의 환경(최대 64KB)을 지원할 수 있는 기능을 제공합니다.
람다 런타임 래퍼를 통해 4KB 이상의 환경을 지원할 수 있습니다. 이 기능은
기존의 많은 Lambda 런타임에서 지원되지만, 사용자 정의 런타임을 사용하려면
추가 작업이 필요할 수 있습니다.

다음 Lambda 런타임 제품군에는 런타임 래퍼가 기본으로 지원됩니다:

- `nodejs`
- `python` (>= 3.8)
- `ruby`
- `java11`
- `java8.al2` (not `java8`)
- `dotnetcore`

사용자 정의 런타임이 이러한 람다 런타임 중 하나를 기반으로 하는 경우, 대규모 환경을 지원은 추가 구성 없이 사용할 수 있습니다. 사용자 정의 런타임 기반 `provided`, `provided.al2` 런타임을 포함하여 다른 Lambda 런타임을 기반으로 하는 사용자 정의 런타임은 런타임 래퍼 지원을 구현하고 `createLambda`를 호출할 때 `supportsWrapper` 플래그를 통해 이를 표시해야 합니다.

사용자 정의 런타임에 런타임 래퍼에 대한 지원을 추가하려면 먼저 부트스트랩 스크립트에서
`AWS_LAMBDA_EXEC_WRAPPER` 환경 변수의 값을 확인합니다. 이 값은
래퍼 실행 파일의 경로입니다.

래퍼에는 런타임 경로와 런타임에 필요한 모든 매개변수를 전달해야 합니다.
런타임에 필요한 매개변수를 전달해야 합니다. 이 작업은 작은 `bootstrap` 스크립트에서 가장 쉽게 수행할 수 있습니다.

이 간단한 `bash` 예제에서는 다음과 같은 경우 런타임이 직접 호출됩니다.
`AWS_LAMBDA_EXEC_WRAPPER`에 값이 없으면 래퍼가 직접 호출되고, 그렇지 않으면 매개변수로
런타임 명령을 매개변수로 사용하여 래퍼를 호출합니다.

```bash
#!/bin/bash

exec $AWS_LAMBDA_EXEC_WRAPPER path/to/runtime param1 param2
```

`bootstrap` 파일이 런처 스크립트가 아니라 런타임의 진입점인 경우
자체의 진입점인 경우 부트스트랩 프로세스를 래퍼로 대체합니다. 실행 파일의 경로와 매개변수
실행 파일의 경로와 매개변수를 전달하고,`AWS_LAMBDA_EXEC_WRAPPER` 환경 변수가 공백으로 설정되어 있는지 확인합니다.
공백으로 설정되어 있는지 확인합니다.

이 `bash` 예제에서는 `exec`을 사용하여 실행 중인 부트스트랩 프로세스를
래퍼로 대체하여 자체 경로와 매개변수를 전달합니다.

```bash
#!/bin/bash

if [[ -n $AWS_LAMBDA_EXEC_WRAPPER ]]
  __WRAPPER=$AWS_LAMBDA_EXEC_WRAPPER
  AWS_LAMBDA_EXEC_WRAPPER=""
  exec $__WRAPPER "$0" "${@}"
fi

# start the actual runtime functionality
```

변수를 설정 해제하면 람다가 런타임 프로세스를 스폰하는 방식 때문에 원하는 효과를 얻지 못할 수 있습니다. 명시적으로 공백으로 설정하는 것이 좋습니다.

기존 부트스트랩 프로세스를 대체하는 가장 좋은 방법은 [`execve`](https://www.man7.org/linux/man-pages/man2/execve.2.html) 시스콜을 사용하는 것입니다. 실행 중인 프로세스를 래퍼로 대체하기 위해 `bash`에서 `exec`를 사용하여 동일한 PID와 환경을 유지하면 됩니다.

런타임 래퍼에 대한 지원이 포함되면 `createLambda` 호출에서 `supportsWrapper`가 `true`로 설정되어 있는지 확인합니다. 이렇게 하면 빌드 프로세스가 이 런타임에 대한 대규모 환경 지원을 활성화하도록 알려줍니다.

### Utilities as peerDependencies

런타임을 npm에 게시할 때, 아래 API 정의에서 볼 수 있듯이 `@vercel/build-utils`를 종속 요소로 지정하지 말고 `peerDependencies`의 일부로 지정해야 합니다.

## `@vercel/build-utils` Types

### `Files`

```typescript
import { File } from "@vercel/build-utils";
type Files = { [filePath: string]: File };
```

일반 [JavaScript Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) 객체로 구현되는 추상 유형입니다. 가상 파일 시스템 표현으로 생각하면 도움이 됩니다.

입력으로 사용될 때, `Files` 객체는 `FileRefs`만 포함합니다. Files`가 출력인 경우, `FileRefs`뿐만 아니라 `Lambda`(서버리스 함수) 유형으로 구성될 수 있습니다.

유효한 출력 `Files` 객체의 예는 다음과 같습니다:

```javascript
{
  "index.html": FileRef,
  "api/index.js": Lambda
}
```

### `File`

TypeScript를 사용하는 경우 가져올 수 있는 추상 유형입니다.

```typescript
import { File } from "@vercel/build-utils";
```

유효한 `파일` 유형은 다음과 같습니다:

- `FileRef`
- `FileFsRef`
- `FileBlob`

### `FileRef`

```typescript
import { FileRef } from "@vercel/build-utils";
```

이것은 파일 식별자 문자열(체크섬)을 기반으로 우리 플랫폼에 저장된 추상 파일 인스턴스를 나타내는 [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)입니다. `Files`객체가 `analyze`또는 `build`에 대한 입력으로 전달되면, 그 값은 모두 `FileRef`의 인스턴스가 됩니다.

**Properties:**

- `mode: Number` file mode
- `digest: String` a checksum that represents the file

**Methods:**

- `toStream(): Stream` creates a [Stream](https://nodejs.org/api/stream.html) of the file body

### `FileFsRef`

```typescript
import { FileFsRef } from "@vercel/build-utils";
```

빌드 프로세스가 실행 중인 파일시스템에 존재하는 파일의 추상 인스턴스를 나타내는 [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)입니다.

**Properties:**

- `mode: Number` file mode
- `fsPath: String` the absolute path of the file in file system

**Methods:**

`static async fromStream({ mode: Number, stream: Stream, fsPath: String }): FileFsRef`: FileFsRef는 `Stream`에서 `FileFsRef`의 인스턴스를 생성하고, 모드와 함께 파일을 fsPath에 배치합니다.
toStream(): Stream은 파일 본문의 [Stream](https://nodejs.org/api/stream.html)을 만듭니다.

### `FileBlob`

```typescript
import { FileBlob } from "@vercel/build-utils";
```

메모리에 존재하는 파일의 추상 인스턴스를 나타내는 [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)입니다.

**Properties:**

- `mode: Number` file mode
- `data: String | Buffer` the body of the file

**Methods:**

- `static async fromStream({ mode: Number, stream: Stream }): FileBlob` creates an instance of a FileBlob from [`Stream`](https://nodejs.org/api/stream.html) with `mode`
- `toStream(): Stream` creates a [Stream](https://nodejs.org/api/stream.html) of the file body

### `Lambda`

```typescript
import { Lambda } from "@vercel/build-utils";
```

서버리스 함수를 나타내는 [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)입니다. 인스턴스는 `files`, `handler`, `runtime`, `environment`를 `createLambda` 헬퍼에 객체로 제공하여 생성할 수 있습니다. 이 클래스의 인스턴스는 직접 생성해서는 안 됩니다. 대신, `createLambda` 도우미 함수를 호출하세요.

**Properties:**

- `files: Files` the internal filesystem of the lambda
- `handler: String` path to handler file and (optionally) a function name it exports
- `runtime: LambdaRuntime` the name of the lambda runtime
- `environment: Object` key-value map of handler-related (aside of those passed by user) environment variables
- `supportsWrapper: Boolean` set to true to indicate that Lambda runtime wrappers are supported by this runtime

### `LambdaRuntime`

다음 가능한 '문자열' 값 중 하나로 구현되는 추상 열거 유형입니다:

- `nodejs18.x`
- `nodejs16.x`
- `nodejs14.x`
- `go1.x`
- `java11`
- `python3.9`
- `dotnet6`
- `dotnetcore3.1`
- `ruby2.7`
- `provided.al2`

## `@vercel/build-utils` Helper Functions

다음은 런타임 작성, 파일 시스템 조작, 위 유형 사용 등의 프로세스를 간소화하기 위해 `@vercel/build-utils`에 노출된 내용입니다.

### `createLambda()`

Signature: `createLambda(Object spec): Lambda`

```typescript
import { createLambda } from "@vercel/build-utils";
```

Constructor for the `Lambda` type.

```js
const { createLambda, FileBlob } = require("@vercel/build-utils");
await createLambda({
	runtime: "nodejs8.10",
	handler: "index.main",
	files: {
		"index.js": new FileBlob({ data: "exports.main = () => {}" })
	}
});
```

### `download()`

Signature: `download(): Files`

```typescript
import { download } from "@vercel/build-utils";
```

이 유틸리티를 사용하면 `Files` 데이터 구조의 내용을 다운로드할 수 있습니다.
구조체의 내용을 다운로드하여 그 안에 표현된 파일 시스템을 생성합니다.

Files`는 파일을 추상적으로 표현하는 방식이므로, 다음과 같이 생각할 수 있습니다.
다운로드()`는 가상 파일 시스템을 *실제*로 만드는 방법이라고 생각할 수 있습니다.

선택적\*\* `meta` 프로퍼티가 전달되면(
`build()`의 인수)가 전달되면 변경된 파일만 다운로드됩니다.
이는 해당 객체 내부의 `filesRemoved` 및 `filesChanged`를 사용하여 결정됩니다.

```js
await download(files, workPath, meta);
```

### `glob()`

Signature: `glob(): Files`

```typescript
import { glob } from "@vercel/build-utils";
```

이 유틸리티를 사용하면 파일 시스템을 *scan*하여 일치하는 글로브 검색 문자열의 `Files` 표현을 반환할 수 있습니다. 다운로드의 반대라고 생각하면 됩니다.

다음의 간단한 예제는 모든 것을 파일시스템에 다운로드한 후 다시 반환합니다(따라서 전달된 `Files`를 다시 생성하기만 하면 됩니다):

```js
const { glob, download } = require('@vercel/build-utils');

exports.build = ({ files, workPath }) => {
  await download(files, workPath);
  return glob('**', workPath);
};
```

### `getWritableDirectory()`

Signature: `getWritableDirectory(): String`

```typescript
import { getWritableDirectory } from "@vercel/build-utils";
```

경우에 따라 임시 디렉터리에 쓰고 싶을 수도 있습니다.

### `rename()`

Signature: `rename(Files, Function): Files`

```typescript
import { rename } from "@vercel/build-utils";
```

경로를 나타내는 `Files` 개체의 키 이름을 바꿉니다. 예를 들어 접미사 `*.go`를 제거하려면 다음과 같이 사용할 수 있습니다:

```js
const rename = require('@vercel/build-utils')
const originalFiles = { 'one.go': fileFsRef1, 'two.go': fileFsRef2 }
const renamedFiles = rename(originalFiles, path => path.replace(/\.go$/, '')
```
