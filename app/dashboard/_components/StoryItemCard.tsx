import { Button } from "@nextui-org/button";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import Image from "next/image";
import Link from "next/link";

type StoryItemType = {

    story: {
        id: string,
        storyType: string,
        ageGroup: string,
        coverImage: string,
        imageStyle: string,
        userEmail: string,
        userImage: string,
        userName: string,
        output: [] | any,
        storyId: string,
        storySubject: string
    }
 
}

function StoryItemCard( {story}:StoryItemType ) {
  return (

    <Link href={'/view-story/'+story?.storyId}>
        <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7 hover:scale-105 transition-all cursor-pointer">

            <Image
                alt="Relaxing app background"
                className="z-0 w-full h-full object-cover"
                src={'/three.png'}
                width={500}
                height={500}
            />

            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">

                <div className="flex flex-grow gap-2 items-center">
                    <div className="flex flex-col">
                        <p className=" text-black/60 text-[15px]">{story.output?.story_cover?.title}</p>
                    </div>
                </div>

                <Button radius="full" size="sm" className="text-primary">Read Now</Button>

            </CardFooter>
        </Card>
    </Link>

  )
}

export default StoryItemCard
