'use client'

import React, { useEffect } from 'react'
import { useState } from 'react';
import { useAccount } from 'wagmi'
import TextCircle from "./../components/textCircle"
import { useSignMessage } from 'wagmi';
// import GetLensProfile from "./../utils/getLensProfile"
import { client, defaultProfile } from "../utils/lensApi"


function Play() {
    const { address, isConnected, isDisconnected } = useAccount();
    // const address = data?.address;


    useEffect(() => {
        fetchProfiles()
    }, [address, isConnected])

    async function fetchProfiles() {
        try {
            /* fetch profiles from Lens API */
            let response = await client.query({ query: defaultProfile })
            /* return profiles with profile pics  */

            console.log(response.data.defaultProfile);
            console.log(address)
            
        } catch (err) {
            console.log({ err })
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-5/6 border-2 border-gray-800">
            play game here
            {/* {!signedIn && (
                <button onClick={signIn} className='mt-2'>
                    Login with Lens
                </button>
            )} */}
   
            <div className="flex flex-col lg:flex-row lg:max-w-5xl w-full lg:mb-0 lg:grid-cols-2 items-center justify-center border-2 border-blue-800 my-32 gap-10 lg:gap-20 bg-[url('/images/battle-arena.png')] bg-[55%] backdrop-opacity">
                {/* <div>{address}</div> */}
                <div className="group rounded-lg border border-transparent px-5 py-4 border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30 h-96 w-64">
                    <h2 className={`mb-3 text-2xl font-semibold text-primary-100`}>
                        Player 1
                    </h2>
                    <TextCircle />
                </div>
                    <div>
                        <h1 className="text-5xl font-extrabold tracking-tight leading-none text-gray-200">VS</h1>
                    </div>
                <div className="group rounded-lg border border-transparent px-5 py-4 border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30 h-96 w-64">
                    <h2 className={`mb-3 text-2xl font-semibold text-primary-100`}>
                        Player 2
                    </h2>
                    <TextCircle />
                </div>
            </div>
        </div>
    )
}
export default Play