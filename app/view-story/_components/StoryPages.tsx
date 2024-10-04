import React from 'react'

function StoryPages({ storyChapter }: any) {
  return (
    <div className="flex flex-col h-full justify-between p-4 sm:p-6 md:p-8">
      <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-primary mb-2 sm:mb-4'>
        {storyChapter?.chapter_title}
      </h2>

      <div className='flex-grow overflow-y-auto'>
        <p className='text-sm sm:text-base md:text-lg p-3 sm:p-4 md:p-6 rounded-lg bg-slate-100'>
          {storyChapter?.text}
        </p>
      </div>
    </div>
  )
}

export default StoryPages