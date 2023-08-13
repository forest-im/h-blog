<script>
	import HomeBackground from "$lib/components/HomeBackground.svelte";
</script>

<div
	class="absolute left-1/2 top-1/2 z-50 h-[calc(100%-3rem)] w-[calc(100%-3rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-[0.3px] border-gray-300"
/>
<div class="absolute bottom-12 right-12 z-[99] max-[500px]:bottom-9 max-[500px]:right-8">
	<div class="flex max-w-[200px] flex-col text-sm font-normal text-white">
		<p>
			기존의 사고 방식을 전환하는 것을 좋아합니다. 요새는 함수형 프로그래밍에 빠져 생각을 확장시키고
			있습니다.
		</p>
		<p class="pt-2">
			개발 외 시간에는 카메라와 함께 산책을 하거나 책을 읽습니다. 프레임안에 어떻게 배치하느냐에
			따라 다른 결과물을 낸다는 것이 삶과 참 닮아있어 사진 찍는 것이 좋습니다.
		</p>
	</div>
</div>
<HomeBackground hasBlur={false} />
