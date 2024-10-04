import Image from 'next/image'
import React from 'react'

function BookCoverPage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="relative w-full h-full">
      <Image 
        src={imageUrl} 
        alt='cover' 
        layout="fill"
        objectFit="cover"
      />
    </div>
  )
}

export default BookCoverPage