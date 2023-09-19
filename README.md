## Lens Phite V2 with On-Chain Notifications , Score Nft and Super Powers .
![image](https://github.com/aeyshubh/lens-Phite2/assets/50445649/cb8c7372-0fcf-46f4-8c00-601d813cdcff)

- **[Youtube Demo]**(https://youtu.be/LESljBVa3OQ)
 - It's a Onchain Game in which your lens State acts as your score.
 - After Every Match a Notification is sent about the Match Result into the Push Channel about the winner)
 - -- Channel Address of **Live Push Channel**(https://staging.push.org/)(0x0dDda6871f1216D7EF56722167652e4F881d74Aa)
![notif](https://github.com/aeyshubh/lens-Phite2/assets/50445649/8cda269b-cc80-4ff4-8bc1-f99c80f4ea61)

 - The Notification includes the Winner's Name,his Special power and his Score.
 - Now Lens Phite comes with Special Powers and Attacks fetched from API created by me through **Phala Network** .
![nft](https://github.com/aeyshubh/lens-Phite2/assets/50445649/b0a4defe-df46-42f0-87e7-81ebb6687e1d)

 - We are storing Attack Data Off-Chain to **save storage and cost** and then getting it on-Chain to perform various operations.
 - A game of Stats vs Stats for 2 Lens profiles to compete with the stat total they have on their Lens profile
 - Your total score depends on :
    - Your Posts
    - Your Following
    - Your Followers
 - You will be selecting one Nature of your character:
    - Earth , Water , Fire , Nature.
 - You can have 3 scores to Fight your opponent in the Fight.
    - Attack 1,Attack 2, Attack 3
  
 - We are fetching above data from a Lens oracle deployed on Phala Network with Lens Api and a Private Api created by me to store Off Chain Data..
 - A consumer contract is deployed on Polygon-Mumbai to fetch data from Lens Oracle .
 - [Polygon Consumer Contract](https://mumbai.polygonscan.com/address/0x3f235D6A85b138025037E211862A57433d5AC467) .
 - [Phala Dashboard](https://bricks-poc5.phala.network/workflows/0x4082228ace11b8d01982e03d6af89189bc73018305a53819f782697cf1aac453/2)
 - If your score is greater and Your Powers are good Enough, you win.
![stats](https://github.com/aeyshubh/lens-Phite2/assets/50445649/ba5230cd-b72e-4467-b491-3eb2c28f8570)


 ## The winner's score is updated in a Unique Nft with onChain Score ,and everytime a user wins,the score is updated .
 - OpenSea-Collection of Nfts : (https://testnets.opensea.io/collection/chain-battles-275)
 - [On-Chain Nft as Score Proof of Winning]![nft](https://github.com/aeyshubh/lens-Phite2/assets/50445649/933f9fe8-1b55-4dca-b480-b70ffe24a6d8)
 - The opponent is selected randomly .

## Instructions : 
This is a [RainbowKit](https://rainbowkit.com) + [wagmi](https://wagmi.sh) + [Next.js](https://nextjs.org/) project bootstrapped with [`create-rainbowkit`](https://github.com/rainbow-me/rainbowkit/tree/main/packages/create-rainbowkit).

## Getting Started

First, Install packages:
```bash
npm install
```
run server :

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

