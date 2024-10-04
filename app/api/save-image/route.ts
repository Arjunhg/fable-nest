import { storage } from "@/config/firebaseConfig";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST( req: NextRequest ){

    try {

        const data = await req.json();
        const { url } = data;

        if(!url){
            return NextResponse.json(
                {
                    error: "URL is required"
                },
                {
                    status: 400
                }
            )
        }

        // convert to base64
        const base64Image =  await convertImage(url)

        if(!base64Image){
            return NextResponse.json(
                {
                    error: "Failed to convert image to base64"
                },
                {
                    status: 400
                }
            )
        }

        const fileName = '/ai-story' + Date.now() + ".png"
        const imageRef = ref(storage, fileName);

        await uploadString(imageRef, base64Image, 'base64').then((snapshot) => {

            console.log('File Uploaded');
        })

        const downloadUrl = await getDownloadURL(imageRef);
        console.log(downloadUrl);

        return NextResponse.json(
            {
                imageUrl: downloadUrl
            },
            {
                status: 200
            }
        )
        
    } catch (error) {

        console.log('Error processing image:', error);
        return NextResponse.json(
            {
                error: 'Internal server error'
            },
            {
                status: 500
            }
        )
        
    }
}

export const convertImage = async (imageUrl: string) => {

    try {
        
        const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
        const base64Image = Buffer.from(response.data).toString('base64');

        return `data:image/png;base64,${base64Image}`;

    } catch (error) {

        console.log('Error convert base 64 image', error)
        return null;
    }
}