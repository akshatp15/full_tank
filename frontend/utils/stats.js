function stats(fills){
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
        if(curr_date.getFullYear() === currentYear){
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

export default stats