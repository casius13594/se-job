import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthProviders from "../authproviders";
import Image from 'next/image'

interface CredentialsFormProps {
  csrfToken?: string;
}

export function CredentialsForm(props: CredentialsFormProps){
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async () => {
  };
  return (
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
        <input type='email' name='email' placeholder='Email or account' required className='w-full pl-20 py-4 bg-[#D9D9D9] text-black text-opacity-50 lg:text-base md:text-sm sm:text-xs font-dmsans rounded-lg placeholder-black placeholder-opacity-50' />
      </div>
      <div className='relative items-center place-content-center'>
        <input type={showPassword ? 'text' : 'password'} name='password' placeholder='Password' required className='w-full pl-20 py-4 bg-[#D9D9D9] text-black text-opacity-50 text-base font-dmsans rounded-lg placeholder-black placeholder-opacity-50 focus:outline' />
        
        <div className='absolute flex w-8 h-1/2 -top-1 m-5 bg-blend-overlay bg-[#D9D9D9] -right-3 justify-center'>
        {showPassword ? <button type='button' onClick={togglePasswordVisibility}>
          <Image src="/hide.svg" alt="Show" width={20} height={20}/> </button> :
          <button type='button' onClick={togglePasswordVisibility} >
            <Image src="/show.svg" alt="Show" width={20} height={20}/> </button>
        }
        </div>
        
        <div className='absolute mx-5 my-2 flex top-0'>
          <Image src="/password.svg" alt="Password" width={20} height={20} />
          <div className="h-10 bg-black w-px ml-5" />
        </div>
      </div>
      <button className='text-base text-black text-opacity-50 font-dmsans ml-auto w-fit my-3 hover:underline underline-offset-2'>Forgot password</button>
      <button type='submit' className="w-full h-12 px-6 text-base font-dmsans text-white bg-[#13544E] rounded-lg focus:shadow-outline">
        Log in
      </button>
      <div className="h-px bg-black w-full my-7" />
      <AuthProviders />
    </form>
  );
}