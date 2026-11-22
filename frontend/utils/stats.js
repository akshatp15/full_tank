export function monthly_breakdown(fills, vehicle){
    let monthly_totals = {
        "January": 0,
        "February": 0,
        "March":0,
        "April": 0,
        "May": 0,
        "June": 0,
        "July": 0,
        "August": 0,
        "September": 0,
        "October": 0,
        "November": 0,
        "December": 0
    }
    if(fills.length == 0){
        return monthly_totals
    }
    
    // Get Current Year
    const currentYear = new Date().getFullYear()
    // Calculate Monthly Totals
    
    for (const fill of fills) {
        const curr_date = new Date(fill.fill_date)
        if(curr_date.getFullYear() === currentYear && fill.vehicle === vehicle){
            const curr_month = curr_date.getMonth()
            if(curr_month === 0){
                monthly_totals["January"] = fill.total_cost
            }
            if(curr_month === 1){
                monthly_totals["February"] += fill.total_cost
            }
            if(curr_month === 2){
                monthly_totals["March"] += fill.total_cost
            }
            if(curr_month === 3){
                monthly_totals["April"] += fill.total_cost
            }
            if(curr_month === 4){
                monthly_totals["May"] += fill.total_cost
            }
            if(curr_month === 5){
                monthly_totals["June"] += fill.total_cost
            }
            if(curr_month === 6){
                monthly_totals["July"] += fill.total_cost
            }
            if(curr_month === 7){
                monthly_totals["August"] += fill.total_cost
            }
            if(curr_month === 8){
                monthly_totals["September"] += fill.total_cost
            }
            if(curr_month === 9){
                monthly_totals["October"] += fill.total_cost
            }
            if(curr_month === 10){
                monthly_totals["November"] += fill.total_cost
            }
            if(curr_month === 11){
                monthly_totals["December"] += fill.total_cost
            }
        }
    }
    return monthly_totals
}

export function station_spending(fills){
    const currentYear = new Date().getFullYear()
    const stationMap = new Map()
    for(const fill of fills){
        const curr_date = new Date(fill.fill_date)
        if(curr_date.getFullYear() === currentYear){
            if(stationMap.has(fill.station_name)){
                stationMap.set(fill.station_name, {
                    total_spent: fill.total_cost + stationMap.get(fill.station_name).total_spent,
                    fills: 1 + stationMap.get(fill.station_name).fills
                })
            }
            else{
                stationMap.set(fill.station_name, {
                total_spent: fill.total_cost, 
                fills: 1
            })
            }
        }
    }
    return stationMap
}

export function average_fill(fills){
    if(fills.length === 0){
        return new Set()
    }
    const currentYear = new Date().getFullYear()
    const vehicleMap = new Map()
    let total_litres = 0
    let total_fills = 0
    let total_price = 0
    let total_cost = 0
    // Get totals for each vehicle
    for(const fill of fills){
        const curr_date = new Date(fill.fill_date)
        if(curr_date.getFullYear() === currentYear){
            total_cost += fill.total_cost
            total_litres += fill.litres
            total_price += fill.price
            total_fills += 1
            if(vehicleMap.has(fill.vehicle)){
                vehicleMap.set(fill.vehicle, {
                    total_spent: fill.total_cost + vehicleMap.get(fill.vehicle).total_spent,
                    total_litres: fill.litres + vehicleMap.get(fill.vehicle).total_litres,
                    total_price: fill.price + vehicleMap.get(fill.vehicle).total_price,
                    fills: 1 + vehicleMap.get(fill.vehicle).fills
                })
            }
            else{
                vehicleMap.set(fill.vehicle, {
                total_spent: fill.total_cost, 
                total_litres: fill.litres,
                total_price: fill.price,
                fills: 1
            })
            }
        }
    }
    
    // Create Average Fill total
    const averageVehicleMap = new Map()
    for(const vehicle of vehicleMap.keys()){
        averageVehicleMap.set(vehicle, {
            avg_cost: vehicleMap.get(vehicle).total_spent / vehicleMap.get(vehicle).fills,
            avg_litres: vehicleMap.get(vehicle).total_litres / vehicleMap.get(vehicle).fills,
            avg_price: vehicleMap.get(vehicle).total_price / vehicleMap.get(vehicle).fills
        })
    }
    averageVehicleMap.set('Total', {
        avg_cost: total_cost / total_fills,
        avg_litres: total_litres / total_fills,
        avg_price: total_price / total_fills
    })
    
    return averageVehicleMap
}
