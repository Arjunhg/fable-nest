'use client'
import React, { useContext, useState } from 'react';
import StorySubjectInput from './_components/StorySubjectInput';
import StoryType from './_components/StoryType';
import AgeGroup from './_components/AgeGroup';
import ImageStyle from './_components/ImageStyle';
import { Button } from '@nextui-org/button';
import { chatSession } from '@/config/GeminiAi';
import { StoryData, Users } from '@/config/schema';
import { db } from '@/config/db';
import { v4 as uuidv4 } from 'uuid';
import CustomLoader from './_components/CustomLoader';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import { UserDetailContext } from '../_context/UserDetailContext';
import { eq } from 'drizzle-orm';

export interface fieldData{

  fieldValue: string,
  fieldName: string

}

export interface formDataType{

  storySubject: string,
  storyType: string,
  ageGroup: string,
  imageStyle: string

}

const CREATE_STORY_PROMPT = process.env.NEXT_PUBLIC_STORY;

function CreateStory() {

  const [formData, setFormData] = useState<formDataType>();
  const [loading, setLoading] = useState(false);
  const {user} = useUser();

  const router = useRouter();

  const notify = (msg: string) => toast(msg);
  const notifyError = (msg: string) => toast.error(msg);

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onHandleUserSelection = (data: fieldData) => {

    setFormData((prev: any) => ({

      ...prev,
      [data.fieldName]: data.fieldValue

    }))
    console.log(formData);

  }

  const GenerateStory = async () => {

    if(userDetail.credit <= 0){
      notifyError('Not enough credit to generate story. Please buy more credits.');
      return;
    }
    
    setLoading(true);

    const FINAL_PROMPT = CREATE_STORY_PROMPT
      ?.replace('{ageGroup}', formData?.ageGroup??'')
      .replace('{storyType}', formData?.storyType??'')
      .replace('{storySubject}', formData?.storySubject??'')
      .replace('{imageStyle}', formData?.imageStyle??'')

    let AiImageUrl = '';

    // Generate AI story
    try {

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const story = JSON.parse(result?.response.text());

      try {

        const imageResp = await axios.post('/api/generate-image', {

          prompt: 'Add text with title:' + story?.story_cover?.title + " in bold text for book cover, " + story?.story_cover?.image_prompt

        })
        console.log(imageResp?.data);

        AiImageUrl = imageResp?.data?.imageUrl;
        
      } catch (imageError: any) {

        console.error('Image Generation failed', imageError);
        notifyError('Failed to generate image. Story created without image.');
      }

      const resp: any = await SaveInDb(result?.response.text());
      console.log(resp);
      notify('Story Generated Successfully')
      await updateUserCredits();
      router?.replace('/view-story/' + resp[0].storyId)
      setLoading(false);
      
    } catch (error) {
      
      console.error('Story generation failed: ', error);
      notifyError('Failed to generate story. Please try again.');

    } finally {

      setLoading(false);

    }
  }

  const SaveInDb = async (output: string) => {
    const recordId = uuidv4();
    setLoading(true);

    try {

      const result = await db.insert(StoryData).values({

        storyId: recordId,
        ageGroup: formData?.ageGroup,
        imageStyle: formData?.imageStyle,
        storySubject: formData?.storySubject,
        storyType: formData?.storyType,
        output: JSON.parse(output),
        // coverImage
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
        username: user?.fullName

      }).returning({
        storyId: StoryData?.storyId
      })

      return result;
      
    } catch (error) {
      
      console.log(error);

    } finally {

      setLoading(false);

    }
  }

  const updateUserCredits = async () => {

    const result = await db.update(Users).set({
      credit: Number(userDetail?.credit-1)
    }).where(eq(Users.userEmail, user?.primaryEmailAddress?.emailAddress ?? '')).returning({
      id: Users.id
    })
  }

  return (

    <div className='p-10 md:px-20 lg:px-40'>

      <h2 className="font-extrabold text-primary text-center lg:text-[70px] md:text-[50px] text-[30px]">
        Create Your Story
      </h2>

      <p className='text-[15px] md:text-[25px] lg:text-[40px] text-primary/70 text-center '>
        Unlock your creativity with AI: Craft stories like never before! Let our AI bring your imagination to life, one story at a time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">

        {/* Story Subject */}
        <StorySubjectInput userSelection = {onHandleUserSelection}/>

        {/* Story Type */}
        <StoryType userSelection = {onHandleUserSelection}/>

        {/* Age group */} 
        <AgeGroup userSelection = {onHandleUserSelection}/>

        {/* Image style */}
        <ImageStyle userSelection = {onHandleUserSelection}/>

      </div>
      
      <div className='flex justify-end my-10 flex-col items-end'>

        <Button  
          color='primary' 
          disabled={loading} 
          className='p-10 lg:text-2xl md:text-xl text-[15px]' 
          onClick={GenerateStory}> 
            Generate Story 
        </Button>

        <span>1 Credit will be used</span>

      </div>

      {/* {
        error && (

          <div className='text-red-500 mt-4'>
            {error}
          </div>

        )
      } */}

      <CustomLoader isLoading={loading}/>

    </div>

  )
}

export default CreateStory
