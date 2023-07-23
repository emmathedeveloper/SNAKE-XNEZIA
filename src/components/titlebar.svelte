<script lang="ts">

  import { appWindow } from '@tauri-apps/api/window'
  import { titleBarHidden } from '../store';
    
    export let title = "TAURI-SVELTE"

    let functions = [
        {
            color: 'bg-green-500',
            click: () => { appWindow.minimize() }
        },
        {
            color: 'bg-red-500',
            click: () => { appWindow.close() }
        }
    ]

</script>

{#if !$titleBarHidden}
    <nav data-tauri-drag-region class="bg-[#1f1f1f] text-white fixed top-0 w-screen py-1 px-2 flex items-center justify-between">
        <small>{ title }</small>

        <div class="flex items-center justify-between">
            {#each functions as func }
                <button 
                on:click={func.click}
                class={`p-2 rounded-full mx-1 ${func.color} cursor-default`}
                ></button>
            {/each}
        </div>
    </nav>
{/if}