import { useState, useEffect, useRef} from "react"
import { useNavigate } from "react-router"
import stats from "../../utils/stats"
import chart from "../../utils/chart"
import Chart from 'chart.js/auto'


const Stats = () => {

    const navigate = useNavigate()

    const canvasRef = useRef(null)
    
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

                if (cancelled) return

                const monthly_data = stats(data)

                const chart_data = chart(monthly_data)

                monthly_chart = new Chart(canvasRef.current, 
                    {
                        type: 'line',
                        data: chart_data,
                        options: {
                            responsive: true,
                            plugins: {
                                legend: {
                                    display: false
                                }
                            },
                            scales: {
                                x:{
                                    type:'category'
                                },
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }
                    }
                )
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
            {/* Chart */}
            <div className="mx-auto w-full max-w-3xl rounded-xl border border-gray-700 bg-gray-900 p-6 shadow-lg">
                <h2 className="mb-6 text-xl font-semibold text-white">
                    Spending by Month
                </h2>

                <div className="h-80 w-full">
                    <canvas ref={canvasRef}></canvas>
                </div>
            </div>
        </div>
    )
}

export default Stats
