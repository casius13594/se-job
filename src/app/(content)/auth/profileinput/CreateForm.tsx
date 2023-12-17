'use client';
import React from 'react'
import { useRouter } from 'next/router';
import { useState } from 'react';
const CreateForm = () => {
    const router = useRouter
    const [name, setName] = useState('')
    const[location,setLocation] = useState('')
    const[phone, setPhone] = useState('')
    const[url,setUrl] = useState('')
    const[inds, setInds] = useState('')
    const[size, setSize] = useState('')
    const[type,setType] = useState('')
    const[intro,setIntro] = useState('')
  return (
        <form className='w-1/2  ml-11'>
            <div className='w-full flex flex-col items-start mb-4'>
                <label htmlFor='name' className='font-bold'>
                Name <span className='text-red'>*</span>
                </label>
                <input required type = 'text' autoComplete='off'
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='p-1 border rounded-md w-full'
                ></input>
            </div>
            <div className='w-full flex flex-col items-start mb-4'>
            <label htmlFor='location' className='font-bold'>
                Location <span className='text-red'>*</span>
            </label>
            <input
                required
                type='text'
                autoComplete='off'
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                className='p-1 border rounded-md w-full'
            ></input>
            </div>

            <div className='w-full flex flex-col items-start mb-4'>
            <label htmlFor='phone' className='font-bold'>
                Phone <span className='text-red'>*</span>
            </label>
            <input
                required
                type='text'
                autoComplete='off'
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className='p-1 border rounded-md w-full'
            ></input>
            </div>

            <div className='w-full flex flex-col items-start mb-4'>
            <label htmlFor='url' className='font-bold'>
                URL <span className='text-red'>*</span>
            </label>
            <input
                required
                type='text'
                autoComplete='off'
                onChange={(e) => setUrl(e.target.value)}
                value={url}
                className='p-1 border rounded-md w-full'
            ></input>
            </div>

            <div className='w-full flex flex-col items-start mb-4'>
            <label htmlFor='inds' className='font-bold'>
                Industry <span className='text-red'>*</span>
            </label>
            <input
                required
                type='text'
                autoComplete='off'
                onChange={(e) => setInds(e.target.value)}
                value={inds}
                className='p-1 border rounded-md w-full'
            ></input>
            </div>

            <div className='w-full flex flex-col items-start mb-4'>
            <label htmlFor='size' className='font-bold'>
                Size <span className='text-red'>*</span>
            </label>
            <input
                required
                type='text'
                autoComplete='off'
                onChange={(e) => setSize(e.target.value)}
                value={size}
                className='p-1 border rounded-md w-full'
            ></input>
            </div>

            <div className='w-full flex flex-col items-start mb-4'>
            <label htmlFor='type' className='font-bold'>
                Type <span className='text-red'>*</span>
            </label>
            <input
                required
                type='text'
                autoComplete='off'
                onChange={(e) => setType(e.target.value)}
                value={type}
                className='p-1 border rounded-md w-full'
            ></input>
            </div>
        </form>
  )
}

export default CreateForm