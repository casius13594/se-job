"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function ChangePasswordForm() {
  const [show1stPassword, setShow1stPassword] = useState(false);
  const [show2ndPassword, setShow2ndPassword] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = document.getElementById("form") as HTMLFormElement;
    const formData = new FormData(form);
    const password = formData.get("1stPassword") as string;
    const confirmPassword = formData.get("2ndPassword") as string;
    if (password === null || confirmPassword === null) {
      return alert("Password fields cannot be empty.");
    }

    if (password !== confirmPassword) {
      return alert("Your passwords are not identical.");
    }

    const { data, error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) console.log(error);
    else {
      alert(
        "Password updated successfully. We will redirect you to login page."
      );
      router.push("/auth/login");
    }
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen">
      <Link href="/" className="flex place-self-start ml-16 mt-5">
        <Image
          src="/logo.svg"
          alt="Jelp logo"
          width="100"
          height="100"
          className="object-contain"
        />
      </Link>
      <div className="flex flex-col w-1/2 mx-auto">
        <form
          id="form"
          onSubmit={handleResetPassword}
          className="w-2/3 mx-auto text-xl text-black font-semibold flex flex-col bg-[#13544E] rounded-3xl px-16 py-5"
        >
          <h1 className="place-self-center text-[#ebe3e3] pb-3 font-extrabold text-3xl">
            Reset Password
          </h1>

          <div className="items-center mb-5 text-sm font-bold text-[#ebe3e3]">
            <label>Enter new password</label>
            <div className="relative">
              <input
                name="1stPassword"
                type={show1stPassword ? "text" : "password"}
                required
                className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow p-2 font-medium text-black"
              ></input>
              <div className="absolute inset-y-0 right-3 flex items-center my-1.5 bg-blend-overlay bg-white h-1/2">
                {show1stPassword ? (
                  <button
                    type="button"
                    onClick={() => {
                      setShow1stPassword(!show1stPassword);
                    }}
                  >
                    <Image src="/hide.svg" alt="Show" width={20} height={20} />{" "}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setShow1stPassword(!show1stPassword);
                    }}
                  >
                    <Image src="/show.svg" alt="Show" width={20} height={20} />{" "}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="items-center mb-5 text-sm font-bold text-[#ebe3e3]">
            <label>Re-enter new password</label>
            <div className="relative">
              <input
                name="2ndPassword"
                type={show2ndPassword ? "text" : "password"}
                required
                className="w-full h-7 border-black border border-r-2 border-b-2 rounded-lg shadow p-2 font-medium text-black"
              ></input>
              <div className="absolute inset-y-0 right-3 flex items-center my-1.5 bg-blend-overlay bg-white h-1/2">
                {show2ndPassword ? (
                  <button
                    type="button"
                    onClick={() => {
                      setShow2ndPassword(!show2ndPassword);
                    }}
                  >
                    <Image src="/hide.svg" alt="Show" width={20} height={20} />{" "}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setShow2ndPassword(!show2ndPassword);
                    }}
                  >
                    <Image src="/show.svg" alt="Show" width={20} height={20} />{" "}
                  </button>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-2/3 h-10 px-6 mt-7 text-xl place-self-center font-dmsans text-[#13544E] bg-[#ebe3e3] rounded-lg focus:shadow-outline"
          >
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
}
