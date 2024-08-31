"use client"

import {FormEvent} from "react";
import {object} from "prop-types";

export default function Page() {
  async function onSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')
    console.log("Test")
    console.log(username)
    console.log(password)
    console.log("Done")
  }
  return (
      <div className={"flex bg-black h-screen justify-center items-center"}>
        <form className={"flex-col space-y-8 align-middle p-6 w-1/4 h-1/2 border-2 border-white rounded-3xl text-xl hover:shadow-[0_0_15px_rgba(255,255,255,0.9)] transition-all duration-300 ease-in-out"} onSubmit={onSubmit}>
          <p className={"text-center text-3xl"}>
            Login
          </p>
          <div className={"flex-col"}>
            <p>
              Username
            </p>
            <input className={"bg-black border-2 border-white rounded-3xl text-xs p-2 w-80"} placeholder={""} name={"username"}/>
          </div>
          <div className={"flex-col"}>
            <p>
              Password
            </p>
            <input name={"password"} className={"bg-black border-2 border-white rounded-3xl text-xs p-2 w-80"} placeholder={""} type={"password"}/>
          </div>
          <div className="flex justify-center">
            <button type={"submit"} className={"flex bg-white text-black p-2 rounded-xl text-lg hover:opacity-50"}>
              Submit
            </button>
          </div>
        </form>
      </div>
  )
}