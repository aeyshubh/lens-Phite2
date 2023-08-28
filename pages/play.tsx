'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useAccount } from 'wagmi'
import { useSignMessage } from 'wagmi';
import { abi2 } from '../utils/lensOracle'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { Contract, ethers } from "ethers";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { abi3 } from "../utils/phatAbi";
import { abi4 } from '../utils/message';



function Play() {
  const [handle, setHandle] = useState('');
  const [pid, setId] = useState('');
  const [profile, setProfile] = useState('');
  const [secondP, setsecondP] = useState('');
  const [secondId, setsecondId] = useState('');
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const[secondAddress,setSecondAddress] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  // Animation and battle function
  const abi_OueryOracle = abi2;
  const contractAddress_OueryOracle = '0x8a0ed779d131dAe2Ca8b0a7606e02944Ee611F79';


  // Other parts
  /* if((typeof window !== "undefined")){
  
  
  } */

  const playedOnce = 0;


 const users = ["0x01", "0x7a", "0x8fef", "0x02", "0x015", "0x3aed", "0x06", "0x0202"]
//const users = ["0x8fef"];
  // const { address, isConnected, isDisconnected } = useAccount();
  // const address = data?.address;
  var response;
  let provider;
  let signer;
  const { address, isConnected, isDisconnected } = useAccount();
  // const address = data?.address;
  const API_URL = 'https://api-mumbai.lens.dev'
  const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache()
  })
  let contractWrite;
  useEffect(() => {
    if (typeof window !== "undefined") {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.send('eth_requestAccounts', []);
      signer = provider.getSigner();
     contractWrite = new ethers.Contract(contractAddress_OueryOracle, abi_OueryOracle, signer);
    
    }
    fetchProfiles(),
      fetchSecondProfile()
  }, [])

  const handleEvent = async () => {
    setIsButtonClicked(true);
    setTimeout(() => {
      setIsButtonClicked(false);
    }, 1000);
     provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.send('eth_requestAccounts', []);
      signer = provider.getSigner();
     contractWrite = new ethers.Contract(contractAddress_OueryOracle, abi_OueryOracle, signer);
    
console.log("Id 1 :", pid);
await provider.send('eth_requestAccounts', []);    
const writen = await contractWrite.request(pid);
    console.log("Written 1" + writen.hash);

 console.log("Id2 : ",secondId);
    const writen2 = await contractWrite.request(secondId);
    console.log("Written 2" + writen2.hash);
    //var contract = "0xa6ca3642794a03bf4f13dd404571da2dae29916d";
    const provider2 = new ethers.providers.WebSocketProvider("wss://frequent-solitary-cherry.matic-testnet.discover.quiknode.pro/d4eddd3fb5a80ca6014416b9f38fdac88d9333a2/")
    const contractRead = new ethers.Contract(contractAddress_OueryOracle, abi2, provider2);
    contractRead.on('ResponseReceived', (id, pair, value) => {
      var score = parseInt(value._hex, 16);
      console.log("Idd:",id,"pair",pair,"score",score);
       if (pid == pair) {

        setScore1(score);
      console.log("Socre1:", score1);

      } else {

        setScore2(score);
      console.log("Socre2:", score2);

        mintNft();
      }
 

    })
  };

  const fetchProfiles = async () => {
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
      response = await client.query({ query: defaultProfile }).then(async (value) => {
        /* return profiles with profile pics  */
        setHandle(value.data.defaultProfile.handle)
        setId(value.data.defaultProfile.id)

        // write?.()

      })
      console.log(address)

    } catch (err) {
      console.log({ err })
    }
  }

  const fetchSecondProfile = async () => {
    try {
      /* fetch profiles from Lens API */
      const contractWrite = new ethers.Contract(contractAddress_OueryOracle, abi_OueryOracle, signer);

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
      response = await client.query({ query: defaultProfile }).then(async (value) => {
        /* return profiles with profile pics  */
        console.log("second Player", value.data.profile.handle);
        setsecondP(value.data.profile.handle);
        setsecondId(profile)
        setSecondAddress(value.data.profile.ownedBy)

      })
      console.log(address)

    } catch (err) {
      console.log({ err })
    }
  }

  async function mintNft() {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send('eth_requestAccounts', []);
    signer = provider.getSigner();

    const nftContract ="0x16cb27EB3B6e2c3dA78e08f54F41b329a6C0B1F3"
    const contractWrite2 = new ethers.Contract(nftContract, abi4, signer);
console.log("Adderss 2nd",secondAddress);
    setProfile("oo");
      if(score1 > score2 && score2 != 0){
       console.log('Player 1 is winner')
       alert("Winner is Player 1");
       const writen2 = await contractWrite2.train();
     } 
     else if (score1 == score2 && score1 != 0){
       console.log("That's a Draw")
       alert("That's a Draw");

       const writen2 = await contractWrite2.train();
       const writen3 = await contractWrite2.trainop(secondAddress,{gasLimit: 5000000});

     } 
      else if(score2 > score1 ){
       console.log('Player 2 is winner')
       alert("Winner is Player 2");

       console.log("Address 2nd :",secondAddress);

       const writen3 = await contractWrite2.trainop(secondAddress,{gasLimit: 5000000});
        console.log("Hash 3",writen3.hash);
     } 
     else{}
  }
  //second O 0xa6Ca3642794a03Bf4F13dD404571Da2dAE29916d
/*   function getdata() {
    var contract = "0xa6ca3642794a03bf4f13dd404571da2dae29916d";
    const provider = new ethers.providers.WebSocketProvider("wss://frequent-solitary-cherry.matic-testnet.discover.quiknode.pro/d4eddd3fb5a80ca6014416b9f38fdac88d9333a2/")
    const contractRead = new ethers.Contract(contract, abi2, provider);
    contractRead.on('ResponseReceived', (id, pair, value) => {
      var score = parseInt(value._hex, 16);
      console.log("Idd:",id,"pair",pair);
       if (pid == pair) {
        setScore1(score);
      } else {
        setScore2(score);
      }
      console.log("Socre1:", score1);
      console.log("Socre2:", score2);
 
      contractRead.off('ResponseReceived', (id, pair, value));
      //return score;
      // process.exit(0);

    })
  } */

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
        <p className="text-bas ">{pid}</p>
      </div>
      <img src='/images/avatar-left.png' alt='avtar head' className={`rounded-full filter drop-shadow-lg ${isButtonClicked ? 'translate-x-16 transition-transform' : ''
        }`} width={225} height={225} />
      <div className='self-center'>
        <h1 className="text-7xl mb-5 text-center font-extrabold tracking-tight leading-none customText">VS</h1>
        <button onClick={handleEvent} className='css-button-3d--red'>BATTLE</button>
      </div>
      <img src='/images/avatar-right.png' alt='avtar head' className={`rounded-full filter drop-shadow-lg ${isButtonClicked ? '-translate-x-16 transition-transform' : ''
        }`} width={225} height={225} />
      <div className="w-4/12 p-2 mr-10 mt-10 bg-neutral-800/30 border border-gray-200 rounded-lg shadow sm:p-8 text-primary-100">
        <h5 className="text-xl font-bold ">{secondP}</h5>
        <h5 className="text-xl font-bold ">{score2}</h5>
        <p className="text-bas ">{secondId}</p>
      </div>

    </div>
  )
}
export default Play