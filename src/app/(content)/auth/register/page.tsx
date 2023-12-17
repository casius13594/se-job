"use client"
import Image from 'next/image';
import styles from './style/component.module.css';
import Link from 'next/link';
import {createClient} from '@/utils/supabase/middleware';
import * as z from "zod";
import React from "react";
import { useForm } from "react-hook-form";
import { signUpWithEmailAndPassword } from '@/app';
import { zodResolver } from "@hookform/resolvers/zod";

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


export default function Home() {
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

  const onSubmit = async (data: z.infer<typeof userSchema>) =>{
    const result = await signUpWithEmailAndPassword(data);
    const {error} = JSON.parse(result);

    if(error?.message){
      if(error.email){
        setError("email",{
          type: "Server",
          message: error.email,
        });
      } else if (error.password){
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
    }

  }

  return (
    <main className="flex min-h-screen  items-center justify-between">
      <div className='flex min-h-screen flex-col min-w-full items-center '>
        <div className="relative top-0 left-0 flex border-b border-black w-full items-end lg:static lg:h-auto lg:bg-none ">
            <Link href='/'>
              <Image
              src="/logo.svg"
              alt="Jelp logo"
              width="125"
              height="125"
              className="object-contain mx-7 mt-7 mb-2"
              />
            </Link>
        </div>
        
        <div className='relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2x '>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center p-8 md:p-14'>
            <div className='relative  flex pr-2 pl-2 pb-2 items-center justify-center border-b border-black'>
              <button className=' w-full border border-gray-300 text-md p-2 rounded-lg mb-6 bg-[#1C7E75]  hover:bg-[#13544E] text-white font-semibold'>
                <img src='/iconGoogle.svg' alt ="img" className = "w-6 h-6 inline mr-2"></img>
                Connect via Google
              </button>
            </div> 

            <div className='p-1 mt-10 mb-2 items-center bg-[#D9D9D9] rounded-2xl'>
              <img src='/iconPassword.svg' className = " inline ml-2 mr-2 pr-2 border-r border-separate"></img>
              <input 
                {...register("email")}
                type="email" 
                className='p-2 focus:outline-none focus:bg-[#D9D9D9] focus:text-gray-900 bg-[#D9D9D9] font-semibold'
                name='email'
                id='email'
                placeholder='Username or gmail'                  autoComplete='off'
                >
              </input>
            </div>
            {errors.email && (
                <p className='text-red font-semibold'>{`${errors.email.message}`}</p>
              )}

            <div className='p-1 my-2 items-center bg-[#D9D9D9] rounded-2xl'>
              <img src='/iconPassword.svg' className = " inline ml-2 mr-2 pr-2 border-r border-separate"></img>
              <input 
                {...register("password")}
                type="password" 
                className='p-2 focus:outline-none focus:bg-[#D9D9D9] focus:text-gray-900 bg-[#D9D9D9] font-semibold'
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
            
            <div className='p-1 my-2 items-center bg-[#D9D9D9] rounded-2xl'>
              <img src='/iconPassword.svg' className = " inline ml-2 mr-2 pr-2 border-r border-separate"></img>
              <input 
                {...register("confirm")}
                type="password" 
                className='p-2 focus:outline-none focus:bg-[#D9D9D9] focus:text-gray-900 bg-[#D9D9D9] font-semibold'
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
              className='my-4 p-2 text-center rounded-2xl text-white font-semibold focus:outline-none focus:bg-[#000000] items-center justify-center bg-[#000000] opacity-20 '>
                Sign in
            </button>

            <div className='text-center text-black font-bold text-xs'>
              Already have an account? 
              <span className="font-semibold text-[#505050] text-opacity-70"> Log in now</span>
            </div>

             

          </form>
        </div>
      </div>
    </main>
  )
}

