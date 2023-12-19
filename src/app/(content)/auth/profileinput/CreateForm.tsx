'use client';
import React from 'react'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import './Profile.css'; 
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Areaselector from '@/components/Areaselector';

const defaultformdata = {
    name: "",
    location: "",
    phone: "",
    url: "",
    inds: "",
    size: "",
    type: "",
}
const CreateForm = () => {
    const [formData, setFormData] = useState(defaultformdata)
    const { name, location, phone, url, inds,size, type } = formData
    const supabase = createClientComponentClient();
    const router = useRouter
    {/*const [name, setName] = useState('')
    const[location,setLocation] = useState('')
    const[phone, setPhone] = useState('')
    const[url,setUrl] = useState('')
    const[inds, setInds] = useState('')
    const[size, setSize] = useState('')
    const[type,setType] = useState('')*/}
    const[intro,setIntro] = useState('')
    const[isLoading, setIsLoading] = useState(false)

    console.log(formData)
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
    
        if (id === 'name') {
            const formattedName = value.toLowerCase().trim().replace(/\s+/g, '-');
            setFormData((prevState) => ({
                ...prevState,
                [id]: value,
                url: `jelp/company/${formattedName}`
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [id]: value
            }));
        }
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        console.log(formData)
        console.log(intro)
        const res = await supabase.auth.getUser();
        
        if (res.data.user?.id) {
            const existingUser = await supabase
            .schema("public")
            .from("Employer")
            .select("user_id")
            .eq("user_id", res.data.user.id)
            .single();
            
            if(existingUser.data)
            {
                await supabase
                .schema("public")
                .from('Employer')
                .update({
                    name: name,
                    verified: false,
                    location: location,
                    phone: phone,
                    url: url,
                    inds: inds,
                    size: size,
                    type: type,
                    description: intro
                    })
                .eq('user_id', res.data.user.id);
            }
            else{
                await supabase
                .schema("public")
                .from('Employer')
                .insert({
                    user_id: res.data.user.id,
                    name: name,
                    verified: false,
                    location: location,
                    phone: phone,
                    url: url,
                    inds: inds,
                    size: size,
                    type: type,
                    description: intro
                    });

            }
        }
        setFormData(defaultformdata)
    }
  return (
        <form className='ml-11 flex' onSubmit={handleSubmit}>
            <div className='left-column curved-box'>
            <div className='w-full flex flex-col items-start mb-4 '>
                <label htmlFor='name' className='font-bold'>
                Name <span className='text-red'>*</span>
                </label>
                <input required type = 'text' autoComplete='off'
                onChange={onChange}
                id = 'name'
                value={name}
                className='p-1 border rounded-md w-full'
                ></input>
            </div>
            {/*<div className='w-full flex flex-col items-start mb-4'>
            <label htmlFor='location' className='font-bold'>
                Location <span className='text-red'>*</span>
            </label>
            <input
                required
                type='text'
                autoComplete='off'
                id = 'location'
                onChange={onChange}
                value={location}
                className='p-1 border rounded-md w-full'
            ></input>
  </div>*/}

            <div className='w-full flex flex-col items-start mb-4'>
            <label htmlFor='phone' className='font-bold'>
                Phone <span className='text-red'>*</span>
            </label>
            <input
                required
                type='text'
                autoComplete='off'
                id = 'phone'
                onChange={onChange}
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
                id = 'url'
                onChange={onChange}
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
                id = 'inds'
                onChange={onChange}
                value={inds}
                className='p-1 border rounded-md w-full'
            ></input>
            </div>
            <div className='w-full flex flex-col items-start mb-4'>
                <label htmlFor='size' className='font-bold'>
                    Size <span className='text-red'>*</span>
                </label>
                <select
                    required
                    id='size'
                    onChange={onChange}
                    value={size}
                    className='p-1 border rounded-md w-full'
                >
                    <option value='' disabled>Select a Size Range</option>
                    <option value='0-10'>0 - 10</option>
                    <option value='10-50'>10 - 50</option>
                    <option value='50-100'>50 - 100</option>
                    <option value='100-500'>100 - 500</option>
                    <option value='500-1000'>500 - 1000</option>
                    <option value='1000-10000'>1000 - 10000</option>
                    <option value='10000++'>10000 ++</option>
                </select>
            </div>

            <div className='w-full flex flex-col items-start mb-4'>
                    <label htmlFor='type' className='font-bold'>
                        Type <span className='text-red'>*</span>
                    </label>
                    <select
                        required
                        id='type'
                        onChange={onChange}
                        value={type}
                        className='p-1 border rounded-md w-full'
                    >
                        <option value='' disabled>Select a Type</option>
                        <option value='Public company'>Public company</option>
                        <option value='Government agency'>Government agency</option>
                        <option value='Privately held'>Privately held</option>
                        <option value='Nonprofit'>Nonprofit</option>
                    </select>
                </div>
            </div>
            <div className='right-column'>
            <div className='w-full flex flex-col items-start mb-4'>
            <label htmlFor='location' className='font-bold'>
                Location <span className='text-red'>*</span>
            </label>
                    <Areaselector ></Areaselector>
                    </div>
            <div className='w-full flex flex-col items-start mb-4'>
            <label htmlFor='intro' className='font-bold'>
                Introduction <span className='text-red'>*</span>
            </label>
            <textarea
                autoComplete='off'
                onChange={(e) => setIntro(e.target.value)}
                value={intro}
                className='p-1 border rounded-md w-full'
            ></textarea>
            </div>
            <div className='w-full flex flex-col items-start mb-4'>
            I verify that I am an authorized representative of this organization and have the right to act on its behalf in the creation and management of this page. The organization and I agree to the additional terms for Pages.
                </div>
            <button className='flex flex-col items-start mb-4 curved-box' disabled = {isLoading}>
                {isLoading && <span> Applying ...</span>}
                {!isLoading && <span> Apply </span>}
            </button>
            </div>
        </form>
  )
}

export default CreateForm