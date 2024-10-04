import { NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export async  function POST(req: NextRequest){

    const data = await req.json();

    const { prompt } = data;

    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_KEY
    });

    const input = {

        prompt: prompt,
        output_format: 'png',
        "output_quality": 80,
        aspect_ratio: '1:1'
    }

    // const input = {
    //     prompt: "black forest gateau cake spelling out the words \"FLUX SCHNELL\", tasty, food photography, dynamic shot",
    //   };
      
      const output: any = await replicate.run("black-forest-labs/flux-schnell", { input });
      console.log(output);

    return NextResponse.json({"imageUrl":output[0]});
}


// import { NextRequest, NextResponse } from "next/server";
// import Replicate from "replicate";

// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_KEY,
// });

// export async function POST(req: NextRequest) {
//   try {
//     // Input validation
//     if (!req.body) {
//       return NextResponse.json({ error: "Request body is missing" }, { status: 400 });
//     }

//     const data = await req.json();

//     if (!data.prompt || typeof data.prompt !== "string") {
//       return NextResponse.json({ error: "Invalid or missing prompt" }, { status: 400 });
//     }

//     const { prompt } = data;

//     // Check for API key
//     if (!process.env.REPLICATE_API_KEY) {
//       console.error("REPLICATE_API_KEY is not set");
//       return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
//     }

//     const input = {
//       prompt: prompt,
//       output_format: "png",
//       output_quality: 80,
//       aspect_ratio: "1:1",
//     };

//     const output = await replicate.run("black-forest-labs/flux-schnell", { input });

//     if (!output || !Array.isArray(output) || output.length === 0) {
//       return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
//     }

//     const imageUrl = output[0];
    
//     if (typeof imageUrl !== 'string') {
//       return NextResponse.json({ error: "Invalid image URL generated" }, { status: 500 });
//     }

//     return NextResponse.json({ imageUrl });
//   } catch (error) {
//     console.error("Error in image generation:", error);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }