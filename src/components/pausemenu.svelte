<script>

    export let on_restart = () => { }
    export let on_resume = () => { }
    export let on_quit = () => { }
</script>


<div class="w-full min-h-max flex items-center flex-col md:w-[300px] bg-[#373737] rounded p-4">
    <h1>GAME PAUSED 🍏</h1>

    <button on:click={on_resume} class="bg-white text-[#373737] mt-2 py-2 w-full rounded shadow-lg">RESUME</button>
    <button on:click={on_restart} class="bg-white text-[#373737] mt-2 py-2 w-full rounded shadow-lg">RESTART</button>
    <button on:click = {on_quit} class="bg-white text-[#373737] mt-2 py-2 w-full rounded shadow-lg">QUIT</button>
</div>