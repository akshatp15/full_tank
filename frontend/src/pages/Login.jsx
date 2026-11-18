import { useState } from "react"
import { useNavigate } from "react-router"

const Login = () => {
    const [option, setOption] = useState('Login')
    const [usernameEnt, setUsernameEnt] = useState('')
    const [passwordEnt, setPasswordEnt] = useState('')
    const[fail, setFail] = useState('')
    const[createFail, setCreateFail] = useState('')
 
    const navigate = useNavigate()

    const handleLogin = async () =>{
        try{
            setFail('')
            const res = await fetch('http://127.0.0.1:8000/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: usernameEnt, 
                    password: passwordEnt})
            })
            const data = await res.json()

            if(res.status == 401){
                setFail('Fail')
                throw new Error("Login Failed")
            }
            if(!data.access_token){
                throw new Error("Token Not Received")
            }

            localStorage.setItem('token', data.access_token)

            navigate("/home")

        }
        catch(error){
            console.log(error)
            console.log("Login Failed")
        };
    } 

    const handleCreate = async () =>{
        try{
            const res = await fetch('http://127.0.0.1:8000/create-user', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: usernameEnt, 
                    password: passwordEnt})
            })
            if(res.status == 409){
                setCreateFail('Fail')
                throw new Error("Username already exists")
            }

            if(!res.ok){
                throw new Error("Create Failed")
            }

            setOption('Login')
        }
        catch(error){
            console.log("Create Failed")
        };
    } 

    return(
       <div className="flex min-h-screen items-center justify-center bg-black px-4 py-8">
            <div className="w-full max-w-2xl rounded-xl border border-white p-5 sm:p-8 md:p-12 items-center">
                <p className="mb-2 text-center text-3xl font-bold text-white">
                    Welcome To Full Tank
                </p>
                <p className="mb-5 text-center text-lg font-bold text-white">Please Login/Create Account</p>
                <div className="mb-4 flex overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">
                <button
                    onClick={() => setOption('Login')}
                    className={`flex-1 px-4 py-3 font-medium transition ${
                    option === 'Login'
                        ? 'bg-yellow-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    Login
                </button>

                <button
                    onClick={() => setOption('Create')}
                    className={`flex-1 px-4 py-3 font-medium transition ${
                    option === 'Create'
                        ? 'bg-yellow-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    Create Account
                </button>
                </div>
                {option == 'Login' ? (
                    <div className="flex flex-col items-center justify-center gap-3">
                        <p className="text-lg font-bold text-white">Username</p>
                        <input type="text" value={usernameEnt} onChange={(e)=> setUsernameEnt(e.target.value)} className="w-full max-w-md border bg-white px-3 py-2"/>
                        <p className="text-lg font-bold text-white">Password</p>
                        <input type="password" value={passwordEnt} onChange={(e)=> setPasswordEnt(e.target.value)} className="w-full max-w-md border bg-white px-3 py-2"/>
                        <button onClick={handleLogin
                        } className="mt-1 border bg-yellow-600 px-6 py-3 text-base font-bold text-white hover:bg-gray-100 hover:text-black">Login</button>
                    </div>
                ) :
                (
                    <div className="flex flex-col items-center justify-center gap-3">
                        <p className="text-lg font-bold text-white">Username</p>
                        <input type="text" value={usernameEnt} onChange={(e)=> setUsernameEnt(e.target.value)} className="w-full max-w-md border bg-white px-3 py-2"/>
                        <p className="text-lg font-bold text-white">Password</p>
                        <input type="password" value={passwordEnt} onChange={(e)=> setPasswordEnt(e.target.value)} className="w-full max-w-md border bg-white px-3 py-2"/>
                        <button onClick={handleCreate
                        } className="mt-1 border bg-yellow-600 px-6 py-3 text-base font-bold text-white hover:bg-gray-100 hover:text-black">Create Account</button>
                    </div>
                )}
                {option == 'Login' && fail && (
                <p className="mt-4 text-center font-bold text-red-500">
                    Login Failed: Please check your username and password
                </p>
                )}
                {option == 'Create' && createFail && (
                <p className="mt-4 text-center font-bold text-red-500">
                    Create Failed: Please check use a different username or login
                </p>
                )}
                </div>
        </div>
    )
}
export default Login
