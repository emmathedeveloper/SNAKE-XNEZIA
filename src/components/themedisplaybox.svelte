<script lang="ts">
  import { onMount } from "svelte";
  import { Check, Icon } from "svelte-hero-icons";
  import { scale, slide } from "svelte/transition";
  import type { FOOD_TO_UNLOCK } from "../interfaces";
  import { gameThemeData , unlockedThemes } from "../store";
  import Notunlockedcover from "./notunlockedcover.svelte";

    export let name: string

    export let index: number | null = null

    export let background_color: string

    export let snake_color: string

    export let food: string

    export let food_to_unlock: FOOD_TO_UNLOCK[] | null

    export let clickable = true

    let fruit_position = 77

    let points = [ 12 , 13 , 14 ]

    let boxes: number[] = []

    const handleClick = () => {
        if(!clickable) return

        if(unlocked()){
            $gameThemeData = index
        }
    }

    const unlocked = () => {
        return $unlockedThemes.includes(index)
    }
    
    onMount(() => {
        const copy = []

        for(let i = 1; i <= 100; i ++){
            copy.push(i)
        }

        boxes = copy
    })

</script>

{#key fruit_position}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => handleClick()} in:slide class="p-2 relative w-max bg-[#373737] h-max">
    <section class={`w-[250px] h-[250px] relative ${background_color} grid grid__box`}>
            {#each boxes as num}
            <div class={`${points.includes(num) ? snake_color : ''} rounded grid place-items-center`}>
                {#if fruit_position == num }
                {food}
                {/if}
            </div>
            {/each}

            {#if food_to_unlock && index && !$unlockedThemes.includes(index)}
                <Notunlockedcover {index} foods={food_to_unlock} />
            {/if}
    </section>

        <h2 class="w-full text-center text-white p-4">{name}</h2>

        {#if $gameThemeData == index && clickable}  
            <div in:scale class="p-2 text-white bg-green-500 absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full shadow-lg">
                <Icon src={Check} size='32'/>
            </div>
        {/if}
    </div>
{/key}

<style>
    .grid__box{
        grid-template-columns: repeat(10 , 1fr);
        grid-template-rows: repeat(10 , 1fr);
    }
</style>