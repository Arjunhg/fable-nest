import { Button } from '@nextui-org/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Hero() {
  return (
    <div className='px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 lg:-mt-10 md:mt-10 sm:mt-5 min-h-screen flex items-center'>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

        {/* Content section */}
        <div className="flex flex-col justify-center">
          <h2 className='text-4xl sm:text-5xl md:text-6xl lg:text-[70px] text-primary font-extrabold leading-tight mb-4'>
            Craft Magical Stories for Kids in Minutes 
          </h2>

          <p className='text-lg sm:text-xl lg:text-2xl text-primary font-light mb-6'>
            Create fun and personalised stories that bring&apos;s your child adventure to life and spark their passion for reading. It only takes few seconds!
          </p>

          <Link href={'/create-story'}>
          {/* user should be authenticated before navigating to new page */}
            <Button size='lg' color='primary' className='mt-2 font-bold text-xl sm:text-2xl p-6 sm:p-8'>
              Create Story
            </Button>
          </Link>
        </div>

        {/* Image section */}
        <div className="flex justify-center items-center mt-8 lg:mt-0">
          <Image 
            src={'/hero.png'} 
            alt='hero' 
            width={700} 
            height={400}
            className="w-full h-auto max-w-md lg:max-w-full"
          />
        </div>

      </div>
    </div>
  )
}

export default Hero