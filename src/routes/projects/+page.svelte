<script>
  import airmind2 from "$lib/images/projects/airmind2.png"
  import blog from "$lib/images/projects/blog.png"
  import blog2 from "$lib/images/projects/blog2.png"
  import mind1 from "$lib/images/projects/mind1.png"
  import mind2 from "$lib/images/projects/mind2.png"
  import story1 from "$lib/images/projects/story1.png"
  import story2 from "$lib/images/projects/story2.png"
</script>

<div class="not-prose grid md:grid-cols-2 gap-2 auto-rows-max justify-items-center">
  <a href="https://www.storystorage.me/">
    <div class="my-10">
      <h4 class="text-center">Story Storage</h4>
      <div class="min-w-[350px] max-w-[350px] max-h-[220px] overflow-hidden rounded-2xl shadow-xl my-10 relative z-10">
        <img class="scale-125 shadow-none translate-x-10" src={story2} alt="img" />
        <img class="scale-150 shadow-none translate-x-20 translate-y-3 absolute top-0 left-0 z-10 hover:opacity-0 opacity-1 ease-in-out duration-300" src={story1} alt="img" />
      </div>
    </div>
  </a>
  <a href="https://aoa.air-mind.live/">
    <div class="my-10">
      <h4 class="text-center">Air Mind</h4>
      <div class="min-w-[350px] max-w-[350px] max-h-[220px] overflow-hidden rounded-2xl shadow-xl my-10">
        <img class="scale-125 shadow-none top-0 left-0 z-20 hover:scale-150 ease-in-out duration-300 scale" src={airmind2} alt="img" />
      </div>
    </div>
  </a>
  <a href="https://minesweeper-by-alex.netlify.app/">
    <div class="my-10">
      <h4 class="text-center">Minesweeper</h4>
      <div class="min-w-[350px] max-w-[350px] max-h-[220px] overflow-hidden rounded-2xl shadow-xl my-10 relative z-10">
        <img class="scale-150 shadow-none" src={mind2} alt="img" />
        <img class="scale-150 shadow-none absolute top-0 left-0 z-20 hover:opacity-0 opacity-1 ease-in-out duration-300" src={mind1} alt="img" />
      </div>
    </div>
  </a>
  <a href="https://www.im-alex.dev/">
    <div class="my-10">
      <h4 class="text-center">Blog</h4>
      <div class="min-w-[350px] max-w-[350px] max-h-[220px] overflow-hidden rounded-2xl shadow-xl my-10 relative z-10">
        <img class="scale-150 shadow-none translate-y-2" src={blog2} alt="img" />
        <img class="scale-150 shadow-none translate-y-2 absolute top-0 left-0 z-20 hover:opacity-0 opacity-1 ease-in-out duration-300" src={blog} alt="img" />
      </div>
    </div>
  </a>
</div>