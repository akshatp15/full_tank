function chart(monthly) {
    const months = []
    const month_data = []
    for(const [key, value] of Object.entries(monthly)){
        months.push(key)
        month_data.push(value)
    }
    const chart_data = {
        labels: months,
        datasets: [{
            data: month_data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    }
    return chart_data
}

export default chart