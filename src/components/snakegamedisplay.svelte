<script lang="ts">
    import { onMount } from "svelte";
  import { gameThemeData } from "../store";
  import { Themes } from "../themes";

    export let theme = Themes[$gameThemeData]

    export let grid_number = 10

    export let current_points: number[] = []

    export let fruit_position: number = grid_number * 10 - 10


    let boxes: number[] = []

    
    onMount(() => {
        const copy = []

        for(let i = 1; i <= grid_number * grid_number; i ++){
            copy.push(i)
        }

        boxes = copy
        
    })
</script>

<div 
class={`${theme.background_color} w-[450px] h-[450px] grid grid__box`}
style={`--rp: ${grid_number}`}
>
    {#each boxes as num}
        <div class={`${current_points.includes(num) ? `${theme.snake_color} rounded` : ''}  text-green-900 grid place-items-center`}>
           {#if fruit_position == num }
                {theme.food}
           {/if}
        </div>
    {/each}
</div>


<style>
    .grid__box{
        grid-template-columns: repeat(var(--rp) , 1fr);
        grid-template-rows: repeat(var(--rp) , 1fr);
    }
</style>