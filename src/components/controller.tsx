"use server";

import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import { UserResponse } from "@supabase/supabase-js";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Jobapplied } from "./cardjobapplied";
import { IState } from "country-state-city";
import { boolean } from "zod";
import { Interface } from "readline";

export async function getJob(formData: FormData) {
  "use server";
  // get user
  // const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies });
  // filter value
  const location = formData.get("location") as string;
  const type = formData.get("type") as string;
  const experience = formData.get("experience") as string;
  const salary = formData.get("salary") as string;
  // compose query
  let query = supabase
    .from("Job")
    .select(
      "job_id, name, employer_name, employer_logo, location, type, post_time, salary, experience"
    )
    .eq("status", "open");
  if (location != "All") {
    query = query.eq("location", location);
  }
  if (type != "%") {
    query = query.eq("type", type);
  }
  if (experience != "%") {
    query = query.eq("experience", experience);
  }
  if (salary != "%") {
    query = query.eq("salary", salary);
  }
  // get job
  const { data: jobs, error } = await query;
  if (error) {
    return null;
  }
  return jobs;
}

export async function getJobOfEmployer(employer_id: string) {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const { data: jobs, error } = await supabase
    .from("Job")
    .select("job_id, name, location, type, post_time, salary, experience")
    .eq("employer_id", employer_id);
  if (error) {
    return null;
  }
  return jobs;
}

export async function getJobDetail(job_id: string) {
  "use server";
  // const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies });
  const { data: job, error } = await supabase
    .from("Job")
    .select("*")
    .eq("job_id", job_id)
    .single();
  if (error) {
    return null;
  }
  return job;
}

export async function updateJobDetail(job_id: string, formData: FormData) {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const { error } = await supabase
    .from("Job")
    .update([
      {
        name: formData.get("name"),
        location: formData.get("location"),
        type: formData.get("type"),
        salary: formData.get("salary"),
        experience: formData.get("experience"),
        content: formData.get("content"),
        workplace: formData.get("workplace"),
        requirements: formData.get("requirements"),
        benefits: formData.get("benefits"),
      },
    ])
    .eq("job_id", job_id);
  if (error) {
    console.log(error);
    return false;
  }
  return true;
}

export async function updateJobStatus(job_id: string, status: string) {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const { error } = await supabase
    .from("Job")
    .update({ status: status })
    .eq("job_id", job_id);
  if (error) {
    console.log(error);
  }
}

export async function getApplied(job_id: string) {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const { data: applied, error } = await supabase
    .from("Applied")
    .select("*")
    .eq("job_id", job_id);
  if (error) {
    return null;
  }
  return applied;
}

export async function employerUpdateApplied(job_id: string, employer_id: string, status: string) {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("Applied")
    .update({ status: status })
    .eq("job_id", job_id)
    .eq("employee_id", employer_id);
  if (error) {
    console.log(error);
  }
}

export async function saveJob(job_id: string) {
  "use server";
  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);
  const supabase = createServerComponentClient({ cookies });
  const user = (await supabase.auth.getSession()).data.session?.user.id;
  if (!user) {
    return false;
  }
  const { data, error } = await supabase.from("SaveJob").insert([
    {
      employee_id: user as string,
      job_id: job_id,
    },
  ]);
  if (error) {
    console.log(error);
  } else {
    console.log("Success", data);
  }
  return true;
}

export async function postJob(
  formData1: FormData,
  formData2: FormData,
  user: UserResponse["data"],
  city: IState
) {
  "use server";
  // get user
  const supabase = createServerComponentClient({ cookies });
  const employerData = await supabase
    .from("Employer")
    .select("*")
    .eq("user_id", user.user?.id)
    .single();
  const employer_name = employerData.data.name;
  const employer_logo = employerData.data.logo;
  const { data, error } = await supabase.from("Job").insert([
    {
      employer_id: user.user?.id,
      name: formData1.get("name"),
      employer_name: employer_name,
      employer_logo: employer_logo ?? "",
      status: "open",
      location: city?.name,
      salary: formData2.get("salary"),
      type: formData1.get("type"),
      content: formData2.get("content"),
      experience: formData2.get("exp"),
      workplace: formData1.get("workplace"),
      requirements: formData2.get("requirements"),
      benefits: formData2.get("benefits"),
    },
  ]);
  if (error) {
    console.log(error);
  } else {
    console.log("Success", data);
  }
}

export async function addEmployee(
  formData: FormData,
  dob: Date,
  user: UserResponse["data"]
) {
  "use server";
  const supabase = createServerComponentClient({ cookies });

  console.log(user);
  const { data, error } = await supabase.from("Employee").insert([
    {
      user_id: user.user?.id,
      logo: "",
      name: formData.get("name"),
      location: formData.get("location"),
      dob: dob,
    },
  ]);
  if (error) {
    console.log(error);
  } else {
    console.log("Success", data);
  }
  return error;
}

export async function fetchData(function_query: string, customTag: string) {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const currentuser = await supabase.auth.getUser();

  if (currentuser.data) {
    const { data, error } = await supabase.rpc(function_query, {
      userid: currentuser.data.user?.id,
    });

    if (error) {
      return [];
    }
    const formatDateToDDMMYYYY = (date: Date): string => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    };

    const results: Jobapplied[] = data.map((item: Jobapplied) => ({
      job_id: item.job_id,
      name: item.name,
      employer_name: item.employer_name,
      location: item.location,
      type: item.type,
      employer_logo: item.employer_logo,
      tag: customTag,
      post_time: formatDateToDDMMYYYY(new Date(item.post_time)),
      time_date_post: new Date(item.post_time),
    }));

    return results;
  }
  return [];
}
export async function is_user() {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const currentuser = await supabase.auth.getUser();
  if (currentuser.data) {
    const employer = await supabase
      .schema("public")
      .from("User")
      .select("type")
      .eq("user_id", currentuser.data.user?.id)
      .single();

    if (employer.data) {
      if (employer.data.type === "null") {
        return false;
      }

      if (employer.data.type === "employer") {
        return false;
      }

      return true;
    } else {
      // case not account in User table
      return false;
    }
  }
  return false;
}

export async function getUser() {
  "use server";
  console.log("getting user");
  const supabase = createServerComponentClient({ cookies });
  const currentuser = await supabase.auth.getUser();
  if (currentuser.data) {
    const res = await supabase
      .from("User")
      .select("*")
      .eq("user_id", currentuser.data.user?.id)
      .single();
    if (res.error) {
      console.log(res.error);
    } else {
      console.log(res.data);
      if (res.data.type == "employee") {
        const { data, error } = await supabase
          .from("Employee")
          .select("*")
          .eq("user_id", currentuser.data.user?.id)
          .single();
        if (error) {
          return null;
        }
        console.log("Returning employee");
        return { data, isEmployee: true };
      } else if (res.data.type == "employer") {
        const { data, error } = await supabase
          .from("Employer")
          .select("*")
          .eq("user_id", currentuser.data.user?.id)
          .single();
        if (error) {
          return null;
        }
        console.log("Returning employer");
        return { data, isEmployee: false };
      }
    }
    return null;
  }
}

export async function updateEmployee(formData: FormData){
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const currentuser = await supabase.auth.getUser();
  const {error} = await supabase
    .from("Employee")
    .update([
      {
        name: formData.get("name"),
        location: formData.get("location"),
        dob: formData.get("dob"),
      },
    ])
    .eq("user_id", currentuser.data.user?.id);
  if (error) {
    console.log(error);
    return false
  }
  return true
}

export async function GoogleSignIn() {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const res = await supabase.auth.signInWithOAuth({
    provider: "google",
  });

  if (res.error) {
    console.error("Google authentication error:", res.error.message);
    return;
  }

  // If user is successfully authenticated
  console.log("Successfully authenticated with Google");
  const user = await supabase.auth.getUser();
  console.log(user);
  // Now you can fetch additional user data or perform other actions
  // For example, fetching user profile data from the Supabase database
  const existingUser = await supabase
    .schema("public")
    .from("User")
    .select("user_id")
    .eq("user_id", user.data.user?.id)
    .single();
  if (existingUser.data) {
    // If the user exists, update the status
    console.log("Updating");
    await supabase
      .schema("public")
      .from("User")
      .update({ status: "online" })
      .eq("user_id", user.data?.user?.id);
  } else {
    // If the user doesn't exist, insert a new record
    console.log("Inserting");
    await supabase
      .schema("public")
      .from("User")
      .insert([
        { user_id: user.data.user?.id, status: "online", type: "null" },
      ]);
  }
}

// export async function submitJobApplication(jobID: string, cv: File | null) {
//   "use server";
//   const supabase = createServerComponentClient({ cookies });
//   const currentUser = await supabase.auth.getUser();
//   const user_id = currentUser.data?.user?.id;
//   const userExists = await supabase
//     .schema("public")
//     .from("User")
//     .select("user_id")
//     .eq("user_id", user_id)
//     .single();

//   try {
//     const { data, error } = await supabase.storage
//       .from("cv")
//       .upload(user_id + "/" + cv?.name, cv as File, {
//         upsert: true,
//       });
//     if (error) {
//       // Handle the error (log it or perform error-specific logic)
//       console.error("Error UPLOAD", error.message);
//     } else {
//       // Log success or perform success-specific logic
//       console.log("UPLOAD successfully:", data);
//     }
//   } catch (error) {
//     console.error("Error uploading CV:", error.message);
//     // Handle the error, e.g., display an error message to the user
//     return;
//   }

//   if (!userExists.data) {
//     console.error("User does not exist:", user_id);
//     // Handle the error, e.g., return or throw an error
//     return;
//   }
//   try {
//     // Insert job application data into the "Applied" table
//     const { data, error } = await supabase.from("Applied").insert([
//       {
//         job_id: jobID,
//         employee_id: "2d52d092-e1e9-4315-8f0d-081b50ec5ce0",
//         time: new Date(),
//         name: "nameApply",
//         email: "email",
//         phone: "phone",
//         cv_path: "cv_path",
//         propo_letter: "proposalText",
//       },
//     ]);

//     if (error) {
//       // Handle the error (log it or perform error-specific logic)
//       console.error("Error inserting job application:", error.message);
//     } else {
//       // Log success or perform success-specific logic
//       console.log("Job application submitted successfully:", data);
//     }
//   } catch (error) {
//     // Handle unexpected errors (e.g., network issues)
//     console.error("Unexpected error:", error.message);
//   }
// }
