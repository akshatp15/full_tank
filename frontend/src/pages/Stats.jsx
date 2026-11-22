import { useState, useEffect, useRef} from "react"
import { useNavigate } from "react-router"
import chart from "../../utils/chart"
import Chart from 'chart.js/auto'
import { station_spending, monthly_breakdown, average_fill } from "../../utils/stats"


const Stats = () => {
    const[stationMap, setStationMap] = useState(new Map())
    const[averageMap, setAverageMap] = useState(new Map())
    const navigate = useNavigate()

    const canvasRef = useRef(null)
    
    const currentYear = new Date().getFullYear()

    const logout = () => {
        localStorage.removeItem('token')
        navigate("/")
    }

    useEffect(() => {
        let monthly_chart = null

        let cancelled = false

        const createChart = async () => {
            try {
                const res = await fetch('http://127.0.0.1:8000/fills', {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                        "Content-Type": "application/json"
                    }
                })

                if (!res.ok) {
                    throw new Error("Failed to fetch fills")
                }

                const data = await res.json()

                const vehicles = new Set()

                const monthly_obj = {}

                for(const fill of data){
                    if(!vehicles.has(fill.vehicle)){
                        vehicles.add(fill.vehicle)
                        monthly_obj[fill.vehicle] = monthly_breakdown(data, fill.vehicle)
                        
                    }
                }

                if (cancelled) return

                const chart_data = chart(monthly_obj)

                monthly_chart = new Chart(canvasRef.current, 
                    {
                        type: 'line',
                        data: chart_data,
                        options: {
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: true
                                },
                                tooltip: {
                                    callbacks: {
                                    label: (context) => `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`
                                    }
                                }
                            },
                            scales: {
                                x:{
                                    type:'category'
                                },
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        callback: (value) => '$' + value
                                    }
                                }
                            }
                        }
                    }
                )
                setStationMap(station_spending(data))
                setAverageMap(average_fill(data))
                
            }
            catch (error) {
                console.log('Error fetching fills:', error)
            }
        }
        createChart()
        return () => {
            cancelled = true

            if (monthly_chart) {
                monthly_chart.destroy()
            }
        }
    }, [])

    return (
        <div className="min-h-screen bg-black px-4 py-5 sm:px-8">
            <div className="mx-auto mb-8 flex max-w-6xl items-center justify-between">
               <div className="flex items-center gap-3">
                    <button onClick={() => navigate("/home")} className="flex items-center gap-3 cursor-pointer">
                        <h1 className="text-3xl font-bold text-white">
                        Full Tank
                        </h1>
                        <img
                            src="./src/assets/pump.jpg"
                            className="h-10 w-10 rounded-full object-cover"
                        />
                    </button>
                </div>

                <button
                    className="shrink-0 rounded-lg bg-yellow-600 px-6 py-3.5 font-semibold text-white shadow-md transition duration-200 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-900/30 active:scale-95"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>

                        {/* Dashboard Content */}
            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-6 lg:grid-cols-2">

                {/* Left Column - Chart */}
                <div className="w-full min-w-0 rounded-2xl border border-gray-800 bg-gray-900 p-4 shadow-xl sm:p-6">
                    <h2 className="mb-5 text-lg font-semibold text-white sm:text-xl">
                        Spending by Month in {currentYear}
                    </h2>

                    <div className="h-64 w-full sm:h-80">
                        <canvas ref={canvasRef}></canvas>
                    </div>
                </div>

                {/* Right Column - Station and Average Fill */}
                <div className="flex w-full min-w-0 flex-col gap-6">
                    {/* Average Fill */}
                    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-xl">
                        <div className="border-b border-gray-800 px-4 py-4 sm:px-6">
                            <h2 className="text-lg font-semibold text-white sm:text-xl">
                                Average Fill in {currentYear}
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-white">
                                <thead className="bg-zinc-800/70 text-xs uppercase tracking-wider text-yellow-500">
                                    <tr>
                                        <th className="px-3 py-4 font-semibold">Vehicle</th>
                                        <th className="px-2 py-4 text-center font-semibold">Avg Cost</th>
                                        <th className="px-2 py-4 text-center font-semibold">Avg Litres</th>
                                        <th className="px-2 py-4 text-right font-semibold">Avg Price ($/L)</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {Array.from(averageMap, ([vehicle, data]) => (
                                        <tr
                                            key={vehicle}
                                            className="border-b border-gray-800 transition-colors last:border-0 hover:bg-zinc-800/60"
                                        >
                                            <td className="px-3 py-4 font-medium">{vehicle}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-center text-yellow-500">
                                                ${Number(data.avg_cost).toFixed(2)}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-center text-gray-300">
                                                {Number(data.avg_litres).toFixed(2)} L
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-right text-gray-300">
                                                ${Number(data.avg_price).toFixed(3)}/L
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Station Spending */}
                    <div className="w-full min-w-0 overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-xl">
                        <div className="border-b border-gray-800 px-4 py-4 sm:px-6">
                            <h2 className="text-lg font-semibold text-white sm:text-xl">
                                Spending by Station in {currentYear}
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-white">
                                <thead className="bg-zinc-800/70 text-xs uppercase tracking-wider text-yellow-500">
                                    <tr>
                                        <th className="px-3 py-4 font-semibold">Station</th>
                                        <th className="px-3 py-4 text-center font-semibold">Fills</th>
                                        <th className="px-3 py-4 text-right font-semibold">Total Spent</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {Array.from(stationMap, ([station, data]) => (
                                        <tr
                                            key={station}
                                            className="border-b border-gray-800 transition-colors last:border-0 hover:bg-zinc-800/60"
                                        >
                                            <td className="px-3 py-4 font-medium">{station}</td>
                                            <td className="px-3 py-4 text-center text-gray-300">{data.fills}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-right font-semibold text-yellow-500">
                                                ${Number(data.total_spent).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats
