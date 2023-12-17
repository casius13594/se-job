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
    <div>
        <form className='w-1/2'>
            <label>
                <span>Name:</span>
                <input required 
                type = "text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                />
            </label>
        </form>
    </div>
  )
}

export default CreateForm