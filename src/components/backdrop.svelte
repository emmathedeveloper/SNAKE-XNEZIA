
<script lang="ts">
  import { scale } from "svelte/transition";


    export let open = false
</script>

{#if open}
    <div in:scale class="fixed inset-0 mt-6 p-4 grid place-items-center bg-[#1f1f1f80]">
        <slot />
    </div>
{/if}