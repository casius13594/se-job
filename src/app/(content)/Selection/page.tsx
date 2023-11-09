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
            <svg xmlns="http://www.w3.org/2000/svg" width="3.5vw" height="3.5vw" viewBox="0 0 69 69" fill="none">
                <path d="M69 34.5001C69 53.5539 53.5538 69.0001 34.5 69.0001C15.4462 69.0001 0 53.5539 0 34.5001C0 15.4463 15.4462 7.82476e-05 34.5 7.82476e-05C53.5538 7.82476e-05 69 15.4463 69 34.5001Z" fill="#114A15"/>
                <circle cx="35" cy="35" r="26" fill="#FBFBFB" fill-opacity="0.45"/>
            </svg>
        )
    }
    function unchosenButton()
    {
        return(
            <svg xmlns="http://www.w3.org/2000/svg" width="3.5vw" height="3.5vw" viewBox="0 0 69 69" fill="none">
                <path d="M69 34.5001C69 53.5539 53.5538 69.0001 34.5 69.0001C15.4462 69.0001 0 53.5539 0 34.5001C0 15.4463 15.4462 7.82476e-05 34.5 7.82476e-05C53.5538 7.82476e-05 69 15.4463 69 34.5001Z" fill="#CCCCCC"/>
                <circle cx="35" cy="35" r="26" fill="#F2F0F0"/>
            </svg>
        )
    }

    return( 
        <main className = "flex flex-col min-h-screen max-h-screen h-full items-center space-y-[2vw]">
            <h1 className={`${styles.logo} ${headerFont.className} w-full px-[1vw]`}>
                Jelp
            </h1>
            <div 
            onClick={clickEmployee} 
            className = {`flex flex-row ${ employee? styles.chosen : styles.unchosen}`}>
                <div className='flex flex-col w-full h-full'>
                    <div className='flex flex-row justify-center items-center py-[1vw] pr-[2vw] pl-[1vw]'>
                        <button onClick={clickEmployee} className={styles.button}>
                            {
                                employee? chosenButton() : unchosenButton()
                            }
                        </button>

                        <h1 className={`${styles.bigText} ${dela_gothic_one.className} w-full text-center`}>
                            For Employee
                        </h1>
                    </div>
                    <div className={`${styles.smallText} ${dm_sans.className} columns-3 p-[1vw]`}>
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
            </div>
            <div onClick={clickEmployer} className = {`${employee? styles.unchosen : styles.chosen}`}>
                <div className='flex flex-row justify-center items-center py-[1vw] pr-[2vw] pl-[1vw]'>
                    <button onClick={clickEmployer} className={styles.button}>
                        {
                            employee? unchosenButton() : chosenButton()
                        }
                    </button>
                    <h1 className={`${styles.bigText} ${dela_gothic_one.className} w-full text-center`}>
                        For Employer
                    </h1>
                </div>
                <div className={`${styles.smallText} ${dm_sans.className} columns-3 p-[1vw]`}>
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
            <Link 
            href='/auth/Register'
            className={`${styles.submitButton} text-center`}
            >    
                <button className={`${styles.submitButton} text-center`}>
                    <h1 className={`${styles.submitButtonText} ${dm_sans.className} text-center`}>
                        Start your business now
                    </h1>
                </button>
            </Link>
            <div className={`${dm_sans.className} flex flex-row space-x-[0.5vw] pb-[2vw]`}>
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