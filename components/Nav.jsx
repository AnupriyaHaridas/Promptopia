'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);
    useEffect(() => {
        (async () => {
          const res = await getProviders();
          setProviders(res);
        })();
      }, []);
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href='/' className='flex-center flex gap-2'>
            <Image src='/assets/images/logo.svg' 
            width={30} 
            height={30} 
            alt='Promptopia Logo' className='object-contain'/>
            <p className='logo_text'>Promptopia</p>
        </Link>
        {/*Desktop navigation*/}
        <div className='hidden sm:flex'>
            {session ?.user ?(
                <div className='flex gap-3 md:gap-5'>
                    <Link href='/create-prompt'
                    className='black_btn'>
                        Create Post
                    </Link>
                    <button 
                    onClick={signOut}
                    className='outline_btn'>
                        Sign Out
                    </button>
                    <Link href='/profile'>
                        <Image 
                        src={session ?.user.image}
                        width={37} 
                        height={37} 
                        alt='User Profile' 
                        className='rounded-full'/>
                    </Link>
                </div>
            ) : (
            <>{providers && Object.values(providers).map((provider) => (
                <button 
                type="button"
                key={provider.name}
                onClick={() => {
                    signIn(provider.id)
                }}
                className='black_btn'>
                   Dsk Sign In
                </button>
            ))}
            </>
            )}
        </div>
        {/*Mobile navigation*/}
        <div className='flex sm:hidden relative'>
            {session ?.user ? (
                <div className='flex'>
                    <Image 
                        src={session ?.user.image}
                        width={37} 
                        height={37}
                        onClick={() => setToggleDropdown((prev) => !prev)} 
                        alt='User Profile' 
                        className='rounded-full'/>
                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link href='/profile'
                                className='dropdown_link'
                                onClick={()=>setToggleDropdown(false)}>
                                   My Profile
                                </Link>
                                <Link href='/create-prompt'
                                className='dropdown_link'
                                onClick={() => setToggleDropdown
                                (false)}>
                                    Create Promt
                                </Link>
                                <button 
                                type='button'
                                onClick={()=>{
                                    signOut();
                                    setToggleDropdown(false);
                                }}
                                className='mt-5 w-full black_btn'>
                                    Sign Out
                                </button>
                            </div>
                        )}
                </div>
            ) : (<>{providers && 
                Object.values(providers).map((provider) => (
                <button 
                type="button"
                key={provider.name}
                onClick={() => { signIn(provider.id)
                }}
                className='black_btn'>
                    Mbl Sign In
                </button>
            ))}
            </>
            )}
        </div>
    </nav>
  )
}

export default Nav