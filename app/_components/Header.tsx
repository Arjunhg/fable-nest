'use client'
import React, { useState } from 'react'
import {  Navbar,   NavbarBrand,   NavbarContent,   NavbarItem,   NavbarMenuToggle,  NavbarMenu,  NavbarMenuItem} from "@nextui-org/navbar";
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { UserButton, useUser } from '@clerk/nextjs';

function Header() {

    const MenuList = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Create Story',
            path: '/create-story'
        },
        {
            name: 'Explore Stories',
            path: '/explore'
        },
        {
            name: 'Contact Us',
            path: '/contact-us'
        },
    ]

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {user, isSignedIn} = useUser();

  return (
    
    <Navbar maxWidth='full' onMenuOpenChange={setIsMenuOpen} className='p-2 md:p-4 '>

            <NavbarContent className="lg:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}/>
            </NavbarContent>

                {/* Logo of application */}
            <NavbarContent className='lg:hidden pr-3' justify='center'>    
                <NavbarBrand>
                    <Image src={'/logo.svg'} alt='logo' height={30} width={30}/>
                    <h2 className="font-bold text-lg md:text-xl text-primary ml-2">Kidso Story</h2>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className='hidden lg:flex'>
                <NavbarBrand>
                    <Image src={'/logo.svg'} alt='logo' width={40} height={40}/>
                    <h2 className="font-bold text-2xl xl:text-3xl text-primary ml-3">
                        Kidso Story
                    </h2>
                </NavbarBrand>
            </NavbarContent>

            {/* add menu options */}
            <NavbarContent justify='center' className='hidden lg:flex'>
                {
                    MenuList.map((item, index) => (
                        <NavbarItem key={index} className='text-base l:text-lg text-primary font-medium hover:underline hover:text-black mx-2'>
                            <Link href={item.path}>
                                {item.name}
                            </Link>
                        </NavbarItem>
                    ))
                }
            </NavbarContent>

            <NavbarContent justify='end'>
                <Link href={'/dashboard'}>
                    <Button color='primary' size='sm' className='hidden lg:flex xl:text-2xl'>
                        {
                            isSignedIn ? 'Dashboard':'Get Started' 
                        }
                    </Button>
                </Link>
                <UserButton/>
            </NavbarContent>

            <NavbarMenu className='md:mt-5'>
                {
                    MenuList.map((item,index) => (
                        <NavbarMenuItem key={index} className='py-2'>
                            <Link href={item.path} className='w-full text-primary hover:underline hover:text-black text-lg' onClick={() => setIsMenuOpen(false)}>
                                {item.name}
                            </Link>
                        </NavbarMenuItem>
                    ))
                }

                <NavbarMenuItem className='py-2'>
                    <Link href={'/dashboard'}>
                        <Button color='primary' className='w-full mt-4' onClick={() => setIsMenuOpen(false)}>
                            {
                                isSignedIn ? 'Dashboard':'Get Started'
                            }
                        </Button>
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
    </Navbar>
  )
}

export default Header
