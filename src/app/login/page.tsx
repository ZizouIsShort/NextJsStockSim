import { login, signup } from './actions'
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <form
                className="w-full max-w-sm mx-auto p-6 bg-black rounded-lg border border-gray-700 hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] transition-shadow duration-300">
                <h1 className="text-2xl text-white text-center mb-6">Login / Sign Up</h1>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email:</label>
                    <input id="email" name="email" type="email" required
                           className="w-full py-1 px-0.5 bg-white border border-gray-300 rounded-md text-black focus:outline-none focus:border-blue-500"/>
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-white mb-2">Password:</label>
                    <input id="password" name="password" type="password" required
                           className="w-full py-1 px-0.5 bg-white border border-gray-300 rounded-md text-black focus:outline-none focus:border-blue-500"/>
                </div>
                <div className="flex space-x-4">
                    <button formAction={login}
                            className="flex-1 bg-black text-white border border-white rounded px-4 py-2 font-bold transition-colors duration-300 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">Log
                        in
                    </button>
                    <button formAction={signup}
                            className="flex-1 bg-black text-white border border-white rounded px-4 py-2 font-bold transition-colors duration-300 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">Sign
                        up
                    </button>
                </div>
            </form>
        </div>
    )
}