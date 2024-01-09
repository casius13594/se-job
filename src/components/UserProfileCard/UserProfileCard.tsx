'use client';
import React from 'react'
import './UserProfileCard.css'
import Image from 'next/image';
const UserProfileCard = () => {
  return (
    <div className='upc'>
        <div className='gradient'></div>
        <div className='profile-down'>
            <img src = '/logo.svg' alt = ''></img>
            <div className='profile-title'>Member name</div>
        </div>
    </div>
  )
}

export default UserProfileCard