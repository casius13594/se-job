"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Modal from "react-modal";
import { ClipLoader } from "react-spinners";
import { getUserBanStatus } from "@/components/controller";

const dmsans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
});

export default function CredentialsForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countdown, setCountdown] = useState(0); // Set initial countdown value

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer); // Clear the timer if the component is unmounted
    }
  }, [countdown]);

  const supabase = createClientComponentClient();

  const handleResetPassword = async () => {
    let { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) console.log(error);
    else console.log("Sent");
  };

  const toRegister = () => {
    router.push("/auth/register");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(res.data.user);
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
        console.log(existingUser.data.type);
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
            localStorage.setItem("userType", "employer");
            if (existingEmployer.data) {
              // if employer exists in the Employer table
              router.push("/" + existingEmployer.data.url);
            } else {
              router.push("../../auth/profileinput");
            }
          } else if (existingUser.data.type === "admin") {
            localStorage.setItem("userType", "admin");
            router.push("../../admin");
          } else {
            console.log(res.data.user.id);
            const existingEmployee = await supabase
              .schema("public")
              .from("Employee")
              .select("user_id")
              .eq("user_id", res.data.user.id)
              .single();
            localStorage.setItem("userType", "employee");
            if (existingEmployee.data) {
              console.log(existingEmployee.data);
              router.push("../../joblist");
            } else {
              console.log(existingEmployee.error);
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
      localStorage.setItem("current_user_id", res.data.user.id);
    } else {
      if (await getUserBanStatus(email)) {
        setError("You have been banned from the system.");
      } else {
        console.log("user: ", res.data.user);
        console.error(res.error);
        setError(res.error?.message || null);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full flex flex-row min-h-screen">
      <div className="w-4/12 flex flex-col items-center min-h-screen">
        <div className="flex flex-col items-center justify-center w-full h-4/5">
          <Modal
            isOpen={forgotPassword}
            contentLabel="forgot password"
            onRequestClose={() => {
              setForgotPassword(false);
              setSentEmail(false);
            }}
            className="absolute w-1/3 h-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            ariaHideApp={false}
          >
            <div className="flex flex-col items-center justify-center rounded-lg bg-[#13544e] w-full h-full">
              {sentEmail ? (
                <div>
                  <div className="h-3/4 w-full flex flex-col items-center justify-between">
                    <h1 className="text-xl font-bold text-[#ebe3e3] text-center">
                      We have sent a password recovery email to {email}. Please
                      check your inbox.
                    </h1>
                    <button
                      onClick={() => {
                        if (countdown === 0) {
                          handleResetPassword();
                          setSentEmail(true);
                          setCountdown(60); // Reset the countdown
                        }
                      }}
                      disabled={countdown > 0}
                      className={`w-1/3 h-3/5 bg-[#D9D9D9] rounded-md font-semibold mt-5 ${
                        countdown > 0 ? "text-black/[.09]" : ""
                      }`}
                    >
                      {countdown > 0 ? (
                        <>
                          Resend email{" "}
                          <span className="text-red">{`(${countdown})`}</span>
                        </>
                      ) : (
                        "Resend email"
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-3/4 w-full flex flex-col items-center justify-center">
                  <h1 className="text-3xl font-bold text-[#ebe3e3] flex-grow">
                    Recover password
                  </h1>
                  <div className="w-full flex flex-col items-center justify-center">
                    <p className="font-bold  text-[#ebe3e3]">
                      Enter your email
                    </p>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-2/3 my-2 px-5 py-4 bg-[#D9D9D9] text-black text-opacity-50 lg:text-base md:text-sm sm:text-xs font-dmsans rounded-lg placeholder-black placeholder-opacity-50"
                    />
                    <button
                      onClick={async () => {
                        setIsLoading(true);
                        await handleResetPassword();
                        setIsLoading(false);
                        setSentEmail(true);
                        setCountdown(60);
                      }}
                      disabled={countdown > 0 || isLoading}
                      className={`w-1/3 h-3/5 bg-[#D9D9D9] rounded-md font-semibold ${
                        countdown > 0 ? "text-black/[.09]" : ""
                      }`}
                    >
                      {isLoading ? (
                        <ClipLoader color="#ffffff" loading={true} size={10} />
                      ) : countdown > 0 ? (
                        <>
                          Send email{" "}
                          <span className="text-red">{`(${countdown})`}</span>
                        </>
                      ) : (
                        "Send email"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Modal>
          <Link href="/" className="flex place-self-center my-5">
            <Image
              src="/logo.svg"
              alt="Jelp logo"
              width="100"
              height="100"
              className="object-contain"
            />
          </Link>
          <h1 className="mt-5 mb-5 text-base font-bold text-[#AD343E] cursor-default">
            Welcome back! <span className="text-black">Log in Jelp</span>
          </h1>

          <form
            className="w-2/3 text-xl text-black font-semibold flex flex-col justify-end"
            onSubmit={(event) => handleSubmit(event)}
          >
            {error && (
              <span className="w-full p-0.5 mb-5 text-lg font-semibold text-white bg-red rounded-md text-center">
                {error}
              </span>
            )}
            <div className="flex items-center mb-5">
              <div className="absolute m-5 flex">
                <Image src="/2User.svg" alt="Email" width={20} height={20} />
                <div className="h-6 bg-black w-px ml-5"></div>
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email or account"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-20 py-2 bg-[#D9D9D9] text-black text-opacity-50 lg:text-base md:text-sm sm:text-xs font-dmsans rounded-lg placeholder-black placeholder-opacity-50"
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
                className="w-full pl-20 py-2 bg-[#D9D9D9] text-black text-opacity-50 text-base font-dmsans rounded-lg placeholder-black placeholder-opacity-50 focus:outline"
              />

              <div className="absolute flex w-11 h-1/2 -top-1 my-3.5 mx-3 bg-blend-overlay bg-[#D9D9D9] -right-3 justify-center">
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
                <div className="h-6 bg-black w-px ml-5" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setForgotPassword(true)}
              className="text-base text-black text-opacity-50 font-dmsans ml-auto w-fit my-3 hover:underline underline-offset-2"
            >
              Forgot password
            </button>
            <button
              type="submit"
              className="w-full h-10 px-6 text-base font-dmsans text-white bg-[#13544E] rounded-lg focus:shadow-outline hover:bg-[#003f39]"
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" loading={true} size={20} />
              ) : (
                "Login"
              )}
            </button>
            <div className="h-px bg-black w-full my-7" />
          </form>
          <h1 className=" text-base font-bold text-[#AD343E] cursor-default">
            New member?{" "}
            <span
              className="text-black text-opacity-50 hover:underline underline-offset-2 cursor-pointer"
              onClick={toRegister}
            >
              Create account here
            </span>
          </h1>
        </div>
      </div>
      <div className="w-9/12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent z-10"></div>
        <Image
          src="/login_background.jpg"
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}
