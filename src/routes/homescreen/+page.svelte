
<script lang="ts">
    import { goto } from "$app/navigation";
    import { gameThemeData, high_score, inventory } from "../../store";
    import Themedisplaybox from "../../components/themedisplaybox.svelte";
    import Topnav from "../../components/topnav.svelte";
    import { fade, scale } from "svelte/transition";
    import { Themes } from "../../themes";
  
    let theme = Themes[$gameThemeData || 0]
    
  </script>
  
  <div class="h-screen overflow-hidden select-none w-screen transition-all bg-white-500 dark:text-white dark:bg-[#1f1f1f]">
    <Topnav />
  
    <div class="w-full min-h-[300px] p-4 flex items-center justify-around">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div on:click={() => goto('/skinscreen')}>
        <Themedisplaybox {...theme} clickable={false}/>
      </div>
  
      <div class="h-full flex flex-col justify-around items-center">
        <button in:fade class={`text-3xl shadow-lg ${theme.background_color + ' ' + theme.snake_color.replace('bg' , 'text')} py-2 px-8 rounded`} on:click={() => goto('/gamescreen')}>PLAY</button>
  
        <div class="grid grid-cols-3 my-8 gap-4 w-full">
          {#each $inventory as item}
            <h3 class="bg-[#373737] p-2 rounded">{item.food} {item.total}</h3>
          {/each}
        </div>

        <h1 in:scale class="text-3xl bg-[#373737] py-2 px-4 rounded">HIGH SCORE: {$high_score}</h1>
      </div>
    </div>
  </div>