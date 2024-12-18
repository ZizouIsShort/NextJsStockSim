'use client'
import {useState, useEffect} from "react";
import {cos} from "three/src/nodes/math/MathNode";


export let BuyData = {
    stockName: '',
    buyDate: '',
    buyPrice: '',
};
export default function Dashboard() {

    const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY
    const [stkName, setName] = useState('')
    const [bDate, setPdate] = useState('');
    const [pPrice, setPprice] = useState('');
    const [sDate, setSdate] = useState('')
    const [sPrice, setSprice] = useState('')
    const naamSet = (e) => {
        setName(e.target.value)
    }
    useEffect(() => {
        console.log('DATE aur PRICE update ho gaya')
    }, [bDate, pPrice]);
    const setSell = async () => {
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stkName}&apikey=${apiKey}`)
            const data = await response.json()
            const timeSeries = data["Time Series (Daily)"]
            const latestDate = Object.keys(timeSeries)[0];
            const latestClose = timeSeries[latestDate]["4. close"];
            setSdate(latestDate)
            setSprice(latestClose)
            console.log(sDate)
            console.log(sPrice)
        } catch (error) {
            console.log("Error", error)
        }
    }
    const setBuy = async () => {
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stkName}&apikey=${apiKey}`)
            const data = await response.json();
            if (data["Time Series (Daily)"]) {
                const timeSeries = data["Time Series (Daily)"];
                const latestDate = Object.keys(timeSeries)[0];
                const latestClose = timeSeries[latestDate]["4. close"];

                setPdate(latestDate); // Update state for UI
                setPprice(latestClose);

                // Update and export BuyData object
                BuyData = {
                    stockName: stkName,
                    buyDate: latestDate,
                    buyPrice: latestClose,
                };

                console.log("BuyData exported:", BuyData);
            } else {
                console.error("Invalid API response or symbol not found.");
            }
        } catch (error) {
            console.error("Error fetching stock data:", error);
        }
    }


    return (
        <div className={'bg-black pb-8'}>
            <h1 className="text-center text-3xl my-5 text-white">StockSim</h1>
            <nav className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full w-1/3">
                <div className="flex justify-between items-center px-3 py-2">
                    <p className="text-gray-800 hover:text-gray-600 transition-colors duration-300 cursor-pointer">Portfolio</p>
                    <p className="text-gray-800 hover:text-gray-600 transition-colors duration-300 cursor-pointer">Trade</p>
                    <p className="text-gray-800 hover:text-gray-600 transition-colors duration-300 cursor-pointer">Account</p>
                </div>
            </nav>

            <div className="flex flex-col items-center mt-32">
                <div className="w-3/4 space-y-8">
                    <div>
                        <div className="flex justify-between mb-4">
                            <h2 className="text-xl font-bold">Overview</h2>
                            <h2 className="text-xl font-bold">Performance</h2>
                        </div>
                        <div className="flex justify-between">
                            <div
                                className="w-[calc(50%-0.5rem)] p-6 bg-black text-white border border-white rounded-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] transition-shadow duration-300">
                                <div className="flex flex-col items-start">
                                    <div className="flex flex-row justify-between w-full">
                                        <div className="flex flex-col">
                                            <p className="text-gray-500">Account Value (AV)</p>
                                            <p className="text-2xl font-bold">$100,000.15</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="text-gray-500">Today's Change</p>
                                            <p className="text-2xl font-bold text-green-500">+$0.00 (0.00%)</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between w-full mt-3">
                                        <div className="flex flex-col">
                                            <p className="text-gray-500">Annual Return</p>
                                            <p className="text-2xl font-bold">$100,000.15</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between w-full mt-3">
                                        <div className="flex flex-col">
                                            <p className="text-gray-500">Buying Power (BP)</p>
                                            <p className="text-2xl font-bold">$100,000.15</p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <p className="text-gray-500">Cash (For trading)</p>
                                            <p className="text-2xl font-bold">$100,000.15</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="w-[calc(50%-0.5rem)] bg-black text-white border border-white rounded-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] transition-shadow duration-300">
                                <div className="flex flex-row justify-between">
                                    {['1W', '1M', '3M', '6M', '1Y'].map((period) => (
                                        <div
                                            key={period}
                                            className="flex-1 text-center cursor-pointer transition-colors duration-300 hover:bg-white group py-3"
                                        >
                                            <p className="text-2xl font-bold group-hover:text-black">{period}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-4">Trade</h2>
                        <div
                            className="w-full p-6 bg-black rounded-xl border border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] transition-shadow duration-300">
                            <div className="p-8">
                                <h2 className="text-2xl font-bold mb-6 text-white">Trade</h2>
                                <form>
                                    <div className="mb-4">
                                        <input
                                            value={stkName}
                                            onChange={naamSet}
                                            type="text"
                                            placeholder="Look up Symbol/Company Name"
                                            className="w-full px-3 py-2 text-black placeholder-gray-500 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
                                        />
                                    </div>
                                    <div className="flex mb-4">
                                        <div className="w-1/2 mr-2">
                                            <label className="block text-sm font-medium text-white mb-1">Action</label>
                                            <select
                                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 text-black">
                                                <option>Buy</option>
                                                <option>Sell</option>
                                            </select>
                                        </div>
                                        <div className="w-1/2 ml-2">
                                            <label
                                                className="block text-sm font-medium text-white mb-1">Quantity</label>
                                            <input
                                                type="number"
                                                defaultValue="0"
                                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring text-black focus:ring-indigo-100 focus:border-indigo-300"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <button
                                            onClick={setBuy}
                                            type="button"
                                            className="flex-1 mr-2 bg-black text-white border border-white rounded px-4 py-2 font-bold transition-colors duration-300 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                                        >
                                            Buy
                                        </button>
                                        <button
                                            onClick={setSell}
                                            type="button"
                                            className="flex-1 ml-2 bg-black text-white border border-white rounded px-4 py-2 font-bold transition-colors duration-300 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                                        >
                                            Sell
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
