'use client'
import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
import { eq } from 'drizzle-orm';
import { useEffect, useState } from 'react'
import BookCoverPage from '../_components/BookCoverPage';
import StoryPages from '../_components/StoryPages';
import LastPage from '../_components/LastPage';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io";


const HTMLFlipBook = dynamic(() => import('react-pageflip'), { 
  ssr: false,
  loading: () => <div className="w-full h-64 flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
  </div>
});

function Page({ params }: any) {
  const imagePaths = [
    "/one.png",
    "/two.png",
    "/three.png",
    "/four.png"
  ]

  const [story, setStory] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    getStory();
  }, []);

  const getStory = async() => {
    const result = await db.select().from(StoryData)
                        .where(eq(StoryData.storyId, params.id))
    // console.log("Result is:", result)
    // console.log("Chapter info is:", story?.output?.chapters)
    setStory(result[0]);
  }

  const randomIndex = Math.floor(Math.random() * imagePaths.length);
  const randomImagePath = imagePaths[randomIndex];

  if (!isClient || !story) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen bg-gradient-to-b from-primary to-secondary p-6 md:p-10 lg:p-20'
    >
      <motion.h2 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className='font-bold text-3xl md:text-4xl lg:text-5xl text-center p-6 md:p-10 bg-white text-primary rounded-lg shadow-lg mb-10'
      >
        {story?.output?.story_cover?.title || "Loading..."}
      </motion.h2>

      <div className="max-w-4xl mx-auto relative">
        {/* @ts-ignore */}
        <HTMLFlipBook 
          width={300}
          height={400}
          size="stretch"
          minWidth={300}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          mobileScrollSupport={true}
          showCover={true}
          className='mt-10 shadow-2xl'
        >
          <div className="cover-page">
            <BookCoverPage imageUrl={randomImagePath}/>
          </div>

          {story?.output?.chapters?.map((chapter: any, index: number) => (
            <div key={chapter.chapter_title || index} className='bg-white p-6 md:p-10 border'>
              <StoryPages storyChapter={chapter}/>
            </div>
          ))}

          <div className="last-page">
            <LastPage/>
          </div>
        </HTMLFlipBook>

        {/* <div className='absolute -right-5 top-[250px]'>
          <IoIosArrowDroprightCircle className='text-4xl cursor-pointer' />
        </div>

        <div className='absolute -left-5 top-[250px]'>
          <IoIosArrowDropleftCircle className='text-4xl cursor-pointer' />
        </div> */}

      </div>
    </motion.div>
  )
}

export default Page