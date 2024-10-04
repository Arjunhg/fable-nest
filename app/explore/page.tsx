'use client'
import { db } from "@/config/db";
import { StoryData } from "@/config/schema";
import { desc } from "drizzle-orm";
import { useEffect, useState } from "react";
import { StoryItemType } from '../dashboard/_components/UserStoryList'
import StoryItemCard from "../dashboard/_components/StoryItemCard";
import { Button } from "@nextui-org/button";
import { toast } from "react-toastify";

const STORIES_PER_PAGE = 4;

function Explore() {

    const [page, setPage] = useState(0);
    const [storyList, setStoryList] = useState<StoryItemType[]>([]);
    const [hasMore, setHasMore] = useState(true);
    // const notify = (msg:string) => toast(msg);
    const notifyError = (msg:string) => toast.error(msg);

    useEffect(() => {
        getAllStories();
    },[]);


    const getAllStories = async () => {

        try {

            const offSet = page * STORIES_PER_PAGE;

            const result:any = await db.select()
                                   .from(StoryData)
                                   .orderBy(desc(StoryData.id))
                                   .limit(STORIES_PER_PAGE)
                                   .offset(offSet) 
            
                
            if(result.length > 0){
                setStoryList((prev) => [...prev, ...result]);
                setPage((prevPage) => prevPage+1);
            }else{
                setHasMore(false);
            }
        } catch (error) {
            console.log("Error Fetching stories:", error);
            notifyError('Error Fetching Stories');
        }
    }
 

  return (

    <div className="min-h-screen p-10 md:px-20 lg:px-40">

      <h2 className="font-bold text-4xl text-primary text-center">Explore More Stories</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">

        {
            storyList?.map((item, index) => (
                
                <StoryItemCard key={item.id} story={item}/>
            ))
        }

      </div>

      {
        hasMore && (
            <div className="text-center mt-10">

                <Button color="primary" onClick={getAllStories}>Load More</Button>

            </div>
        )
      }

    </div>

  )

}

export default Explore; 
