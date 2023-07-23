<script lang='ts'>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { Icon, Pause } from "svelte-hero-icons";
    import { writable, type Writable } from "svelte/store";
    import { scale } from "svelte/transition";
    import Backdrop from "../../components/backdrop.svelte";
    import Loosemenu from "../../components/loosemenu.svelte";
    import Pausemenu from "../../components/pausemenu.svelte";
    import Snakegamedisplay from "../../components/snakegamedisplay.svelte";
    import { DebugArray, getEdgeNumbers } from "../../helper";
    import type { SNAKE_COORDINATE, TURN_POINT } from "../../interfaces";
    import { gameThemeData, high_score, inventory } from "../../store"; 
    import { Themes } from "../../themes";

    let countdown_timer: number;

    let countdown = writable(3)
  
    let grid_number = 20
    
    let movement_timer: number;
    
    let fruit_position = grid_number * 10 - 10;
  
    let score = writable(0)
  
    let paused = writable(true)
  
    let pause_modal_open = false
  
    let lost_modal_open = false
    
    let snake_body_coordinates: Writable<SNAKE_COORDINATE[]> = writable([])
    
    let turning_points: Writable<TURN_POINT[]> = writable([])

    countdown.subscribe(value => {
      if(value == 0) $paused = false
    })
    
    snake_body_coordinates.subscribe(value => {
  
      if($paused) return
      
      let mouth = value[value.length - 1]
      
      if(mouth?.value == fruit_position){
        reset_fruit_position()
  
        increase()
      }
      
      let passed = value.every(c => c.value !== $turning_points[0]?.point) && $turning_points.length > 1
      
      if(passed){
        $turning_points = $turning_points.filter((p , i) => i !== 0)
      }
    })
  
    score.subscribe(value => {
        if(value > $high_score){
          $high_score = value
        }
    })


  
    paused.subscribe(value => {
      if(value){
        clearInterval(movement_timer)
  
        return
      }
  
      movement_timer = setInterval(() => {
              move()
        } , 200)
    })
    
    $: current_points = $snake_body_coordinates.map(c => c.value)
    
    
    
    const move = () => {
      $snake_body_coordinates.forEach((part , idx) => {
        
        let match = $turning_points.find(p => p.point == part.value)
        
        if(match){
          $snake_body_coordinates[idx].moveBy = match.turn_value
          $snake_body_coordinates[idx].value += match.turn_value
        }else{
          $snake_body_coordinates[idx].value += $snake_body_coordinates[idx].moveBy
        }
  
      });
  
      check_if_at_edge()
      
      check_if_self_is_bitten()
    }
  
    const add_command_listeners = () => {
        document.addEventListener('keydown' , e => {
          
          e.preventDefault()
          
          const last_turn_point = $turning_points[$turning_points.length - 1]
  
          const last_point = $snake_body_coordinates[$snake_body_coordinates.length - 1]
  
          if(e.key.startsWith('Arrow') && $paused) return
          
          if(e.key == 'p' && e.ctrlKey){
             return pause_game()
          }
  
          switch(e.key){
              case 'ArrowUp':
                  if(last_turn_point.turn_value == grid_number || last_turn_point.turn_value == -(grid_number))
                  return
  
                  $turning_points.push({
                    point: last_point.value,
                    turn_value: -grid_number
                  })
                  break
  
              case 'ArrowDown':
                  if(last_turn_point.turn_value == grid_number || last_turn_point.turn_value == -(grid_number))
                  return
  
                  $turning_points.push({
                    point: last_point.value,
                    turn_value: grid_number
                  })
                  break
  
              case 'ArrowRight':
                  if(last_turn_point.turn_value == 1 || last_turn_point.turn_value == -1)
                  return
  
                  $turning_points.push({
                    point: last_point.value,
                    turn_value: 1
                  })
                  break
  
              case 'ArrowLeft':
                  if(last_turn_point.turn_value == 1 || last_turn_point.turn_value == -1)
                  return
  
                  $turning_points.push({
                    point: last_point.value,
                    turn_value: -1
                  })
                  break
          }
  
          $turning_points = $turning_points
  
        })
    }
  
    function check_if_at_edge(){
        let head = $snake_body_coordinates[$snake_body_coordinates.length - 1]
  
        const { edges } = getEdgeNumbers(grid_number)
  
        let possible_off_values = edges.filter(e => e.numbers.includes(head.value) && head.moveBy)
        .map(v => head.value + v.offValue)
  
        if(possible_off_values.length){
          
          setTimeout(() => {
            if($paused) return
  
            let head = $snake_body_coordinates[$snake_body_coordinates.length - 1]
  
            if(possible_off_values.includes(head.value)) {
  
              $paused = true
              
              const correct_position = $snake_body_coordinates.map(p => (
                {
                  ...p,
                  value: p.value - p.moveBy
                }
              ))
              
              $snake_body_coordinates = correct_position

              lost_modal_open = true
            }
          } , 200)
        }
    }

    function initialize(){
        $score = 0

        $snake_body_coordinates = [
          {
            value: grid_number + 2,
            moveBy: 1
          },
          {
            value: grid_number + 3,
            moveBy: 1
          },
          {
            value: grid_number + 4,
            moveBy: 1
          }
        ]

        $turning_points = [
          {
            point: grid_number + 4,
            turn_value: 1,
          }
        ]

        run_countdown()
    }

    function run_countdown(){
        countdown_timer = setInterval(() => {
            if($countdown == 0) {
              clearInterval(countdown_timer)

              return
            }

            $countdown -= 1
        } , 1000)
    }
  
    function check_if_self_is_bitten(){
        let result = DebugArray($snake_body_coordinates.map(v => v.value))
  
        if(result.hasDuplicates){
          $paused = true

          lost_modal_open = true
        }
    }
  
    function reset_fruit_position(){
        const arr: number[] = []
  
        for(let i = 1; i <= grid_number * grid_number; i ++){
            //if(current_points.includes(i)) return
  
            arr.push(i)
        }
  
        fruit_position = arr[Math.floor(Math.random() * arr.length)]
    }
  
    function increase(){
        add_one()
  
        $score += 1

        addToInventory()
    }

    function addToInventory(){
        let found = $inventory.find(f => f.food == Themes[$gameThemeData || 0].food)

        if(found) found.total += 1

        $inventory = $inventory
    }
  
    function add_one(){
        $snake_body_coordinates.unshift({
          value: $snake_body_coordinates[0].value - $snake_body_coordinates[0].moveBy,
          moveBy: $snake_body_coordinates[0].moveBy
        })
  
        $snake_body_coordinates = $snake_body_coordinates
    }

    function reset_inventory(){
      let found = $inventory.find(f => f.food == Themes[$gameThemeData || 0].food)

      if(found!.total < $score) return

      found!.total -= $score

      $inventory = $inventory
    }
  
    function pause_game(){
      $paused = true
  
      pause_modal_open = true
    }
  
    function resume_game(){
      $paused = false
  
      pause_modal_open = false
    }

    function restart_game(){
      $paused = true

      pause_modal_open = false

      lost_modal_open = false

      $countdown = 3

      reset_inventory()

      initialize()
    }

    function quit_game(){
      reset_inventory()

      goto('/homescreen')
    }
      
    onMount(() => {
        initialize()

        reset_fruit_position()
  
        add_command_listeners()
  
        return () => clearInterval(movement_timer)
    })
  </script>
  
  <div class="h-screen w-screen transition-all grid place-items-center bg-white-500 dark:text-white dark:bg-[#1f1f1f]">
  
      <div class="flex items-center fixed top-8 right-8">
        <div class="flex items-center bg-[#373737] rounded py-2 px-4">
          {#key $score}
          <h1 in:scale>{$score}</h1>
          {/key}
          <h1 class="ml-1">{Themes[$gameThemeData || 0].food}</h1>
        </div>
  
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:click={pause_game} class="flex items-center bg-[#373737] rounded py-2 px-4 ml-4">
          <Icon src={Pause} size='25'/>
        </div>
      </div>

      <Backdrop open={$countdown !== 0}>
        {#key $countdown}
          <h1 in:scale class="text-5xl">{$countdown}</h1>
        {/key}
      </Backdrop>
  
      <Backdrop open={pause_modal_open}>
        <Pausemenu on_resume={resume_game} on_restart={restart_game} on_quit={quit_game}/>
      </Backdrop>

      <Backdrop open={lost_modal_open}>
        <Loosemenu />
      </Backdrop>
  
      <Snakegamedisplay {grid_number} {current_points} {fruit_position}/>
  </div>