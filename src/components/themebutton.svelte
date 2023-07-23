<script lang="ts">

    import { Icon , Moon , Sun } from 'svelte-hero-icons'

    import { isDark } from '../store';
    

</script>


<button 
on:click={() => $isDark = !$isDark}
class="fixed bottom-2 left-1/2 -translate-x-1/2 p-2 bg-gray-300 dark:bg-[#373737] rounded-md">
    {#if $isDark}
        <Icon src={Sun} size='30' mini/>

        {:else}
        <Icon src={Moon} size='30' mini/>
    {/if}
</button>