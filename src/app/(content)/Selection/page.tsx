'use client'

import React from 'react';
import Link from 'next/link';
import styles from '../Selection/monitor.module.css'
import { headerFont, dela_gothic_one, dm_sans } from "../Selection/fonts"

export default function Monitor() {
    const [employee, setEmployee] = React.useState(true);

    function clickEmployee()
    {
        setEmployee(true)
    }
    function clickEmployer()
    {
        setEmployee(false)
    }

    function chosenButton()
    {
        return (    
            <svg xmlns="http://www.w3.org/2000/svg" width="69" height="69" viewBox="0 0 69 69" fill="none">
                <path d="M69 34.5001C69 53.5539 53.5538 69.0001 34.5 69.0001C15.4462 69.0001 0 53.5539 0 34.5001C0 15.4463 15.4462 7.82476e-05 34.5 7.82476e-05C53.5538 7.82476e-05 69 15.4463 69 34.5001Z" fill="#114A15"/>
                <circle cx="35" cy="35" r="26" fill="#FBFBFB" fill-opacity="0.45"/>
            </svg>
        )
    }
    function unchosenButton()
    {
        return(
            <svg xmlns="http://www.w3.org/2000/svg" width="69" height="69" viewBox="0 0 69 69" fill="none">
                <path d="M69 34.5001C69 53.5539 53.5538 69.0001 34.5 69.0001C15.4462 69.0001 0 53.5539 0 34.5001C0 15.4463 15.4462 7.82476e-05 34.5 7.82476e-05C53.5538 7.82476e-05 69 15.4463 69 34.5001Z" fill="#CCCCCC"/>
                <circle cx="35" cy="35" r="26" fill="#F2F0F0"/>
            </svg>
        )
    }

    return(
        <main className = "flex max-width flex-col items-center space-y-12">
            <h1 className={`${styles.logo} ${headerFont.className} w-full px-6`}>
                Jelp
            </h1>
            <div onClick={clickEmployee} className = {`${ employee? styles.chosen : styles.unchosen}`}>
                <div className='flex flex-row justify-center items-center py-6 pr-12 pl-6'>
                    <button onClick={clickEmployee} className={styles.button}>
                        {
                            employee? chosenButton() : unchosenButton()
                        }
                    </button>

                    <h1 className={`${styles.bigText} ${dela_gothic_one.className} w-full text-center`}>
                        For Employee
                    </h1>
                </div>
                <div className={`${styles.smallText} ${dm_sans.className} columns-3 p-6`}>
                    <h1 className='text-center'>
                        Diversity
                    </h1>
                    <h1 className='text-center'>
                        Dinamic App
                    </h1>
                    <h1 className='text-center'>
                        Direct Contact
                    </h1>
                </div>
            </div>
            <div onClick={clickEmployer} className = {`${employee? styles.unchosen : styles.chosen}`}>
                <div className='flex flex-row justify-center items-center py-6 pr-12 pl-6'>
                    <button onClick={clickEmployer} className={styles.button}>
                        {
                            employee? unchosenButton() : chosenButton()
                        }
                    </button>
                    <h1 className={`${styles.bigText} ${dela_gothic_one.className} w-full text-center`}>
                        For Employer
                    </h1>
                </div>
                <div className={`${styles.smallText} ${dm_sans.className} columns-3 p-6`}>
                    <h1 className='text-center'>
                        Reliability
                    </h1>
                    <h1 className='text-center'>
                        Recruiting
                    </h1>
                    <h1 className='text-center'>
                        Initialize project
                    </h1>
                </div>
            </div>
            <Link href='/auth/Register'>    
                <button className={`${styles.submitButton}`}>
                    <h1 className={`${styles.submitButtonText} ${dm_sans.className}`}>
                        Start your business now
                    </h1>
                </button>
            </Link>
            <div className={`${dm_sans.className} flex flex-row space-x-4 pb-12`}>
                <h1 className={`${styles.greenText} `}>
                    Already have an account? 
                </h1>
                <Link href='/auth/Login' className={`${styles.loginText}`}>
                    Login
                </Link>
            </div>
        </main>
    ) 
  }