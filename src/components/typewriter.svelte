<script lang="ts">
  import { onMount } from "svelte";


    export let texts = [
        'This',
        'is',
        'a',
        'typewriter'
    ]

    export let showCursor = false
    
    let index = 0

    $: currentText = texts[index]

    let position = 0
    
    let text = ''

    let interval: any

    const write = () => {


      interval =  setInterval(() => {

            if(index == texts.length){
                index = 0

                position = 0

                return
            }

            if(position == currentText.length){

                clearInterval(interval)

                index += 1

                position = 0

                setTimeout(() => {
                    text = ''

                    write()
                } , 2000)

                return
            } 

            text += currentText[position]

            position += 1
        } , 100)
    }

    onMount(() => {
        write()
    })
</script>

<p class="text-inherit font-black flex items-center">{ text } <span class={`h-[50px] w-1 bg-black ${showCursor ? 'inline-block' : 'hidden'} animate-pulse ml-2`}></span></p>