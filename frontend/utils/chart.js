function chart(monthly) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const data_arr = []
    const rgbs = ['rgb(75, 192, 192)', 'rgb(255, 0, 0)', 'rgb(255, 255, 0)', 'rgb(57, 255, 20)',]
    let count = -1
    // Loop through each vehicle in monthly object
    for(const [key, value] of Object.entries(monthly)){
        // Extract the monthly totals for the current vehicle
        count++
        const vehicle_monthly = value
        const month_data = []
        // Loop through the monthly totals creating an array of the total spent in each month
        for(const [key, value] of Object.entries(vehicle_monthly)){
            month_data.push(value)
        }
        // Push the object to render the chart for the current vehicle
        data_arr.push({
            label: key,
            data: month_data,
            fill: false,
            borderColor: rgbs[count],
            tension: 0.1
        })  
    }
    const chart_data = {
        labels: months,
        datasets: data_arr
    }
    return chart_data
}

export default chart