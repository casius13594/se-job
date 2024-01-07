"use client"
import Card from '@/components/DashBoard/card/card'
import React, { useEffect, useState } from 'react'
import styles from '@/components/DashBoard/dashbar.module.css'
import {
  getApplied,
  getJobOfEmployer,
  toggleJobStatus,
} from "@/components/controller";
import Guidance from '@/components/DashBoard/guidance/guidance';


interface Job {
  job_id: any;
  name: any;
  status: any;
  location: any;
  type: any;
  post_time: any;
  salary: any;
  experience: any;
}



const Page = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applicants, setApplicants] = useState<any[][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // New loading state
  const cards = [
    {
      id: 1,
      title: "Total Users",
      number: applicants.length,
      change: 12,
    },
    {
      id: 2,
      title: "Total Jobs",
      number: jobs.length,
      change: -2,
    }
  ];

  useEffect(() => {
    getJobOfEmployer(localStorage.getItem("current_user_id") || "")
      .then((jobs) => {
        if (jobs !== null) {
          setJobs(jobs);
        } else {
          setJobs([]);
          setIsLoading(false);
        }
      })
      .catch((error) => console.error(error));
      setIsLoading(false);
  }, []);

  useEffect(() => {
    getApplied(localStorage.getItem("current_user_id") || "")
      .then((applicants) => {
        setApplicants(applicants || []);
        setIsLoading(false); 
      })
      .catch((error) => console.error(error));
      setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
      <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <div className={styles.side}>
        <Guidance />
      </div>
      </div>
      </div>

  )
}
export default Page


