import { useState, useEffect } from "react"
import { useNavigate } from "react-router"

const Home = () => {
    const [fills, setFills] = useState([])
    const [total, setTotal] = useState(0)
    const[ytd_total, setYtd] = useState(0)
    const[vehicleMap, setVehicleMap] = useState(new Map())

    const navigate = useNavigate()
    
    const logout = () => {
        localStorage.removeItem('token')
        navigate("/")
    }

    useEffect(() => {
        const fetchFills = async () => {
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
                setFills(data)
                
                const currentYear = new Date().getFullYear()

                let total = 0
                let ytd_total = 0

                const vehicleMap = new Map()

                const updateStats = (map, key, fill, isYtd) => {
                    const existing = map.get(key) || {
                        total_spent: 0,
                        ytd_spent: 0,
                        fills: 0,
                        ytd_fills: 0
                    }

                    existing.total_spent += fill.total_cost
                    existing.fills += 1

                    if (isYtd) {
                        existing.ytd_spent += fill.total_cost
                        existing.ytd_fills += 1
                    }

                    map.set(key, existing)
                }

                for (const fill of data) {
                    const isYtd =
                        new Date(fill.fill_date).getFullYear() === currentYear

                    total += fill.total_cost

                    if (isYtd) {
                        ytd_total += fill.total_cost
                    }

                    updateStats(vehicleMap, fill.vehicle, fill, isYtd)
                }

                setTotal(total)
                setYtd(ytd_total)
                setVehicleMap(vehicleMap)

            }
            catch (error) {
                console.log('Error fetching fills:', error)
            }
        }

        fetchFills()
    }, [])

    return (
        <div className="min-h-screen bg-black px-4 py-5 sm:px-8">

            {/* Header */}
            <div className="mx-auto mb-8 flex max-w-6xl items-center justify-between">
               <div className="flex items-center gap-3">
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
                </div>

                <button
                    className="shrink-0 rounded-lg bg-yellow-600 px-6 py-3.5 font-semibold text-white shadow-md transition duration-200 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-900/30 active:scale-95"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
            
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto mb-4 flex max-w-6xl items-center justify-between">
                    <h3 className="text-2xl font-bold tracking-tight text-white">
                    Overview
                    </h3>
                    <button
                        onClick={() => navigate('/stats')}
                        className="shrink-0 rounded-lg bg-yellow-600 px-4 py-2 font-semibold text-white shadow-md transition duration-200 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-900/30 active:scale-95"
                    >
                        View Stats
                    </button>
                </div>
            
                {/* Statistics Cards */}
                <div className="mb-8 grid grid-cols-1 gap-3 lg:grid-cols-2">
                    <div className="flex flex-col gap-3">
                        {/* Total Spent */}
                    <div className="rounded-xl border border-gray-700 bg-zinc-900 p-4 shadow-lg">
                        <h2 className="mb-2 text-sm font-semibold text-gray-400">
                            Total Spent
                        </h2>

                        <h3 className="text-2xl font-bold text-white">
                            {total > 0 ? `$${total.toFixed(2)}` : null}
                        </h3>

                        <div className="mt-3 h-1 w-12 rounded-full bg-yellow-700"></div>
                    </div>

                    {/* YTD */}
                    <div className="rounded-xl border border-gray-700 bg-zinc-900 p-4 shadow-lg">
                        <h2 className="mb-2 text-sm font-semibold text-gray-400">
                            Spent Year to Date
                        </h2>

                        <h3 className="text-2xl font-bold text-white">
                            {ytd_total > 0 ? `$${ytd_total.toFixed(2)}` : null}
                        </h3>

                        <div className="mt-3 h-1 w-12 rounded-full bg-yellow-700"></div>
                    </div>

                    </div>

                    {/* Vehicle Spending */}
                    <div className="rounded-xl border border-gray-700 bg-zinc-900 p-4 shadow-lg">
                        <h2 className="mb-3 text-sm font-semibold text-gray-400">
                            Spending by Vehicle
                        </h2>

                        <div className="flex flex-wrap gap-3">
                            {Array.from(vehicleMap, ([vehicle, data]) => (
                                <div
                                    key={vehicle}
                                    className="min-w-50 flex-1 rounded-lg border border-gray-700 bg-zinc-950 p-3"
                                >
                                    {/* Vehicle Name */}
                                    <h3 className="mb-3 text-sm font-bold text-white">
                                        {vehicle}
                                    </h3>

                                    {/* Total and YTD Columns */}
                                    <div className="grid grid-cols-2 gap-3">

                                        {/* Total */}
                                        <div className="border-r border-gray-700">
                                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                Total
                                            </p>

                                            <p className="text-sm text-gray-300">
                                                Spent: <span className="font-semibold text-yellow-400">
                                                    ${data.total_spent.toFixed(2)}
                                                </span>
                                            </p>

                                            <p className="text-sm text-gray-300">
                                                Fills: <span className="font-semibold text-white">
                                                    {data.fills}
                                                </span>
                                            </p>
                                        </div>

                                        {/* YTD */}
                                        <div>
                                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                                YTD
                                            </p>

                                            <p className="text-sm text-gray-300">
                                                Spent: <span className="font-semibold text-yellow-400">
                                                    ${data.ytd_spent.toFixed(2)}
                                                </span>
                                            </p>

                                            <p className="text-sm text-gray-300">
                                                Fills: <span className="font-semibold text-white">
                                                    {data.ytd_fills}
                                                </span>
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 h-1 w-12 rounded-full bg-yellow-700"></div>
                    </div>
                </div>

                <div className="rounded-xl border border-white/30 bg-zinc-950 p-5 shadow-xl sm:p-8">

                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">

                        {/* Add Fill Button */}
                        <button
                            onClick={() => navigate('/add')}
                            className="shrink-0 rounded-lg bg-yellow-600 px-6 py-3.5 font-semibold text-white shadow-md transition duration-200 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-900/30 active:scale-95"
                        >
                            + Add Fill
                        </button>
                    </div>

                    {fills.length > 0 ? (
                        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                            {fills.map((fill) => (
                                <button
                                    key={fill.id}
                                    onClick={() => navigate(`/fills/${fill.id}`)}
                                    className="group rounded-xl border border-gray-700 bg-zinc-900 p-5 text-left transition duration-200 hover:-translate-y-1 hover:border-yellow-500 hover:bg-zinc-800 hover:shadow-lg hover:shadow-yellow-900/20"
                                >

                                    <div className="mb-2 flex flex-wrap items-center gap-3">
                                        
                                        <h3 className="text-xl font-bold text-yellow-600 transition group-hover:text-yellow-400">
                                            ${fill.total_cost.toFixed(2)}
                                        </h3>

                                        <span className="text-sm text-gray-200">
                                            {fill.fill_date}
                                        </span>

                                        <span className="text-sm font-semibold text-white">
                                            {fill.vehicle}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-300">
                                        Station: {fill.station_name}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        Location: {fill.station_location}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        Price: ${fill.price}/L
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        Litres: {fill.litres}
                                    </p>

                                    <p className="mt-4 text-sm font-semibold text-yellow-400 opacity-0 transition group-hover:opacity-100">
                                        Edit/Delete Fill →
                                    </p>
                                </button>
                            ))}

                        </div>
                    ) : (
                        <div className="rounded-lg border border-dashed border-gray-700 py-16 text-center">
                            <p className="mb-3 text-4xl">⛽</p>

                            <p className="text-lg font-semibold text-white">
                                No Fills Found
                            </p>

                            <p className="text-lg font-semibold text-white">
                                Add a Fill to Get Started
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
