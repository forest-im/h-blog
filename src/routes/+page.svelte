<script>
	import { onMount } from "svelte/internal";
	import { currentToc, currentPage } from "$lib/store";
	import profile04 from "$lib/images/profile04.png";
	import Category from "$lib/components/Category.svelte";

	export let data;

	onMount(() => {
		currentPage.reset();
		currentToc.reset();
	});
</script>

<Category categories={data.categories} postsCount={data.posts.length} />
<div class="all-prose m-4 min-h-[60vh] max-w-full">
	<div class="flex items-center justify-end">
		<h1 class="m-0 text-right dark:text-white">
			Hi. I'm Alex<span class="text-pointColor-900">.</span>
		</h1>
		<img class="inline h-40 w-40 shadow-none" src={profile04} alt="profile" />
	</div>

	<div>
		안녕하세요. 배우는 것을 즐기는 개발자 <span class="font-semibold text-pointColor-900"
			>임현정</span
		>입니다.
		<br />
		<br />

		<span
			>7년간 <a href="https://www.youtube.com/watch?v=bgoC3MI-EtI" target="_blank"
				>VFX 영상 컴포지터</a
			></span
		>
		일을 하며 그래픽 지식과 커뮤니케이션 스킬을 배웠습니다. <br /> 반복적인 작업이 많은 영상 일을
		개발을 통해 개선할 수 있다는 것을 알고서 개발 공부를 시작하게 되었습니다. 그러던 중 JavaScript의
		무궁무진한 매력에 빠지게 되어 영상보다 더 큰 흥미가 생겼고 그 이후 개발자를 목표로 달려가고
		있습니다.
		<br />

		<br /> 작업을 효율적이게 진행하고 반복 작업을 개선하는 것에 흥미가 많아,
		<span>
			<a href="https://github.com/vaco-algo/vaco-algo-study" target="_blank">알고리즘 스터디</a>
		</span>내에서 알고리즘 참가자를 등록하고 리뷰어를 매칭하는 부분을 자동화한
		<span class="font-semibold">
			<a href="https://github.com/vaco-algo/slack-server" target="_blank">Picker Bot(슬랙봇)</a
			></span
		>을 운영하고 있습니다. <br />
		<br />신기술에도 관심이 많지만 무엇보다 중요한 것은 기초를 확실히 이해하는 것이 중요하다고
		생각합니다. 공부한 것을 조금 더 깊이 이해하기 위해 블로그를 활용하고 있습니다.
		<br />
	</div>
	<br />
	<hr />

	<h2>Projects</h2>

	<h3 class="mb-0">Jaam Toast (2인 팀 프로젝트)</h3>
	<sub class="my-0">정적 사이트를 배포하고 Headless CMS를 제공해주는 웹 어플리케이션</sub>
	<br />
	<sub class="my-0">기간 : 23.03.07 - 23.05.12</sub>
	<ul />
	<div class="my-10">
		<div class="flex justify-center">
			<div
				class="relative z-10 max-h-[220px] min-h-[200px] min-w-[350px] max-w-[350px] overflow-hidden rounded-2xl shadow-xl"
			>
				<a href="https://www.jaamtoast.click" target="_blank">
					<img
						width="400"
						class="opacity-1 absolute left-0 top-0 z-10 m-0 scale-125 duration-300 ease-in-out first-letter:shadow-none hover:opacity-0"
						src="https://github.com/h-alex2/h-blog/assets/84281505/70a0953f-0e5c-42b0-ac3d-0073a9579eaa"
						alt="img"
					/>
					<img
						width="400"
						class="z-10 m-0 scale-125 shadow-none"
						src="https://github.com/h-alex2/h-blog/assets/84281505/15386626-c026-4dbb-a083-d7ca9a0ba165"
						alt="img"
					/>
				</a>
			</div>
		</div>
		<div class="flex justify-center gap-4">
			<a
				class=" text-pointColor-900 dark:text-pointColor-900"
				href="https://github.com/jaam-toast/jaam-toast-frontend"
				target="_blank"
			>
				<sub>Client Github</sub>
			</a>
			<a
				class=" text-pointColor-900 dark:text-pointColor-900"
				href="https://github.com/jaam-toast/jaam-toast-backend"
				target="_blank"
			>
				<sub>Server Github</sub>
			</a>
		</div>
	</div>

	<p class="leading-7">
		Jaam Toast 프로젝트에서는 어떻게 하면 조금 더 유지보수 하기 쉽게 구조를 짤 수 있을지를
		중점적으로 고민했습니다.
	</p>
	<ul class="leading-5">
		<li>레이어드 아키텍처 적용</li>
		<ul>
			<li>프레젠테이션, 도메인, 인프라 레이어를 분리해 각 레이어의 책임만 관리하도록 구성</li>
			<li>의존성을 분리해 각각의 인프라 변경시에도 다른 레이어에 영향가지 않도록 구성</li>
		</ul>
		<li>inversify를 이용해 추상화된 인터페이스를 통해 DI 적용하여 결합도 감소</li>
		<li>
			AWS S3, CDN이용한 배포 방식으로 변경하여 배포 <a
				class="hover:text-pointColor-900"
				href="https://github.com/jaam-toast/jaam-toast-frontend#%EC%A0%95%EC%A0%81-%EC%9B%B9-%ED%98%B8%EC%8A%A4%ED%8C%85%EC%97%90-%EC%A7%91%EC%A4%91%ED%95%98%EA%B8%B0"
				target="_blank">비용 89.7% 단축</a
			>
		</li>
		<li>
			Headless CMS 기능을 위한 <a
				class="hover:text-pointColor-900"
				href="https://github.com/jaam-toast/jaam-toast-frontend#json-schema%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-jaam-schema-%EB%A7%8C%EB%93%A4%EA%B8%B0"
				target="_blank">Jaam Schema 패키지</a
			> 제작
		</li>
		<ul>
			<li>패키지 제작을 통해 스키마 간의 변환 로직의 불편함 해소</li>
		</ul>
		<li>React query, Zustand를 이용해 커스텀 훅 제작하여 도메인 로직 분리</li>
		<li>
			React 에러 바운더리를 이용해 <a
				class="hover:text-pointColor-900"
				href="https://github.com/jaam-toast/jaam-toast-frontend#%EC%97%90%EB%9F%AC%EB%A5%BC-%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9C%BC%EB%A1%9C-%EA%B4%80%EB%A6%AC%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-%EC%BB%A4%EC%8A%A4%ED%85%80-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0"
				target="_blank">에러 처리를 중앙 집중형</a
			>으로 관리하여 유지 보수 하기 쉽도록 구성
		</li>
		<li>
			<a
				class="hover:text-pointColor-900"
				href="https://github.com/jaam-toast/jaam-toast-frontend#suspense-lazy-import-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0"
				target="_blank">Lazy import</a
			>를 사용해 번들 청크 생성하여 초기 렌더링 속도 개선
		</li>
		<li>
			Js dom을 이용해 사이트 favicon을 얻을 수 있는 <a
				class="hover:text-pointColor-900"
				href="https://github.com/jaam-toast/favicon/blob/main/app/getFavicon.ts"
				target="_blank">favicon 유틸</a
			> 제작
		</li>
	</ul>

	<hr />
	<h3 class="mb-0">Story Storage (개인 프로젝트)</h3>
	<p class="my-0">코드 에디터를 이용해 UI를 저장하고 사용할 수 있는 웹 어플리케이션</p>
	<sub class="my-0">기간 : 22.11.07 - 22.11.25</sub>
	<div class="my-10">
		<div class="flex justify-center">
			<div
				class="relative z-10 max-h-[220px] min-h-[200px] min-h-[200px] min-w-[350px] max-w-[350px] overflow-hidden rounded-2xl shadow-xl"
			>
				<a href="https://www.storystorage.me/" target="_blank">
					<img
						width="400"
						class="m-0 translate-x-10 scale-125 shadow-none"
						src="https://github.com/vaco-algo/slack-server/assets/84281505/b3f4ab55-03a5-4169-9a26-62e33e3fb104"
						alt="img"
					/>
					<img
						width="400"
						class="opacity-1 absolute left-0 top-0 z-10 m-0 translate-x-20 translate-y-3 scale-150 shadow-none duration-300 ease-in-out hover:opacity-0"
						src="https://github.com/vaco-algo/slack-server/assets/84281505/d3e66e22-a1ee-464a-bf95-0bd037a09734"
						alt="img"
					/>
				</a>
			</div>
		</div>
		<div class="flex justify-center gap-4">
			<a
				class=" text-pointColor-900 dark:text-pointColor-900"
				href="https://github.com/story-storage-project/storystorage-client"
				target="_blank"
			>
				<sub>Client Github</sub>
			</a>
			<a
				class=" text-pointColor-900 dark:text-pointColor-900"
				href="https://github.com/story-storage-project/storystorage-server"
				target="_blank"
			>
				<sub>Server Github</sub>
			</a>
		</div>
	</div>

	<p>
		유저 편의성을 많이 고려하게 된 프로젝트입니다. 직관적인 UI를 위해 Story Book에서 많은 영감을
		받아 제작하게 되었습니다.
	</p>
	<ul class="leading-5">
		<li>
			Story Book 적용, <a
				class="hover:text-pointColor-900"
				href="https://github.com/story-storage-project/storystorage-client#unit-test"
				target="_blank">유닛 테스트 Line coverage 93% 적용</a
			>
		</li>
		<li>
			더 많은 배움을 위해 라이브러리 없이 <a
				class="hover:text-pointColor-900"
				href="https://github.com/story-storage-project/storystorage-client#%EC%BD%94%EB%93%9C-%EC%97%90%EB%94%94%ED%84%B0-%EC%A0%9C%EC%9E%91"
				target="_blank">코드 에디터 구현</a
			>
		</li>
		<ul>
			<li>bracket 자동 완성, 코드 하이라이트 기능 추가</li>
			<li>효율적인 문자열 파싱 위해 커스텀 훅 제작하여 관리</li>
			<li>useRef 이용해 Parsing시 불필요한 리렌더링 방지</li>
		</ul>
		<li>유저 편의성을 위해 반응형 디자인, light/dark 모드 추가</li>
		<li>
			<a
				class="hover:text-pointColor-900"
				href="https://github.com/story-storage-project/storystorage-client#atomic-design-%EC%A0%81%EC%9A%A9"
				target="_blank">아토믹 디자인 패턴</a
			> 적용
		</li>
		<ul>
			<li>
				Styled Components의 props를 활용하여 아토믹한 단일 구성 요소 생성, CSS 동적으로 조절하여 CSS
				in JS의 장점 활용
			</li>
			<li>아토믹 디자인 패턴을 통해 각각의 컴포넌트가 SRP를 지킬 수 있도록 구성</li>
		</ul>
		<li>
			문자열에서 소스 코드로 변환 하기 위해 DOM Node로 변환 후 DFS 탐색을 이용한 JSX Parser 제작
			<a
				class="hover:text-pointColor-900"
				href="https://github.com/story-storage-project/storystorage-client#jsx-parser-%EC%A0%9C%EC%9E%91"
				target="_blank">시각화 구현</a
			>
		</li>
	</ul>

	<hr />
	<h3 class="mb-0">Air Mind (3인 팀 프로젝트)</h3>
	<p class="my-0">마인드맵을 생성해 공유할 수 있는 실시간 업무 협업 플랫폼</p>
	<sub class="my-0">기간 : 22.10.10 - 22.10.28</sub>
	<div class="my-10">
		<div class="flex justify-center">
			<div
				class="max-h-[220px] min-h-[200xp] min-w-[350px] max-w-[350px] overflow-hidden rounded-2xl shadow-xl"
			>
				<a href="https://aoa.air-mind.live/" target="_blank">
					<img
						width="400"
						class="scale left-0 top-0 z-20 m-0 scale-125 shadow-none duration-300 ease-in-out hover:scale-150"
						src="https://github.com/vaco-algo/slack-server/assets/84281505/b4a9a4c5-6dd3-4e93-b8a8-da5463fd459d"
						alt="img"
					/>
				</a>
			</div>
		</div>
		<div class="flex justify-center gap-4">
			<a
				class=" text-pointColor-900 dark:text-pointColor-900"
				href="https://github.com/h-alex2/air-mind"
				target="_blank"
			>
				<sub>Client Github</sub>
			</a>
			<a
				class=" text-pointColor-900 dark:text-pointColor-900"
				href="https://github.com/h-alex2/air-mind-server"
				target="_blank"
			>
				<sub>Server Github</sub>
			</a>
		</div>
	</div>

	<p>
		대량의 데이터를 어떻게 하면 효율적으로 관리할 수 있을지 중점적으로 고민하게 된 프로젝트입니다.
	</p>
	<ul class="leading-5">
		<li>
			<a
				class="hover:text-pointColor-900"
				href="https://github.com/h-alex2/air-mind/#d3%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-SVG-%EC%A0%9C%EC%96%B4%ED%95%98%EA%B8%B0"
				target="_blank">D3</a
			>를 이용해 svg 노드 데이터 움직임 구현
		</li>
		<li>
			마인드맵 노드간 연결이 중첩된 구조 적용위해 NoSQL MongoDB를 이용한 <a
				class="hover:text-pointColor-900"
				href="https://github.com/h-alex2/air-mind/#%EB%A7%88%EC%9D%B8%EB%93%9C%EB%A7%B5-%EB%85%B8%EB%93%9C-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B4%80%EB%A6%AC"
				target="_blank">양방향 데이터베이스 스키마</a
			>
			적용
		</li>
		<ul>
			<li>트리 자료 구조로 노드 데이터 구성하여 서버 통신 최소화</li>
			<li>중첩된 데이터를 효율적으로 가져오기 위해 Promise.all을 이용해 병렬적으로 통신 처리</li>
		</ul>
		<li>Next.js Hydration Error 동적 ipmort 방식으로 컴포넌트 지연 로드하여 해결</li>
		<li>Formdata, S3를 활용한 이미지 전송 기능 구현</li>
		<ul>
			<li>base64를 이용한 인코딩 방법 적용시 용량 증가로 인해 Formdata 적용</li>
		</ul>
		<li>
			<a
				class="hover:text-pointColor-900"
				href="https://github.com/h-alex2/air-mind/#%ED%8C%8C%EC%9D%BC-%EB%93%9C%EB%9E%98%EA%B7%B8-%EA%B8%B0%EB%8A%A5%EC%9C%BC%EB%A1%9C-%EC%82%AC%EC%9A%A9%EC%9E%90-%ED%8E%B8%EC%9D%98%EC%84%B1-%EB%86%92%EC%9D%B4%EA%B8%B0"
				target="_blank">파일 드래그 기능</a
			> 추가로 유저 편의성 고려
		</li>
	</ul>
	<hr />

	<h3 class="mb-0">Pick Bot (개인 프로젝트)</h3>
	<p class="my-0">참가자를 모집하고 리뷰어를 매칭하는 슬랙봇</p>
	<sub class="my-0">기간 : 22.12.10 - 진행중</sub>
	<div class="my-10">
		<div class="flex justify-center">
			<div class="max-h-[220px] min-h-[200px] w-[800px] overflow-hidden rounded-2xl shadow-xl">
				<a
					href="https://github.com/vaco-algo/slack-server/assets/84281505/065db85e-cc9a-4f82-8a39-10d1b7b26685"
					target="_blank"
				>
					<img
						class="scale left-0 top-0 z-20 m-0 shadow-none duration-300 ease-in-out hover:scale-105"
						src="https://github.com/vaco-algo/slack-server/assets/84281505/065db85e-cc9a-4f82-8a39-10d1b7b26685"
						alt="img"
					/>
				</a>
			</div>
		</div>
		<div class="flex justify-center gap-4">
			<a
				class=" text-pointColor-900 dark:text-pointColor-900"
				href="https://github.com/vaco-algo/slack-server"
				target="_blank"
			>
				<sub>Github</sub>
			</a>
		</div>
	</div>

	<p>
		알고리즘 스터디 내에서 참가자를 모으고 리뷰어를 매칭하는 반복적인 작업을 개선하기 위해 슬랙봇을
		제작했습니다.
	</p>
	<ul class="leading-5">
		<li>22년 12월부터 계속해서 유지 보수 중</li>
		<li>무료 배포 사이트를 이용하기 위해 cron을 적용해 sleep 방지 기능 추가</li>
		<ul>
			<li>현재 cron작업이 계속 꺼지는 버그로 인해 EC2 배포 로직으로 변경 (cron 작업 해결중)</li>
		</ul>
	</ul>

	<h2>Contact</h2>
	<p>
		Email: glowhyun1@gmail.com <br />
		Github:
		<a class="hover:text-pointColor-900" href="https://github.com/h-alex2" target="_blank"
			>https://github.com/h-alex2</a
		>
	</p>
</div>
