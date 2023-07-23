<script lang="ts">
  import { onMount } from "svelte";
  import type { FOOD_TO_UNLOCK } from "../interfaces";
  import { inventory, unlockedThemes } from "../store";
  import { Themes } from "../themes";



    export let index: number

    export let foods: FOOD_TO_UNLOCK[]

    let check_array: boolean[] = []

    const prevUnlocked = () => {
        return $unlockedThemes.includes(index - 1)
    }

    const run_check = () => {
          foods.forEach((food) => {
            const found = $inventory.find(f => f.food == food.food)

            if(found!.total < food.number){
                check_array.push(false)
            }else{
                check_array.push(true)
            }

            check_array = check_array
          })
    }


    const unlock_theme = () => {
        foods.forEach((food) => {
            const found = $inventory.find(f => f.food == food.food)

            if(found){
                found.total -= food.number
            }

            $inventory = $inventory
          })

        $unlockedThemes.push(index)

        $unlockedThemes = $unlockedThemes
    }

    onMount(() => {
        run_check()
    })

</script>

<div class="absolute inset-0 bg-[#3737377f] grid place-items-center">
    <div class="bg-white rounded p-4">
        {#if !$unlockedThemes.includes(index - 1)}
            <strong>Unlock {Themes[index - 1 || 0].name}</strong>
        {/if}

        {#if $unlockedThemes.includes(index - 1)}
            {#each foods as food}
                <strong class="ml-2">{food.food} {food.number}</strong>
            {/each}

            {#if check_array.every(b => b == true)}
                <button on:click={unlock_theme} class="px-4 py-2 block mt-4 bg-green-500 text-white rounded shadow-md">UNLOCK NOW</button>
            {/if}
        {/if}
    </div>
</div>