## Lens Phite
 - It's a Onchain Game in which your lens State acts as your score.
 - A game of Stat vs Stat for 2 Lens profiles to compete with the stat total they have on their Lens profile
 - Your total score depends on :
    - Your Posts
    - Your Following
    - Your Followers
 - We are fetching above data from a Lens oracle deployed on Phala Network.
 - A consumer contract is deployed on Polygon-Mumbai to fetch data from Lens Oracle(https://mumbai.polygonscan.com/address/0x8a0ed779d131dAe2Ca8b0a7606e02944Ee611F79) .
 - If your score is greater , you win.

 ## The winner's score is updated in a Unique Nft with onChain Score ,and everytime a user wins,the score is updated .
 - Collection : https://mumbai.polygonscan.com/token/0x16cb27eb3b6e2c3da78e08f54f41b329a6c0b1f3

 - The oponent is selected randomly .

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

