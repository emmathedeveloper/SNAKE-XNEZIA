<script>
  import { goto } from "$app/navigation";
  import { HomeModern, Icon } from "svelte-hero-icons";
  import Themedisplaybox from "../../components/themedisplaybox.svelte";
  import { Themes } from "../../themes";
</script>

<div class="h-full w-full bg-[#1f1f1f] mt-6 px-4 py-2">
    <nav>
        <button on:click={() => goto('/homescreen')} class='text-white'>
            <Icon src={HomeModern} size='32'/>
        </button>
    </nav>
    <div class="h-5/6 w-full px-4 py-8 flex justify-center gap-8 flex-wrap overflow-y-scroll vis-scroll">
        {#each Themes as theme , index }
            <Themedisplaybox {...theme} {index}/>
        {/each}
    </div>
</div>
