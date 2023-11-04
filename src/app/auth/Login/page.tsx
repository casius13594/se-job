import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image'

interface CredentialsFormProps {
  csrfToken?: string;
}

export function CredentialsForm(props: CredentialsFormProps){
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
  };
return (
  <div className="w-full flex flex-col items-center min-h-screen py-2">
      <div className="flex flex-col items-center w-1/3">
        <h1 className="mt-10 mb-5 text-base font-bold text-[#AD343E]">Welcome back! <span className="text-black">Log in Jelp</span></h1>
        {/* <GoogleSignInButton/> */}
        <form className="w-full text-xl text-black font-semibold flex flex-col" onSubmit={handleSubmit}>
    {error && (
      <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded-md">
        {error}
      </span>
    )}
    <div className='flex items-center mb-5'>
      <div className='absolute m-5 flex'>
        <Image src="/2User.svg" alt="Email" width={20} height={20} />
        <div className="h-10 bg-black w-px ml-5"></div>
      </div>
      <input type='email' name='email' placeholder='Email or account' required className='w-full pl-20 py-4 bg-[#D9D9D9] text-black text-opacity-50 lg:text-base md:text-sm sm:text-xs font-bold rounded-lg placeholder-black placeholder-opacity-50'/>
    </div>
    <div className='relative items-center'>
      <input type='password' name='password' placeholder='Password' required className='w-full pl-20 py-4 bg-[#D9D9D9] text-black text-opacity-50 text-base font-bold rounded-lg placeholder-black placeholder-opacity-50'/>
      <Image src="/Show.svg" alt="Show" width={20} height={20} className='absolute m-5 top-0 -right-3'/>
      <div className='absolute mx-5 my-2 flex top-0'>
        <Image src="/Password.svg" alt="Password" width={20} height={20} />
        <div className="h-10 bg-black w-px ml-5"/>
      </div>
    </div>
    <button className='text-base text-black text-opacity-50 ml-auto w-fit my-3'>Forgot password</button>
    <button type='submit' className="w-full h-12 px-6 text-base font-bold text-white bg-[#13544E] rounded-lg focus:shadow-outline">
      Log in
    </button>
    <div className="h-px bg-black w-full my-7" />
    <div className='relative mb-5'>
    <button type='submit' className="w-full h-12 px-6 text-base font-bold text-white bg-[#13544E] rounded-lg focus:shadow-outline">
      Connect via Google
    </button>
      <Image src="/google.png" alt="google" width={30} height={30} className='absolute top-0 m-2'/>
    </div>
  </form>
        <h1 className="mt-5 text-base font-bold text-[#AD343E]">New member? <span className="text-black text-opacity-50">Create account here</span></h1>
      </div>
    </div>
);
}