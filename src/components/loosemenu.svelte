<script>
    import { goto } from "$app/navigation"
    import { onMount } from "svelte";
  

    onMount(() => {
        setTimeout(() => {
            goto('/homescreen')
        } , 3000)
    })
  </script>
  
  
  <div class="w-full min-h-max flex items-center flex-col md:w-[300px] bg-[#373737] rounded p-4">
      <h1>YOU LOST 😭</h1>
  </div>