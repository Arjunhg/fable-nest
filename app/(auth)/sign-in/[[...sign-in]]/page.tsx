import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-4">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center lg:items-stretch gap-8">
        {/* Image section - hidden on small screens, on top for medium screens, side by side on large screens */}
        <div className="hidden sm:block w-full lg:w-1/2 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg">
          <div className="transition-transform duration-300 transform hover:scale-105">
            <Image 
              src='/login.png' 
              alt='login' 
              width={700} 
              height={700} 
              className='w-full h-auto object-contain rounded-lg'
              priority
            />
          </div>
        </div>

        {/* Sign-in section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md bg-gradient-to-br from-white/60 to-white/30 backdrop-filter backdrop-blur-xl p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 text-center text-white">
              Welcome Back!
            </h1>
            <p className="text-sm sm:text-base text-center text-gray-200 mb-6">
              Sign in to continue
            </p>
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  )
}