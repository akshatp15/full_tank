import { useState } from "react"
import { useNavigate } from "react-router"

const Add = () => {
    const [station, setStation] = useState('')
    const [location, setLocation] = useState('')
    const [price, setPrice] = useState('')
    const [cost, setCost] = useState('')
    const [fillDate, setDate] = useState('')
    const [vehicle, setVehicle] = useState('')
    const [litres, setLitres] = useState('')

    const navigate = useNavigate()

    const handleAdd = async () =>{
        try{
            if(!(station && fillDate && location && price && cost && litres && vehicle)){
                alert("Please fill in all fields before saving.")
                return
            }
            const res = await fetch('http://127.0.0.1:8000/fills/create', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fill_date: fillDate, 
                    station_name: station,
                    station_location: location,
                    price: price,
                    total_cost: cost,
                    litres: litres,
                    vehicle: vehicle
                })
            })
            const data = await res.json()

            if(!data.fill_id){
                throw new Error("Failed to Add Fill")
            }
            navigate("/home")

        }
        catch(error){
            console.log(error)
            console.log("Login Failed")
        };
    } 


return (
    <div className="min-h-screen bg-black px-4 py-8 sm:px-8 flex items-center justify-center">

        <div className="w-full max-w-3xl rounded-xl border border-white/20 bg-zinc-950 p-5 shadow-xl sm:p-8">

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-yellow-500"
                >
                    &larr; Back
                </button>

                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                    Add Fill
                </h1>

                <div className="w-16"></div>
            </div>

            {/* Fuel Information */}
            <div className="mb-6">
                <h2 className="mb-3 border-b border-zinc-800 pb-2 text-sm font-bold uppercase tracking-wider text-yellow-400">
                    Fuel Information
                </h2>

                <div className="grid grid-cols-2 gap-4">

                    {/* Fill Date */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-300">
                            Fill Date
                        </label>
                        <input
                            type="date"
                            value={fillDate}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full rounded-lg border border-gray-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Total Cost */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-300">
                            Total Cost ($)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            className="w-full rounded-lg border border-gray-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Litres */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-300">
                            Litres
                        </label>
                        <input
                            type="number"
                            step="0.001"
                            value={litres}
                            onChange={(e) => setLitres(e.target.value)}
                            className="w-full rounded-lg border border-gray-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-300">
                            Price ($/L)
                        </label>
                        <input
                            type="number"
                            step="0.001"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full rounded-lg border border-gray-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                        />
                    </div>
                </div>
            </div>

            {/* Station & Vehicle Information */}
            <div className="mb-7">
                <h2 className="mb-3 border-b border-zinc-800 pb-2 text-sm font-bold uppercase tracking-wider text-yellow-400">
                    Station & Vehicle
                </h2>

                <div className="grid grid-cols-2 gap-4">

                    {/* Station */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-300">
                            Station Name
                        </label>
                        <input
                            type="text"
                            value={station}
                            onChange={(e) => setStation(e.target.value)}
                            className="w-full rounded-lg border border-gray-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Vehicle */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-300">
                            Vehicle
                        </label>
                        <input
                            type="text"
                            value={vehicle}
                            onChange={(e) => setVehicle(e.target.value)}
                            className="w-full rounded-lg border border-gray-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                        />
                    </div>

                    {/* Location - Full Width */}
                    <div className="col-span-2">
                        <label className="mb-1.5 block text-sm font-medium text-gray-300">
                            Station Location
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full rounded-lg border border-gray-700 bg-zinc-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={handleAdd}
                    className="flex-1 rounded-lg bg-yellow-600 px-4 py-3 text-sm font-bold text-white shadow-md transition hover:bg-yellow-500 active:scale-95"
                >
                    Add Fill
                </button>
            </div>

        </div>
    </div>
)

}
export default Add
