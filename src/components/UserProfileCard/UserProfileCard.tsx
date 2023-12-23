'use client';
import React from 'react'
import './UserProfileCard/UserProfileCard.css'
const UserProfileCard = () => {
  return (
    <div className='upc'>
        <div className='gradient'></div>
        <div className='profile-down'>
            <img src = 'logo.svg' alt = ''></img>
            <div className='profile-title'>Member name</div>
            <div className='profile-description'>I am sth</div>

        </div>
    </div>
  )
}

export default UserProfileCard