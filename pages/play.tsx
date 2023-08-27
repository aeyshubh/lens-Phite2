'use client'

// import React, { useEffect } from 'react'
// import { useState } from 'react';
// import { useAccount } from 'wagmi'
// import TextCircle from "./../components/textCircle"
// import { useSignMessage } from 'wagmi';
// // import GetLensProfile from "./../utils/getLensProfile"
// import { client, defaultProfile } from "../utils/lensApi"

import React, { useEffect } from 'react'
import { useState } from 'react';
import { useAccount } from 'wagmi'
import TextCircle from "./../components/textCircle"
import { useSignMessage } from 'wagmi';
import {abi2} from '../utils/lensOracle'
import { usePrepareContractWrite, useContractWrite,  useWaitForTransaction } from 'wagmi'
 import {Contract,ethers} from "ethers";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { call } from 'viem/dist/types/actions/public/call';
import{abi3} from "../utils/phatAbi";



function Play() {
    const[handle,setHandle] = useState('');
    const [id,setId] = useState('');
    const [profile,setProfile] = useState('');
    const [secondP,setsecondP] = useState('');
    const [secondId,setsecondId] = useState('');
    const [score1,setScore1] = useState('');
    const [score2,setScore2] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    // Animation and battle function
    const handleEvent = () => {
      setIsButtonClicked(true);
      setTimeout(() => {
        setIsButtonClicked(false);
      }, 1000); 

      if(score1 > score2){
        console.log('Player 1 is winner')
      } else if (score1 == score2){
        console.log("That's a Draw")
      } else {
        console.log('Player 2 is winner')
      }
    };

    // Other parts
    const abi_OueryOracle = abi2;
const contractAddress_OueryOracle = '0x5efc19C5FCc5Dce7cc2d4ACFefAb654cBcDeE105';
const playedOnce = 0;
const { config } = usePrepareContractWrite({
  address: contractAddress_OueryOracle,
  abi: abi_OueryOracle,
  functionName: 'request',
  args: [id]
})
const {write} = useContractWrite(config);
const users = ["0x01","0x7a","0x8fef","0x02","0x015","0x3aed","0x06","0x0202"]

    // const { address, isConnected, isDisconnected } = useAccount();
    // const address = data?.address;
    var response;
    const { address, isConnected, isDisconnected } = useAccount();
    // const address = data?.address;
    const API_URL = 'https://api-mumbai.lens.dev'
    const client = new ApolloClient({
        uri: API_URL,
        cache: new InMemoryCache()
      })
    useEffect(() => {
        fetchProfiles(),
        getdata(),
        fetchSecondProfile()
    }, [address, isConnected])
 
    async function fetchProfiles() {
        try {
            /* fetch profiles from Lens API */
            let defaultProfile = gql`
query DefaultProfile {
  defaultProfile(
    request: { ethereumAddress: "${address}" }
  ) {
    id
    name
    bio
    isDefault
    attributes {
      displayType
      traitType
      key
      value
    }
    followNftAddress
    metadata
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        chainId
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        chainId
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
    }
    ownedBy
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
  }
}
 
`
response = await client.query({ query: defaultProfile }).then(async (value) =>{
    /* return profiles with profile pics  */
setHandle(value.data.defaultProfile.handle)
setId(value.data.defaultProfile.id)

// await write?.()
console.log("Id:",id);
})
console.log(address)

} catch (err) {
console.log({ err })
}
}

async function fetchSecondProfile(){
try {
/* fetch profiles from Lens API */

let index = Math.floor(Math.random() * users.length);
let profile = users[index]
let defaultProfile = gql`query Profile {
profile(request: { profileId: "${profile}" }) {
id
name
bio
attributes {
displayType
traitType
key
value
}
followNftAddress
metadata
isDefault
picture {
... on NftImage {
contractAddress
tokenId
uri
verified
}
... on MediaSet {
original {
url
mimeType
}
}
__typename
}
handle
coverPicture {
... on NftImage {
contractAddress
tokenId
uri
verified
}
... on MediaSet {
original {
url
mimeType
}
}
__typename
}
ownedBy
dispatcher {
address
canUseRelay
}
stats {
totalFollowers
totalFollowing
totalPosts
totalComments
totalMirrors
totalPublications
totalCollects
}
followModule {
... on FeeFollowModuleSettings {
type
amount {
asset {
symbol
name
decimals
address
}
value
}
recipient
}
... on ProfileFollowModuleSettings {
type
}
... on RevertFollowModuleSettings {
type
}
}
}
}`
setsecondId(profile);
response = await client.query({ query: defaultProfile }).then(async (value) =>{
/* return profiles with profile pics  */
console.log("second Player",value.data.profile.handle);
setsecondP(value.data.profile.handle);
// await write?.()
/* setHandle(value.data.defaultProfile.handle)
setId(value.data.defaultProfile.id)
console.log("Id:",id);
await write?.() */

})
console.log(address)

} catch (err) {
console.log({ err })
}
}

function battle(){

}
//second O 0xa6Ca3642794a03Bf4F13dD404571Da2dAE29916d
function getdata(){            
var contract = "0x5efc19C5FCc5Dce7cc2d4ACFefAb654cBcDeE105";
const provider = new ethers.providers.WebSocketProvider("wss://frequent-solitary-cherry.matic-testnet.discover.quiknode.pro/d4eddd3fb5a80ca6014416b9f38fdac88d9333a2/")
const contractRead = new ethers.Contract(contract,abi2,provider);
contractRead.on('ResponseReceived',(id, pair,value) =>{
var score = parseInt(value._hex,16);
if(id == id){
setScore1(score);
}else{
setScore2(score);
}
console.log("Socre:",score);
contractRead.off('ResponseReceived',(id, pair,value));
return score ;
// process.exit(0);

})}

    // useEffect(() => {
    //     fetchProfiles()
    // }, [address, isConnected])

    // async function fetchProfiles() {
    //     try {
    //         /* fetch profiles from Lens API */
    //         let response = await client.query({ query: defaultProfile })
    //         /* return profiles with profile pics  */

    //         console.log(response.data.defaultProfile);
    //         console.log(address)
            
    //     } catch (err) {
    //         console.log({ err })
    //     }
    // }

    return (
        // <div className="flex flex-col items-center justify-center h-5/6 border-2 border-gray-800">
        //     play game here
        //     {/* {!signedIn && (
        //         <button onClick={signIn} className='mt-2'>
        //             Login with Lens
        //         </button>
        //     )} */}
   
        //     <div className="flex flex-col lg:flex-row lg:max-w-5xl w-full lg:mb-0 lg:grid-cols-2 items-center justify-center border-2 border-blue-800 my-32 gap-10 lg:gap-20 bg-[url('/images/battle-arena.png')] bg-[55%]">
        //         {/* <div>{address}</div> */}
        //         <div className="group rounded-lg border border-transparent px-5 py-4 border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30 h-96 w-64">
        //             <h2 className={`mb-3 text-2xl font-semibold text-primary-100`}>
        //                 Player 1
        //             </h2>
        //             <TextCircle />
        //         </div>
        //             <div>
        //                 <h1 className="text-5xl font-extrabold tracking-tight leading-none text-gray-200">VS</h1>
        //             </div>
        //         <div className="group rounded-lg border border-transparent px-5 py-4 border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30 h-96 w-64">
        //             <h2 className={`mb-3 text-2xl font-semibold text-primary-100`}>
        //                 Player 2
        //             </h2>
        //             <TextCircle />
        //         </div>
        //     </div>
        // </div>
        <div className="w-9/12 h-4/6 mt-6 flex items-start justify-between bg-black bg-[url('/images/battle-arena.png')] bg-[55%]">
            {/* <div className='h-full w-full rounded-lg border border-transparent px-5 py-4 border-gray-300 dark:border-neutral-700 dark:bg-neutral-800/30'>Player 1</div>
            <div className='h-full w-full bg-red'>vs</div>
            <div className='h-full w-full bg-black'>PLAyer 2</div> */}
            
            <div className="w-4/12 p-2 ml-10 mt-10 bg-neutral-800/30 border border-gray-200 rounded-lg shadow sm:p-8 text-primary-100">
                <h5 className="text-xl font-bold ">{handle}</h5>
                <h5 className="text-xl font-bold ">{score1}</h5>
                <p className="text-bas ">{id}</p>
            </div>
            <img src='/images/avatar-left.png' alt='avtar head' className={`rounded-full filter drop-shadow-lg ${
                isButtonClicked ? 'translate-x-16 transition-transform' : ''
            }`} width={225} height={225}/>
            <div className='self-center'>
                 <h1 className="text-7xl mb-5 text-center font-extrabold tracking-tight leading-none customText">VS</h1>
                 <button onClick={handleEvent} className='css-button-3d--red'>BATTLE</button>
             </div>
             <img src='/images/avatar-right.png' alt='avtar head' className={`rounded-full filter drop-shadow-lg ${
                isButtonClicked ? '-translate-x-16 transition-transform' : ''
            }`} width={225} height={225}/>
            <div className="w-4/12 p-2 mr-10 mt-10 bg-neutral-800/30 border border-gray-200 rounded-lg shadow sm:p-8 text-primary-100">
                <h5 className="text-xl font-bold ">{secondP}</h5>
                <h5 className="text-xl font-bold ">{score2}</h5>
                <p className="text-bas ">{secondId}</p>
            </div>

        </div>
    )
}
export default Play