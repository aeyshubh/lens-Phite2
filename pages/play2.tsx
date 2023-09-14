'use client'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useState } from 'react';
import { useAccount } from 'wagmi'
import { abi2 } from '../utils/lensOracle'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { abi4 } from '../utils/message';
import useWindowSize from 'react-use/lib/useWindowSize'
import 'dotenv/config';

function Play() {
  require('dotenv').config()
  const [handle, setHandle] = useState('');
  const [pid, setId] = useState('');
  const [score1, setScore1] = useState(0);
  const { width, height } = useWindowSize()
  // Animation and battle function
  const abi_OueryOracle = abi2;
  const contractAddress_OueryOracle = '0x7cB6d43f344245BF480C4a931894cc4e68834795';
//const users = ["0x02","0x8fef", "0x7a"];
  // const { address, isConnected, isDisconnected } = useAccount();
  // const address = data?.address;
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
    if (score2 == 0) {
      fetchProfiles()
    } else {
      mintNft();
    }

  }, [score2])

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
    //var contract = "0xa6ca3642794a03bf4f13dd404571da2dae29916d";
      const provider2 = new ethers.providers.WebSocketProvider(`wss://frequent-solitary-cherry.matic-testnet.discover.quiknode.pro/d4eddd3fb5a80ca6014416b9f38fdac88d9333a2/`)
      const contractRead = new ethers.Contract(contractAddress_OueryOracle, abi2, provider2);
      contractRead.on('ResponseReceived', (id, pair, value) => {
        var score = parseInt(value._hex, 16);
        console.log("Idd:", id, "pair", pair, "score", score);
        if (pair == pid && score1 == 0) {

          setScore1(score);
          console.log("Socre1:", score1);

        }

      })
    };

  const fetchProfiles = async () => {
    try {
      console.log(`key is ${process.env.REACT_QUICKNODE}`)
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

    const nftContract = "0x16cb27EB3B6e2c3dA78e08f54F41b329a6C0B1F3"
    const contractWrite2 = new ethers.Contract(nftContract, abi4, signer);
    //console.log("Adderss 2nd",secondAddress);
    setProfile("oo");
    if (score1 > score2 && score2 != 0) {
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
    if (score1 == score2 && score1 != 0) {
      console.log("That's a Draw")
      alert("That's a Draw");

      const writen2 = await contractWrite2.train();
      const writen3 = await contractWrite2.trainop(secondAddress, { gasLimit: 5000000 });

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
    if (score2 > score1) {
      console.log('Player 2 is winner')
      alert("Winner is Player 2");

      console.log("Address 2nd :", secondAddress);

      const writen3 = await contractWrite2.trainop(secondAddress, { gasLimit: 5000000 });
      console.log("Hash 3", writen3.hash);
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
          <h5 className="text-xl font-bold font-jose max-w-[20%]">{handle}</h5>
          <h5 className="text-xl font-bold font-jose">{score1}</h5>
          <p className="text-base font-jose">{pid}</p>
        </div>
        <img src='/images/avatar-left.png' alt='avtar head' className={`rounded-full filter drop-shadow-lg ${isButtonClicked ? 'translate-x-16 transition-transform' : ''
          }`} width={225} height={225} />
        <div className='self-center'>
          <h1 className="text-8xl mb-5 text-center font-extrabold tracking-tight leading-none customText font-vt">VS</h1>
          <button onClick={handleEvent} className='play-battle-btn font-jose'>BATTLE</button>
        </div>
      </div>
    </>
  )
}
export default Play