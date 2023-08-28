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
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import { ToastContainer, toast } from 'react-toastify';

const buttonClickSound = '/sounds/smb_coin.mp3';

function Play() {
  const [handle, setHandle] = useState('');
  const [pid, setId] = useState('');
  const [profile, setProfile] = useState('');
  const [secondP, setsecondP] = useState('');
  const [secondId, setsecondId] = useState('');
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [winner, setWinner] = useState(false);
  const[secondAddress,setSecondAddress] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const { width, height } = useWindowSize()
  // Animation and battle function
  const abi_OueryOracle = abi2;
  const contractAddress_OueryOracle = '0x7cB6d43f344245BF480C4a931894cc4e68834795';


  // Other parts
  /* if((typeof window !== "undefined")){
  
  
  } */

  const playedOnce = 0;


 // const users = ["0x01", "0x7a", "0x8fef", "0x02", "0x015", "0x3aed", "0x06", "0x0202"]
const users = ["0x02","0x8fef", "0x7a"];
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
       if (pair == pid) {

        setScore1(score);
      console.log("Socre1:", score1);

      } 
      if(pair == secondId) {

        setScore2(score);
      console.log("Socre2:", score2);
      contractRead.off('ResponseReceived', (id, pair, value))

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
//console.log("Adderss 2nd",secondAddress);
    setProfile("oo");
      if(score1 > score2 && score2 != 0){
       console.log('Player 1 is winner')
       alert("Winner is Player 1");
       const writen2 = await contractWrite2.train();
       //setWinner(true) 
/*        toast.success('You Won 🥳🎉', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        }); */
     } 
     if (score1 == score2 && score1 != 0){
       console.log("That's a Draw")
       alert("That's a Draw");

       const writen2 = await contractWrite2.train();
       const writen3 = await contractWrite2.trainop(secondAddress,{gasLimit: 5000000});

/*        toast.success('Match Draw 🫡', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        }); */
     } 
      if(score2 > score1 ){
       console.log('Player 2 is winner')
       alert("Winner is Player 2");

       console.log("Address 2nd :",secondAddress);

       const writen3 = await contractWrite2.trainop(secondAddress,{gasLimit: 5000000});
        console.log("Hash 3",writen3.hash);
/* 
        toast.success('You Lost 😑', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          }); */
     } 
  }

  return (
    <>

    <div className="w-9/12 h-4/6 mt-6 flex items-start justify-between bg-black bg-[url('/images/battle-arena.png')] bg-[55%]">
{/*     {winner && <Confetti
      width={width}
      height={height}
    />} */}
      <div className="w-4/12 p-2 ml-10 mt-10 card sm:p-8 text-primary-100">
        <h5 className="text-xl font-bold font-jose">{handle}</h5>
        <h5 className="text-xl font-bold font-jose">{score1}</h5>
        <p className="text-base font-jose">{pid}</p>
      </div>
      <img src='/images/avatar-left.png' alt='avtar head' className={`rounded-full filter drop-shadow-lg ${isButtonClicked ? 'translate-x-16 transition-transform' : ''
        }`} width={225} height={225} />
      <div className='self-center'>
        <h1 className="text-8xl mb-5 text-center font-extrabold tracking-tight leading-none customText font-vt">VS</h1>
        <button onClick={handleEvent} className='play-battle-btn font-jose'>BATTLE</button>
      </div>
      <img src='/images/avatar-right.png' alt='avtar head' className={`rounded-full filter drop-shadow-lg ${isButtonClicked ? '-translate-x-16 transition-transform' : ''
        }`} width={225} height={225} />
      <div className="w-4/12 p-2 mr-10 mt-10 card sm:p-8 text-primary-100">
        <h5 className="text-xl font-bold font-jose">{secondP}</h5>
        <h5 className="text-xl font-bold font-jose">{score2}</h5>
        <p className="text-base font-jose">{secondId}</p>
      </div>
    </div>
    </>
  )
}
export default Play