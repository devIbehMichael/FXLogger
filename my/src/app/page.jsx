import Image from "next/image";
import Link from 'next/link'
import img2 from './fonts/img2.png'
export default function Home() {
  return (
    <div className=" font-title bg-cover  bg-no-repeat" style={{backgroundImage:`url(${img2.src})`}}>
      <div className="flex flex-col justify-center items-center min-h-screen gap-4 w-4/5 m-auto text-white">
<h1 className="text-[6vw] sm:">Welcome to FXLogger!</h1>
<h3 className="text-center lg:text-2xl max-md:text-sm">
Get ready to take control of your trading journey. FXLogger empowers you to stay accountable, track your trades, and refine your strategies like never before. Let’s log your way to success!</h3>
<Link href='/inputs'>
<button className="bg-gradient-to-r from-cyan-950 to-green-500 p-3 text-white rounded-lg shadow-xl text-[1.9vw] hover:text-black delay-75 ease-in-out">Start logging Now</button></Link>
</div>
    </div>
  );
}