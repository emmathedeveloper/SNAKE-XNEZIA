
export function Random(array: any[]){
    let rand = Math.floor(Math.random() * array.length)
    
    return array[rand]
}

export function DebugArray(array: boolean[] | string[] | number[] = []){
    let compiled: {
        value: boolean | string | number
        occurrences: number
    }[] = []

    array.forEach(element => {
        let existing = compiled.find(obj => obj.value == element)

        if(existing){
            existing.occurrences += 1
        }else{
            compiled.push({
                value: element,
                occurrences: 1
            })
        }
    });

    return {
        result: compiled,
        hasDuplicates: compiled.some(v => v.occurrences > 1),
    }
}

export function getEdgeNumbers(grid_number: number){
    const array = []

    let all = []

    const grid_square = grid_number * grid_number

    const right_edge_numbers: number[] = []

    const left_edge_numbers: number[] = []

    const top_edge_numbers: number[] = []

    const bottom_edge_numbers: number[] = []

    for(let i = 1; i <= grid_square; i ++){
        array.push(i)
    }

    array.forEach(num => {
        if(num % grid_number == 0){
            right_edge_numbers.push(num)
        }

        if(num % grid_number == 1){
            left_edge_numbers.push(num)
        }

        if(num <= grid_number){
            top_edge_numbers.push(num)
        }

        if(num >= grid_square - grid_number){
            bottom_edge_numbers.push(num)
        }
    })

    all = [...top_edge_numbers , ...bottom_edge_numbers , ...right_edge_numbers , ...left_edge_numbers]

    return {
        all,

        edges: [
            { numbers: top_edge_numbers , offValue: -grid_number },
            { numbers: bottom_edge_numbers , offValue: grid_number },
            { numbers: right_edge_numbers , offValue: 1 },
            { numbers: left_edge_numbers , offValue: -1 }
        ]
    }

}