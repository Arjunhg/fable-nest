'use client'

import Image from 'next/image';
import React, { useState } from 'react'
import { OptionField } from './StoryType';

function AgeGroup({userSelection}: any) {

    const OptionList = [
        {
            label: '0-2 Years',
            imageUrl: '/02Years.png',
            isFree: true
        },
        {
            label: '3-5 Years',
            imageUrl: '/35Years.png',
            isFree: true
        },
        {
            label: '6-10 Years',
            imageUrl: '/58Years.png',
            isFree: true
        }
    ]

    const [selectedOption, setSelectedOption] = useState<string>();

    const onUserSelect = (item: OptionField) => {

      setSelectedOption(item.label);

      userSelection({
        fieldValue: item?.label,
        fieldName: 'ageGroup'
      })
    }

  return (

    <div>
      
      <label className='font-bold text-2xl sm:text-3xl md:text-4xl text-primary block mb-2'> 
        3. Age Group
      </label>

      <div className='grid grid-cols-3 gap-5 mt-3'>

        {
            OptionList.map((item, index) => (

                <div className={`relative grayscale hover:grayscale-0 cursor-pointer p-1 ${selectedOption===item.label ? 'grayscale-0 border rounded-2xl border-primary' : 'grayscale'}`} onClick={() => onUserSelect(item)}>
                    
                    <h2 className='absolute text-[13px] lg:text-2xl text-white text-center w-full bottom-5'> {item.label} </h2>

                    <Image src={item.imageUrl} alt={item.label} width={300} height={500} className='object-cover h-[260px] rounded-3xl'/>

                </div>
            ))
        }

      </div>

    </div>
  )
}

export default AgeGroup
