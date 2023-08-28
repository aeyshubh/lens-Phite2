import type { NextPage } from 'next';
import Link from 'next/link';
import { usePrepareContractWrite, useContractWrite,  useWaitForTransaction } from 'wagmi'
import {abi4} from '../utils/message'

const Home: NextPage = () => {

  return (
    <>
      <section className="bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white ">Battle for the <span className='font-vt text-[#f1c40f] text-7xl'>Lens Stats</span></h1>
                <p className="max-w-2xl mb-6 font-normal text-gray-400 lg:mb-8 md:text-lg lg:text-xl">Take a look at who your competitor is, the more stats you have on lens, the more chance for you win in every game.</p>
                <button className='index-battle-btn font-jose'>
                <Link href={'/play'}>
                    Go for Battle 
                </Link>
                </button> 
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img src="/images/lens_logo_edited.png" alt="hero image" width={500} height={300}/>
            </div>                
        </div>
      </section>
    </>

  );
};

export default Home;