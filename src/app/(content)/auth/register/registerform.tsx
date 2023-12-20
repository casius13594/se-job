"use client"
import Image from 'next/image';
import styles from './style/component.module.css';
import Link from 'next/link';
import * as z from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { signUpWithEmailAndPassword, signOutUser} from '@/app';
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSearchParams,useRouter } from 'next/navigation';
import { link } from 'fs';
import { MdOutlineAccountCircle } from "react-icons/md";
const userSchema = z
.object({
    email: z.string().min(1,'Email is required').email('Invalid email'),
    password: z
              .string()
              .min(1,'Password is required')
              .min(8,'Password must have than 8 characters'),
    confirm: z.string().min(1,'Password confirmation is required'), 
})
.refine((data) => data.confirm == data.password,{
  message: 'Password did not match',
  path:["confirm"],
});


export default function Register() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
			email: "",
			password: "",
			confirm: "",
		},
  });

  const handleGoogle = async () => {
    const res = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/joblist"
      }
    });
    if (res.error) {
      router.push("/register");
    }
};

  const onSubmit = async (data: z.infer<typeof userSchema>) =>{
    
      const result = await signUpWithEmailAndPassword(data);
      const {error} = JSON.parse(result);
      
      if(error?.message){
        if(error.email){
          setError("email",{
            type: "Server",
            message: error.email,
          });
        }else if (error.password){
          setError("password",{
            type:"Server",
            message: error.password,
          });
        }else if(error.confirm){
          setError("confirm",{
            type: "Server",
            message: error.confirm,
          });
        }else {
          alert("Something went wrong");
        }
      }else{
          signOutUser()
          router.push("../../auth/login");
      }
    

  }

  return (
    <main className="flex min-h-screen  items-center justify-between">
      <div className='flex min-h-screen flex-col min-w-full items-center '>
        <div className="relative top-0 left-0 flex border-b w-full items-end lg:static lg:h-auto lg:bg-none ">
            <Link href='/'>
              <Image
              src="/logo.svg"
              alt="Jelp logo"
              width="100"
              height="100"
              className="object-contain mx-7 mt-7 mb-2"
              />
            </Link>
        </div>
        
        <div className='relative flex flex-col bg-white shadow-2xl rounded-2x '>
          <div onSubmit= {handleSubmit(onSubmit)} className='flex flex-col justify-center p-8'>
            <div className='relative  flex pr-2 pl-2 items-center justify-center border-b border-black'>
              <button
              type='button'
              onClick={handleGoogle} 
              className=' w-full border border-gray-300 text-md p-2 rounded-lg mb-6 bg-[#1C7E75]  hover:bg-[#13544E] text-white font-semibold'>
                <img src='/iconGoogle.svg' alt ="img" className = "w-6 h-6 inline mr-2"></img>
                Connect via Google
              </button>
            </div> 
            
            <form onSubmit= {handleSubmit(onSubmit)} className='flex flex-col justify-center'>
            <div className="flex items-center mb-5 mt-5">
                <div className="absolute m-5 flex">
                  <Image src="/2User.svg" alt="Email" width={20} height={20} />
                  <div className="h-10 bg-black w-px ml-5"></div>
                </div>
                <input 
                  {...register("email")}
                  type="email" 
                  className="w-full pl-20 py-4 bg-[#D9D9D9] text-black text-opacity-50 lg:text-base md:text-sm sm:text-xs font-dmsans rounded-lg placeholder-black placeholder-opacity-50"
                  name='email'
                  id='email'
                  placeholder='Gmail'                 
                  >
                </input>
              </div>

              
              {errors.email && (
                  <p className='text-red font-semibold'>{`${errors.email.message}`}</p>
                )}

                <div className="flex items-center mb-5">
                                <div className="absolute m-5 flex">
                                  <Image src='/iconPassword.svg' alt="Email" width={20} height={20} />
                                  <div className="h-10 bg-black w-px ml-5"></div>
                                </div>
                <input 
                  {...register("password")}
                  type="password" 
                  className="w-full pl-20 py-4 bg-[#D9D9D9] text-black text-opacity-50 lg:text-base md:text-sm sm:text-xs font-dmsans rounded-lg placeholder-black placeholder-opacity-50"
                  name='password'
                  id='password'
                  placeholder='Password'
                  autoComplete='off'
                  >
                </input>
              </div>
              {errors.password && (
                  <p className='text-red font-semibold'>{`${errors.password.message}`}</p>
                )}
              
              <div className="flex items-center mb-5">
                                <div className="absolute m-5 flex">
                                  <Image src='/iconPassword.svg' alt="Email" width={20} height={20} />
                                  <div className="h-10 bg-black w-px ml-5"></div>
                                </div>
                <input 
                  {...register("confirm")}
                  type="password" 
                  className="w-full pl-20 py-4 bg-[#D9D9D9] text-black text-opacity-50 lg:text-base md:text-sm sm:text-xs font-dmsans rounded-lg placeholder-black placeholder-opacity-50"
                  name='confirm'
                  id='confirm'
                  placeholder='Re-enter'
                  autoComplete='off'
                  >
                </input> 
              </div>
              {errors.confirm && (
                  <p className='text-red font-semibold'>{`${errors.confirm.message}`}</p>
              )}
              
              <button
                type="submit"
                className='my-4 p-2 text-center rounded-2xl text-white font-semibold focus:outline-none bg-black opacity-20 hover:bg-black hover:opacity-100'>
                  Sign in
              </button>

              <div className='text-center text-black font-bold text-xs'>
                Already have an account? 
                <span className="font-semibold text-[#505050] text-opacity-70 hover:text-opacity-100"> <Link href='./login' >Log in now</Link></span>
              </div>

              

            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

