'use client'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useState } from 'react';
import { useAccount } from 'wagmi'
import { abi2 } from '../utils/lensOracle';
import {ethers } from "ethers";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { abi4 } from '../utils/message';
import 'dotenv/config';
import * as PushAPI from "@pushprotocol/restapi";
const buttonClickSound = '/sounds/smb_coin.mp3';

function Play() {
  const PK = '77ac6148efe43ae3797aed90c7e50c7c4c1c656b9f302fdd30284f0f74cef603'; // channel private key
const Pkey = `0x${PK}`;
const _signer = new ethers.Wallet(Pkey);

  require('dotenv').config()
  const [handle, setHandle] = useState('');
  const [pid, setId] = useState('');
  const [profile, setProfile] = useState('');
  const [secondP, setsecondP] = useState('');
  const [secondId, setsecondId] = useState('');
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
const [a1,seta1] = useState(0);
const [a2,seta2] = useState(0);
const [a3,seta3] = useState(0);

const [a4,seta4] = useState(0);
const [a5,seta5] = useState(0);
const [a6,seta6] = useState(0);

const [n1,setn1] = useState('');
const [n2,setn2] = useState('');


  const [winner, setWinner] = useState(false);
  const [secondAddress, setSecondAddress] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  // Animation and battle function
  const abi_OueryOracle = abi2;
  const contractAddress_OueryOracle = '0x72479FBcF03C749D7687000a403Db2061c8cc475';


  const playedOnce = 0;
let a:any = 'staging;'
  const sendNotification = async(p1:string,p2:string,_n1:string,_s1:string) => {
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer: _signer,
        type: 1, // broadcast
        identityType: 2, // direct payload
        notification: {
          title: `Lens Phite Match Results`,
          body: `We just had a Fight in Lens Phite`
        },
        payload: {
          title: `Lens Phite Results`,
          body: `${p1} WON against ${p2} with ${_n1} Powers and ${_s1}`,
          cta: '',
          img: ''
        },
        channel: 'eip155:5:0x82a7A0828fa8EB902f0508620Ee305b08634318A',
        env: 'staging',
      });
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  //const users = ["0x01", "0x7a", "0x8fef", "0x02", "0x015", "0x3aed", "0x06", "0x0202"]
  const users = ["0x8fef","0x7a","0x3aed"]
  //const users = ["0x02","0x8fef", "0x7a"];
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
    if(score2 ==0){
      fetchProfiles(),
      fetchSecondProfile()
    }

  }, [score2])
const specialAttacks = async() =>{
  provider = new ethers.providers.Web3Provider(window.ethereum);
  provider.send('eth_requestAccounts', []);
  signer = provider.getSigner();

  const nftContract = "0xd9f4BC1A565646D7F737265dabD9631FC5Cd7994"
  const contractWrite2 = new ethers.Contract(nftContract, abi4, signer);

  setIsButtonClicked(true);
  setTimeout(() => {
    setIsButtonClicked(false);
  }, 1000);
  let temp;

  alert("------Score Updated-------")
  if(n1 == 'Fire' && n2 == 'Water'){
    alert("Giving 1000 HP to Player 1 due to Power")
    temp = 1000 + Number(a1)+ Number(a2)+ Number(a3);
    alert(`Special Attack Score = ${temp}`);
    if(temp>score2){
      alert("Player 1 Wins with Special powers");
     const writen3 = await contractWrite2.trainop(address, { gasLimit: 5000000 });
      console.log("Hash 3", writen3.hash);
       sendNotification(handle,secondP,n1,temp)
    }else{
      alert("Player 2 Wins");
      setScore1(temp-score1)
      const writen3 = await contractWrite2.trainop(secondAddress, { gasLimit: 5000000 });
      console.log("Hash 3", writen3.hash);
      sendNotification(secondP,handle,n2,score2.toString())

    }
  }
  if(n1 == 'Earth' && n2 == 'Fire'){
    alert("Giving 1000 HP to Player 1 Due to Power")
    temp = 1000+Number(a1)+ Number(a2)+ Number(a3);
    alert(`Special Attack Score = ${temp}`);
    if(temp>score2){
      alert("Player 1 Wins with Special powers");
     const writen3 = await contractWrite2.trainop(address, { gasLimit: 5000000 });
      console.log("Hash 3", writen3.hash);
       sendNotification(handle,secondP,n1,temp)
    }else{
      alert("Player 2 Wins");
      setScore1(temp-score1)
      const writen3 = await contractWrite2.trainop(secondAddress, { gasLimit: 5000000 });
      console.log("Hash 3", writen3.hash);
      sendNotification(secondP,handle,n2,score2.toString())

    }
  }
  
}
  const handleEvent = async () => {
    setIsButtonClicked(true);
    setTimeout(() => {
      setIsButtonClicked(false);
    }, 1000);
    try{
    provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send('eth_requestAccounts', []);
    signer = provider.getSigner();
    contractWrite = new ethers.Contract(contractAddress_OueryOracle, abi_OueryOracle, signer);

    console.log("Id 1 :", pid);
    await provider.send('eth_requestAccounts', []);
    const writen = await contractWrite.request(pid);
    console.log("Written One" + writen.hash);

    console.log("Id2 : ", secondId);
    const writen2 = await contractWrite.request(secondId);
    console.log("Written Two " + writen2.hash);
    //var contract = "0xa6ca3642794a03bf4f13dd404571da2dae29916d";
    const provider2 = new ethers.providers.WebSocketProvider(`wss://frequent-solitary-cherry.matic-testnet.discover.quiknode.pro/d4eddd3fb5a80ca6014416b9f38fdac88d9333a2/`)
    const contractRead = new ethers.Contract(contractAddress_OueryOracle, abi2, provider2);
    contractRead.on('ResponseReceived', async (id, pair, value,s1,s2,s3,nature) => {
      var score = parseInt(value._hex, 16);
      console.log("Idd:", id, "pair", pair, "score", score,"s1",s1,"s2",s2,"nature",nature);
      
      if (pair == pid && score1 == 0) {

        setScore1(score);
        setn1(nature);
        seta1(parseInt(s1._hex, 16))
        seta2(parseInt(s2._hex, 16))
        seta3(parseInt(s3._hex, 16))
        console.log("Socre1:", score1);

      }
      if (pair == secondId && score2 == 0) {

        await setScore2(score)
        console.log("Socre2:", score2);
        setn2(nature);
        seta4(parseInt(s1._hex, 16))
        seta5(parseInt(s1._hex, 16))
        seta6(parseInt(s1._hex, 16))

        // mintNft();

/*         contractRead.off('ResponseReceived', (id, pair, value,s1,s2,s3,nature))
 */
      }
    

    })
  }catch(error){
    console.log("erros sporrted",error);
    }
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
        //console.log("second Player", value.data.profile.handle);
        setsecondP(value.data.profile.handle);
        setsecondId(profile)
        setSecondAddress(value.data.profile.ownedBy)

      })
      //console.log(address)

    } catch (err) {
      console.log({ err })
    }
  }

  async function mintNft() {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send('eth_requestAccounts', []);
    signer = provider.getSigner();

    const nftContract = "0xd9f4BC1A565646D7F737265dabD9631FC5Cd7994"
    const contractWrite2 = new ethers.Contract(nftContract, abi4, signer);
    //console.log("Adderss 2nd",secondAddress);
    if (score1 > score2 && score2 != 0) {
      console.log('Player 1 is winner')
      alert("Winner is Player 1");
      const writen2 = await contractWrite2.train();
    }
    if (score1 == score2 && score1 != 0) {
      console.log("That's a Draw")
      alert("That's a Draw");

      const writen2 = await contractWrite2.train();
      const writen3 = await contractWrite2.trainop(secondAddress, { gasLimit: 5000000 });
    }
    if (score2 > score1) {
      alert("Player 2 has higher scores,use Special attacks");
      setScore2(score2-score1);
      alert("-------Score Updated-------");
      setScore1(0);

    }
  }

  return (
    <>

      <div className="w-9/12 h-4/6 mt-6 flex items-start justify-between bg-black bg-[url('/images/battle-arena.png')] bg-[77%]">

        {/*     {winner && <Confetti
      width={width}
      height={height}
    />} */}
        <div className="w-4/12 p-2 ml-10 mt-10 card sm:p-8 text-primary-100">
          <h5 className="text-xl font-bold font-jose max-w-[20%]">{handle}</h5>
          <h5 className="text-xl font-bold font-jose">{score1}</h5>
          <p className="text-base font-jose">{pid}</p>
          <p className="text-base font-jose">Nature: {n1}</p>
          <p className="text-base font-jose">Attack 1  {a1}</p>
          <p className="text-base font-jose">Attack 2  {a2}</p>
          <p className="text-base font-jose">Attack 3 {a3}</p>

        </div>
        <img src='/images/avatar-left.png' alt='avtar head' className={`rounded-full filter drop-shadow-lg ${isButtonClicked ? 'translate-x-16 transition-transform' : ''
          }`} width={225} height={225} />
        <div className='self-center'>
          <h1 className="text-8xl mb-5 text-center font-extrabold tracking-tight leading-none customText font-vt">VS</h1>
          <button onClick={handleEvent} className='play-battle-btn font-jose'>BATTLE</button>
          <button onClick={specialAttacks} className='play-battle-btn font-jose'>Use Attacks</button>

        </div>
        <img src='/images/avatar-right.png' alt='avtar head' className={`rounded-full filter drop-shadow-lg ${isButtonClicked ? '-translate-x-16 transition-transform' : ''
          }`} width={225} height={225} />
        <div className="w-4/12 p-2 mr-10 mt-10 card sm:p-8 text-primary-100">
          <h5 className="text-xl font-bold font-jose max-w-[20%]">{(secondP)}</h5>
          <h5 className="text-xl font-bold font-jose">{score2}</h5>
          <p className="text-base font-jose">{secondId}</p>
          <p className="text-base font-jose">Nature: {n2}</p>
          <p className="text-base font-jose">Attack 1  {a4}</p>
          <p className="text-base font-jose">Attack 2  {a5}</p>
          <p className="text-base font-jose">Attack 3 {a6}</p>
        </div>
      </div>
    </>
  )
}
export default Play
