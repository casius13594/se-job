import Image from 'next/image'
import style from './style/component.module.css';
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen  items-center justify-between">
      <div className='flex min-h-screen flex-col min-w-full items-center '>
        <div className="relative top-0 left-0 flex w-full items-end lg:static lg:h-auto lg:bg-none p-2">
          <Link href="/">
            <Image src="/Jelp.png" alt="me" width="100" height="100" />
          </Link>
        </div>
        
        <div className='relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2x '>
          <div className='flex flex-col justify-center p-8 md:p-14'>
            <div className='relative  flex pr-2 pl-2 pb-2 items-center justify-center border-b border-black'>
              <button className=' w-full border border-gray-300 text-md p-2 rounded-lg mb-6 bg-[#1C7E75]  hover:bg-[#13544E] text-white font-semibold'>
                <img src='/iconGoogle.svg' alt ="img" className = "w-6 h-6 inline mr-2"></img>
                Connect via Google
              </button>
            </div> 

            <div className='p-1 mt-10 mb-2 items-center bg-[#D9D9D9] rounded-2xl'>
              <img src='/iconPassword.svg' className = " inline ml-2 mr-2 pr-2 border-r border-separate"></img>
              <input 
                type="text" 
                className='p-2 focus:outline-none focus:bg-[#D9D9D9] focus:text-gray-900 bg-[#D9D9D9] font-semibold'
                name='gmail'
                id='gmail'
                placeholder='Username or gmail'                  autoComplete='off'
                >
              </input> 
            </div>

            <div className='p-1 my-2 items-center bg-[#D9D9D9] rounded-2xl'>
              <img src='/iconPassword.svg' className = " inline ml-2 mr-2 pr-2 border-r border-separate"></img>
              <input 
                type="password" 
                className='p-2 focus:outline-none focus:bg-[#D9D9D9] focus:text-gray-900 bg-[#D9D9D9] font-semibold'
                name='password'
                id='password'
                placeholder='Password'
                autoComplete='off'
                >
              </input> 
            </div>
              
            <div className='p-1 my-2 items-center bg-[#D9D9D9] rounded-2xl'>
              <img src='/iconPassword.svg' className = " inline ml-2 mr-2 pr-2 border-r border-separate"></img>
              <input 
                type="password" 
                className='p-2 focus:outline-none focus:bg-[#D9D9D9] focus:text-gray-900 bg-[#D9D9D9] font-semibold'
                name='reEnter'
                id='re-enter'
                placeholder='Re-enter'
                autoComplete='off'
                >
              </input> 
            </div>

            
            <button className='my-4 p-2 text-center rounded-2xl text-white font-semibold focus:outline-none focus:bg-[#000000] items-center justify-center bg-[#000000] opacity-20 '>
                Sign in
            </button>

            <div className='text-center text-black font-bold text-xs'>
              Already have an account? 
              <span className="font-semibold text-[#505050] text-opacity-70"> Log in now</span>
            </div>

             

          </div>
        </div>
      </div>
    </main>
  )
}
