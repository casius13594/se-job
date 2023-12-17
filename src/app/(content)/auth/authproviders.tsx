"use client";

import { getProviders, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image'

type Provider = {
  id: string;
  name: string;
  type: string;
  signInUrl: string;
  callbackUrl: string;
  signinUrlParams: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    }

    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map
          ((provider: Provider, i) => (
            <div key={i} className='relative mb-5'>
              <button type='button' className="w-full h-12 px-6 text-base font-dmsans text-white bg-[#13544E] rounded-lg focus:shadow-outline" onClick={() => signIn(provider?.id)}>
                Connect via Google
              </button>
              <Image src="/iconGoogle.svg" alt="google" width={30} height={30} className='absolute top-0 m-2' />
            </div>
          )
          )}
      </div>
    )
  }
  return <div>Loading...</div>;
}

export default AuthProviders