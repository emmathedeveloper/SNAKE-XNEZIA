<script lang="ts">
  import { goto } from "$app/navigation";
  import { appWindow, LogicalSize } from "@tauri-apps/api/window";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
  import { Random } from "../helper";
  import { titleBarHidden } from "../store";


  let num = 0

  let color_interval: number

  const c = [
    {
      light: 'text-brown-500',
      dark: 'text-brown-900'
    },
    {
      light: 'text-green-500',
      dark: 'text-green-900'
    },
    {
      light: 'text-pink-500',
      dark: 'text-pink-900'
    },
    {
      light: 'text-amber-500',
      dark: 'text-amber-900'
    },
    {
      light: 'text-purple-500',
      dark: 'text-purple-900'
    },
    {
      light: 'text-sky-500',
      dark: 'text-sky-900'
    },
  ]

  let current_color: {
    light: string,
    dark: string
  };

  const GoToMain = () => {
    setTimeout(() => {
      goto('/homescreen')
    } , 5000)
  }


  onMount(() => {
    $titleBarHidden = true

    appWindow.setSize(new LogicalSize(600 , 400))
    
    setTimeout(() => {
      num += 1
    } , 1000)

    color_interval = setInterval(() => {
      current_color = Random(c)
    } , 1000) 

    document.addEventListener('contextmenu' , e => {
      e.preventDefault()
    })
    
    return async () => {
     await appWindow.setSize(new LogicalSize(700 , 700))

     clearInterval(color_interval)

     $titleBarHidden = false
    }
    
  })

</script>

<section class="h-full grid place-items-center text-white w-full bg-neutral-800">

  {#if num === 1} 
    <div class="flex flex-col justify-center">
      <h1 in:slide class="text-7xl">EVGAMES</h1>

      <h3 in:slide={{ axis: 'x', delay: 1000 , duration: 2000 }} on:introend={() => num += 1}>PRESENTS</h3>
    </div>
  {/if}
    
  {#if num == 2}
    <div class="flex flex-col justify-center">
      <h1 in:slide class={`text-7xl ${current_color.light}`}>SNAKE</h1>
      <h1 in:slide={{ delay: 500 }} on:introend={GoToMain} class={`text-7xl ${current_color.dark}`}>XNEZIA</h1>
    </div>
  {/if}

</section>