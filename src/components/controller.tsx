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
import { employeeCompany, jobInfo, userinfo } from "./DashBoard/user/userinfo";
import { UUID } from "crypto";
import { MultiValue } from "react-select";
import { chartinfo } from "./Chart/barchart";
import { InfoNoti } from "./Card_Cotification/cardnoti";
import { formatDistanceToNow, parseISO } from "date-fns";

export async function getLocation() {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.rpc("getlocation");
  return data;
}

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
    console.log(error);
    return null;
  }

  return jobs;
}

export async function getSavedJob() {
  "use server";
  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);
  const supabase = createServerComponentClient({ cookies });
  const user = (await supabase.auth.getSession()).data.session?.user.id;
  if (!user) {
    return null;
  }
  const { data: jobs, error } = await supabase
    .from("SaveJob")
    .select("job_id, Job (job_id)")
    .eq("employee_id", user);
  if (error) {
    console.log(error);
    return null;
  }
  return jobs;
}

export async function getRelatedJob(job_id: string) {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const { data: jobs, error } = await supabase.rpc("getrelatedjob", {
    job: job_id,
  });
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
    .select(
      "job_id, name, status, location, type, post_time, salary, experience"
    )
    .eq("employer_id", employer_id);
  if (error) {
    return null;
  }
  return jobs;
}

export async function toggleJobStatus(job_id: string) {
  "use server";
  const supabase = createServerComponentClient({ cookies });

  // Fetch the current status of the job
  const { data: currentJob, error: fetchError } = await supabase
    .from("Job")
    .select("status")
    .eq("job_id", job_id)
    .single();

  if (fetchError || !currentJob) {
    console.error("Failed to fetch job status", fetchError);
    return;
  }

  // Toggle the status
  const newStatus = currentJob.status === "open" ? "close" : "open";

  // Update the status in the database
  const { error: updateError } = await supabase
    .from("Job")
    .update({ status: newStatus })
    .eq("job_id", job_id);

  if (updateError) {
    console.error("Failed to update job status", updateError);
  }
}

export async function acceptApplicantDB(employee_id: string, job_id: string) {
  "use server";
  const supabase = createServerComponentClient({ cookies });

  // Update the status in the database
  const { error: updateError } = await supabase
    .from("Applied")
    .update({ status: "Accepted" })
    .eq("job_id", job_id)
    .eq("employee_id", employee_id);

  if (updateError) {
    console.error("Failed to update employee status", updateError);
  }
}

export async function declineApplicantDB(employee_id: string, job_id: string) {
  "use server";
  const supabase = createServerComponentClient({ cookies });

  // Update the status in the database
  const { error: updateError } = await supabase
    .from("Applied")
    .update({ status: "Declined" })
    .eq("job_id", job_id)
    .eq("employee_id", employee_id);

  if (updateError) {
    console.error("Failed to update employee status", updateError);
  }
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

export async function getEmployerFromJob(job_id: string) {
  "use server";
  // const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies });
  const { data: employer, error } = await supabase
    .from("Job")
    .select("*")
    .eq("job_id", job_id)
    .single();
  if (error) {
    console.log("getEmployerFromJob", error);
  } else {
    console.log("Employer ID: ", employer);
  }
  return employer;
}

export async function getEmployeeOfCompany() {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const company_id = await getUser();

  if (company_id) {
    if (company_id.isEmployee == false) {
      let queries = await supabase.rpc("listemployeeofcompany", {
        userid: company_id.data.user_id,
      });
      if (queries.error) {
        return [];
      }
      let ind = 0;
      const results: employeeCompany[] = queries.data.map(
        (item: employeeCompany) => ({
          id: ++ind,
          job_id: item.job_id,
          employee_id: item.employee_id,
          name: item.name,
          email: item.email,
          phone: item.phone,
          cv_path: item.cv_path,
          propo_letter: item.propo_letter,
          status: item.status,
        })
      );
      return results;
    }
  }
  return [];
}

export async function banUser(id: UUID) {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.rpc("banuser", { user_id: id });
  if (error) {
    console.log("BanUser", error);
  }
  return data;
}

export async function unBanUser(id: UUID) {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.rpc("unbanuser", { user_id: id });
  if (error) {
    console.log("UnbanUser", error);
  }
  return data;
}

export async function getListUser() {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  let queries_employee = await supabase.rpc("listemployee");
  let queries_employer = await supabase.rpc("listemployer");
  let combinedResults: userinfo[] = [];

  if (queries_employee.error) {
    console.log("employee", queries_employee.error);
  }
  if (queries_employee.error) {
    console.log("employer", queries_employer.error);
  }

  const formatDateToDDMMYYYY = (originalDate: string): string => {
    if (originalDate) {
      const date = new Date(originalDate);
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);

      return formattedDate;
    }
    return "";
  };

  let ind = -1;
  const results_employee: userinfo[] = queries_employee.data
    ? queries_employee.data.map((item: userinfo) => ({
        id: ++ind,
        user_id: item.user_id,
        name: item.name || "",
        email: item.email || "",
        last_login: formatDateToDDMMYYYY(item.last_login) || "",
        role: item.role === "null" ? "" : item.role || "",
        banned_until: item.banned_until || "",
      }))
    : [];

  const results_employer: userinfo[] = queries_employer.data
    ? queries_employer.data.map((item: userinfo) => ({
        id: ++ind,
        user_id: item.user_id,
        name: item.name || "",
        email: item.email || "",
        last_login: formatDateToDDMMYYYY(item.last_login) || "",
        role: item.role || "",
        banned_until: item.banned_until || "",
      }))
    : [];

  combinedResults = [...results_employee, ...results_employer];
  return combinedResults;
}

export async function getListJob() {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  let queries_job = await supabase.from("Job").select("*");

  if (queries_job.error) {
    console.error("Error fetching job list:", queries_job.error);
    return [];
  }

  let ind = -1;
  const results_job: jobInfo[] = queries_job.data
    ? queries_job.data.map((item: jobInfo) => ({
        id: ++ind,
        job_id: item.job_id,
        employer_id: item.employer_id,
        name: item.name || "",
        employer_name: item.employer_name || "",
        status: item.status || "",
        action: item.action || "",
      }))
    : [];

  return results_job;
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
  try {
    console.log("Click updateJobStatus");
    console.log(job_id);
    const supabase = createServerComponentClient({ cookies });
    await supabase
      .schema("public")
      .from("Job")
      .update({ status: status })
      .eq("job_id", job_id);
  } catch (error) {
    console.error(error);
    throw error;
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

export async function employerUpdateApplied(
  job_id: string,
  employer_id: string,
  status: string
) {
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

export async function unsaveJob(job_id: string) {
  "use server";
  // const cookieStore = cookies();
  // const supabase = createClient(cookieStore);
  const supabase = createServerComponentClient({ cookies });
  const user = (await supabase.auth.getSession()).data.session?.user.id;
  if (!user) {
    return false;
  }
  const { data, error } = await supabase
    .from("SaveJob")
    .delete()
    .eq("employee_id", user)
    .eq("job_id", job_id);
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
  city: IState,
  selectedTags: MultiValue<{ value: any; label: any }>
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
  const { data, error } = await supabase
    .from("Job")
    .insert([
      {
        employer_id: user.user?.id,
        name: formData1.get("name"),
        employer_name: employer_name,
        employer_logo: employer_logo ?? "",
        status: "pending",
        location: city?.name,
        salary: formData2.get("salary"),
        type: formData1.get("type"),
        content: formData2.get("content"),
        experience: formData2.get("exp"),
        workplace: formData1.get("workplace"),
        requirements: formData2.get("requirements"),
        benefits: formData2.get("benefits"),
      },
    ])
    .select("job_id");
  if (error) {
    console.log(error);
  } else if (data !== null) {
    for (const tag of selectedTags) {
      console.log(tag);
      await supabase.from("JobTag").insert([
        {
          tag_id: tag.value,
          job_id: data[0].job_id,
        },
      ]);
    }
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

export async function fetchTag() {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from("Tag").select("*");
  if (error) {
    console.log(error);
  }
  return data;
}

export async function fetchChart() {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const currentuser = await getUser();

  if (currentuser && !currentuser?.isEmployee) {
    const { data, error } = await supabase.rpc("chartjob", {
      userid: currentuser?.data.user_id,
    });
    if (error) {
      console.log("fetch chart error", error);
      return [];
    }
    if (!data) {
      return [];
    }

    const chartData: chartinfo[] = data.map((item: any) => ({
      jobid: item.jobid as UUID,
      x: item.x as string,
      y: item.y as number,
    }));
    return chartData;
  }
  return [];
}

export async function fetchData(isClick: number, search_string: string | null) {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const currentuser = await supabase.auth.getUser();
  if (currentuser.data) {
    const userId = currentuser.data.user?.id;

    const appliedData = await supabase.rpc("listappliedjob", {
      userid: userId,
    });
    const savedData = await supabase.rpc("listsavejob", { userid: userId });

    if (appliedData.error || savedData.error) {
      console.log("Fetch jobapplied data error");
      return [];
    }
    const formatDateToDDMMYYYY = (date: Date): string => {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}-${month}-${year}`;
    };
    const appliedResults: Jobapplied[] =
      isClick == 1 || isClick == 3
        ? appliedData.data.map((item: Jobapplied) => ({
            ...item,
            tag: "Applied",
            post_time: formatDateToDDMMYYYY(new Date(item.post_time)),
            time_date_post: new Date(item.post_time),
          }))
        : [];
    const SaveJobResults: Jobapplied[] =
      isClick == 1 || isClick == 2
        ? savedData.data.map((item: Jobapplied) => ({
            ...item,
            tag: "Saved",
            post_time: formatDateToDDMMYYYY(new Date(item.post_time)),
            time_date_post: new Date(item.post_time),
          }))
        : [];
    const combinedResults: Jobapplied[] =
      isClick === 1 ? [...appliedResults, ...SaveJobResults] : [];

    //combinedResults.sort((a, b) => b.time_date_post.getTime() - a.time_date_post.getTime());

    if (search_string !== "" && search_string) {
      return isClick === 2
        ? SaveJobResults.filter(
            (job) =>
              job.name.includes(search_string) ||
              job.employer_name.includes(search_string) ||
              job.type.includes(search_string)
          )
        : isClick === 3
        ? appliedResults.filter(
            (job) =>
              job.name.includes(search_string) ||
              job.employer_name.includes(search_string) ||
              job.type.includes(search_string)
          )
        : combinedResults.filter(
            (job) =>
              job.name.includes(search_string) ||
              job.employer_name.includes(search_string) ||
              job.type.includes(search_string)
          );
    }
    return isClick === 1
      ? combinedResults
      : isClick === 2
      ? SaveJobResults
      : appliedResults;
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
      if (res.data.type == "admin") {
        const { data, error } = await supabase
          .from("User")
          .select("*")
          .eq("user_id", currentuser.data.user?.id)
          .single();
        return { data, isEmployee: false };
      }
      if (res.data.type == "employee") {
        const { data, error } = await supabase
          .from("Employee")
          .select("*")
          .eq("user_id", currentuser.data.user?.id)
          .single();
        if (error) {
          return null;
        }
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
        return { data, isEmployee: false };
      }
    }
    return null;
  }
}

export async function updateEmployee(formData: FormData) {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const currentuser = await supabase.auth.getUser();
  const { error } = await supabase
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
    return false;
  }
  return true;
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

export async function getUserBanStatus(user_email: string) {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const currentuser = await getUser();
  const { data, error } = await supabase.rpc("get_user_ban_status", {
    user_email: user_email,
  });
  if (error) {
    console.log(error);
    return null;
  } else return data;
}

export async function get_info_application(jobid: UUID) {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const currentuser = await getUser();
  if (currentuser?.isEmployee) {
    if (currentuser.data) {
      const info_apply = await supabase
        .schema("public")
        .from("Applied")
        .select("*")
        .eq("job_id", jobid)
        .eq("employee_id", currentuser.data.user_id)
        .single();

      if (info_apply.error) {
        console.log("info application error", info_apply.error);
      }
      return info_apply.data;
    }
    return null;
  }
}

export async function get_noti_list() {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const currentuser = await getUser();
  if (currentuser?.data) {
    const noti_list = await supabase
      .schema("public")
      .from("Notification")
      .select("*")
      .eq("user_id", currentuser.data.user_id);
    if (noti_list.error) {
      console.log("Fetch Noti list error", noti_list);
    }

    if (noti_list.data) {
      return noti_list.data;
    }

    return [];
  }
}

export async function update_noti_status() {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const currentuser = await getUser();
  if (currentuser?.data) {
    const { data, error } = await supabase
      .schema("public")
      .from("Notification")
      .update({ status: "Read" })
      .eq("user_id", currentuser.data.user_id);
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  }
}

export async function insert_noti(user_id: string, content: string) {
  "use server";
  const supabase = createServerComponentClient({ cookies });
  const currentuser = await getUser();
  const { data, error } = await supabase
    .schema("public")
    .from("Notification")
    .insert([
      {
        user_id: user_id,
        status: "Unread",
        link: null,
        content: content,
        name_sender: currentuser?.data.name,
        logo_sender: currentuser?.data.logo,
      },
    ]);
  if (error) {
    console.log("Insert noti error", error);
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
