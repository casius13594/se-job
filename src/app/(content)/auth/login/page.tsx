"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";

const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
});

export default function CredentialsForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabase = createClientComponentClient();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!res.error && res.data.user) {
      // Check if the user already exists in the database
      const existingUser = await supabase
        .schema("public")
        .from("User")
        .select("user_id,type")
        .eq("user_id", res.data.user.id)
        .single();

      if (existingUser.data) {
        // If the user exists, update the status

        await supabase
          .schema("public")
          .from("User")
          .update({ status: "online" })
          .eq("user_id", res.data.user.id);

        if (existingUser.data.type !== "null") {
          if (existingUser.data.type === "employer") {
            const existingEmployer = await supabase
              .schema("public")
              .from("Employer")
              .select("user_id,url")
              .eq("user_id", res.data.user.id)
              .single();
            if (existingEmployer.data) {
              // if employer exists in the Employer table
              router.push("/" + existingEmployer.data.url);
            } else {
              router.push("../../auth/profileinput");
            }
          } else {
            const existingEmployee = await supabase
              .schema("public")
              .from("Employee")
              .select("user_id")
              .eq("user_id", res.data.user.id)
              .single();
            if (existingEmployee.data) {
              router.push("../../joblist");
            } else {
              router.push("../../auth/employeeProfile");
            }
          }
        } else {
          router.push("../../selection");
        }
      } else {
        router.push("../../selection");
        // If the user doesn't exist, insert a new record
        await supabase
          .schema("public")
          .from("User")
          .insert([
            { user_id: res.data.user.id, status: "online", type: "null" },
          ]);
      }
    } else {
      console.log("user: ", res.data.user);
      console.error(res.error);
      setError(res.error?.message || null);
    }
  };

  const handleGoogle = async () => {
    // Open Google authentication popup

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
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen">
      <Link href="/" className="flex place-self-start ml-16 my-5">
        <Image
          src="/logo.svg"
          alt="Jelp logo"
          width="100"
          height="100"
          className="object-contain"
        />
      </Link>
      <div className="flex flex-col items-center w-1/3">
        <h1 className="mt-10 mb-5 text-base font-bold text-[#AD343E] cursor-default">
          Welcome back! <span className="text-black">Log in Jelp</span>
        </h1>

        <form
          className="w-full text-xl text-black font-semibold flex flex-col"
          onSubmit={(event) => handleSubmit(event)}
        >
          {error && (
            <span className="w-full p-4 mb-2 text-lg font-semibold text-white bg-red rounded-md text-center">
              {error}
            </span>
          )}
          <div className="flex items-center mb-5">
            <div className="absolute m-5 flex">
              <Image src="/2User.svg" alt="Email" width={20} height={20} />
              <div className="h-10 bg-black w-px ml-5"></div>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email or account"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-20 py-4 bg-[#D9D9D9] text-black text-opacity-50 lg:text-base md:text-sm sm:text-xs font-dmsans rounded-lg placeholder-black placeholder-opacity-50"
            />
          </div>
          <div className="relative items-center place-content-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-20 py-4 bg-[#D9D9D9] text-black text-opacity-50 text-base font-dmsans rounded-lg placeholder-black placeholder-opacity-50 focus:outline"
            />

            <div className="absolute flex w-11 h-1/2 -top-1 my-5 mx-3 bg-blend-overlay bg-[#D9D9D9] -right-3 justify-center">
              {showPassword ? (
                <button type="button" onClick={togglePasswordVisibility}>
                  <Image src="/hide.svg" alt="Show" width={20} height={20} />{" "}
                </button>
              ) : (
                <button type="button" onClick={togglePasswordVisibility}>
                  <Image src="/show.svg" alt="Show" width={20} height={20} />{" "}
                </button>
              )}
            </div>

            <div className="absolute mx-5 my-2 flex top-0">
              <Image
                src="/iconPassword.svg"
                alt="Password"
                width={20}
                height={20}
              />
              <div className="h-10 bg-black w-px ml-5" />
            </div>
          </div>
          <button className="text-base text-black text-opacity-50 font-dmsans ml-auto w-fit my-3 hover:underline underline-offset-2">
            Forgot password
          </button>
          <button
            type="submit"
            className="w-full h-12 px-6 text-base font-dmsans text-white bg-[#13544E] rounded-lg focus:shadow-outline"
          >
            Log in
          </button>
          <div className="h-px bg-black w-full my-7" />
          <div className="relative mb-5">
            <button
              type="button"
              className="w-full h-12 px-6 text-base font-dmsans text-white bg-[#13544E] rounded-lg focus:shadow-outline"
              onClick={handleGoogle}
            >
              Connect via Google
            </button>
            <Image
              src="/iconGoogle.svg"
              alt="google"
              width={30}
              height={30}
              className="absolute top-0 m-2"
            />
          </div>
        </form>
        <h1 className="mt-5 text-base font-bold text-[#AD343E] cursor-default">
          New member?{" "}
          <span className="text-black text-opacity-50 hover:underline underline-offset-2 cursor-pointer">
            Create account here
          </span>
        </h1>
      </div>
    </div>
  );
}
