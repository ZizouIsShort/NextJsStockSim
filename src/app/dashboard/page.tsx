export default function dashboard(){
    return (
        <div>
            <h1 className="text-center text-3xl my-5">StockSim</h1>
            <nav className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full w-1/3">
                <div className="flex justify-between items-center px-3 py-2">
                    <p className="text-gray-800 hover:text-gray-600 transition-colors duration-300 cursor-pointer">Portfolio</p>
                    <p className="text-gray-800 hover:text-gray-600 transition-colors duration-300 cursor-pointer">Trade</p>
                    <p className="text-gray-800 hover:text-gray-600 transition-colors duration-300 cursor-pointer">Account</p>
                </div>
            </nav>

            <div className="flex flex-col items-center h-[calc(100vh-6rem)] mt-32">
                <div className="flex justify-between w-3/4 mb-4">
                    <h2 className="text-xl font-bold">Overview</h2>
                    <h2 className="text-xl font-bold">Performance</h2>
                </div>
                <div className="flex w-3/4 justify-between">
                    <div className="flex-1 p-6 bg-black text-white border border-white rounded-lg mr-4">
                        <div className="flex flex-col items-start">
                            <div className="flex flex-row justify-between">
                                <div className="flex justify-between mr-5">
                                    <p className="text-gray-500">Account Value</p>
                                    <p className="text-2xl font-bold">$100,000.15</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-500">Today's Change</p>
                                    <p className="text-2xl font-bold text-green-500">+$0.00 (0.00%)</p>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-500">Annual Return</p>
                                <p className="text-2xl font-bold">0.00%</p>
                            </div>
                            <div className="flex flex-row justify-between">
                                <div className="flex justify-between mr-5">
                                    <p className="text-gray-500">Buying Power</p>
                                    <p className="text-2xl font-bold">$100,000.15</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-500">Cash</p>
                                    <p className="text-2xl font-bold">$100,000.15</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 p-6 bg-black text-white border border-white rounded-lg">
                        <div className="flex flex-row justify-between">
                            <div className="text-center">
                                <p className="text-2xl font-bold">1W</p>
                                <p className="text-gray-500">-</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">1M</p>
                                <p className="text-gray-500">-</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">3M</p>
                                <p className="text-gray-500">-</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">6M</p>
                                <p className="text-gray-500">-</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">1Y</p>
                                <p className="text-gray-500">-</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
