import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { HiOutlineSun } from 'react-icons/hi'
import { TfiAngleRight } from 'react-icons/tfi'

export const Footer = () => {
  return (
    <footer className='border-t p-5'>
      <div className='mx-auto max-w-[1220px]'>
        <div className='flex flex-col justify-between border-b pb-8 sm:flex-row'>
          <div className='flex w-full max-w-[400px] flex-col items-start justify-between md:flex-row'>
            <div className='mb-3 flex items-center font-bold'>
              <Image src={'/static/leviathan-logo.png'} height={32} width={32} alt='img' className='mr-1' />
              ACME
            </div>
            <div className='mb-3 flex flex-col space-y-3'>
              <Link href={'/'}>Home</Link>
              <Link href={'/'}>About</Link>
              <Link href={'/'}>Terms of use</Link>
              <Link href={'/'}>Shipping</Link>
            </div>
            <div className='mb-3'>
              <Link href={'/'}>Privacy Policy</Link>
            </div>
          </div>
          <div className='flex items-start'>
            <button className='mr-3 flex items-center rounded border py-1 px-3'>
              <HiOutlineSun size={20} />
              <span className='mx-2'>Light</span> <TfiAngleRight size={18} />
            </button>
            <button className='mr-3 flex items-center rounded border py-1 px-3'>
              <span className='mx-2'>En</span> <TfiAngleRight size={18} />
            </button>
            <AiFillGithub size={30} />
          </div>
        </div>
        <div className='flex flex-col items-center justify-between pt-6 sm:flex-row'>
          <p className='text-sm text-gray-600'>© 2020 ACME, Inc. All rights reserved.</p>
          <div>
            created by <b className='font-bold'>BEST DEVS</b>
          </div>
        </div>
      </div>
    </footer>
  )
}
