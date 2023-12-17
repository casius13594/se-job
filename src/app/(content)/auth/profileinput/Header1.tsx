'use client';
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import { Button, ThemePanel } from "@radix-ui/themes"
import { BiLogIn} from 'react-icons/bi';

const Header1 = () => {
  const currentPath = usePathname();
  console.log(currentPath);

  const links = [
    // put property in here.
    { label: 'Log in', href: '/auth/login', icon: <BiLogIn /> },
  ];

  return (
    //this is for margin of our whole components>
    <nav className='flex space-x-6 border-b h-20 items-center justify-between ml-4 mr-4'>
      <Link href="/">
        <Image src="/Jelp.png" alt="me" width="100" height="100" />
      </Link>
      <ul className='flex space-x-6'>
        {links.map((link) => (
          <Link
            key={link.href}
            className={classnames({
              'text-zinc-900': link.href === currentPath,
              'text-zinc-500': link.href !== currentPath,
              'hover:text-zinc-800 transition-colors': true,
            })}
            href={link.href}
          >
            <Button>
              {link.label}
              {link.icon} {/* Use the icon React component here */}
              </Button>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default Header1;