/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Create kids story on description for 5-8 years kid., educational story and all images in paper cut style: Story of boy and magic school , give me 5 chapter with detailed image text prompt for each of the chapter and image prompt for story cover book with story name, all in JSON field format.\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"story_cover\": {\n    \"image_prompt\": \"A paper cut style illustration of a young boy, with a curious look on his face, standing in front of a majestic, magical school. The school should have sparkling windows, floating books, and a whimsical, colorful design. Above the school, a large, shimmering star with wings is flying, casting a magical glow. The title of the story, \\\"The Boy and the Magic School,\\\" should be written in a playful, whimsical font on the bottom of the image.\",\n    \"title\": \"The Boy and the Magic School\"\n  },\n  \"chapters\": [\n    {\n      \"chapter_title\": \"The Curious Boy\",\n      \"image_prompt\": \"A paper cut style illustration of a young boy, with wide, curious eyes, looking up at a large, glowing tree. The tree is surrounded by twinkling lights and a small, magical creature with wings is flying around it. The boy is holding a book with a cover that has a question mark on it.\",\n      \"text\": \"Once upon a time, there lived a boy named Leo, who loved to learn. Every day, he would spend hours reading books, but he always wished for more knowledge. One sunny afternoon, Leo discovered a strange, glowing tree in the forest near his home. The tree shimmered with magical light, and small, winged creatures flew around it. Curiosity got the best of Leo, and he cautiously approached the tree. As he got closer, he noticed a book lying at the base of the tree. The book had a cover with a large question mark on it.  Leo picked up the book, and as he opened it, a voice whispered, \\\"Welcome, young scholar. This book holds the key to a place where learning is magic.\\\"  Leo gasped in amazement. Could this be the start of an incredible adventure? \"\n    },\n    {\n      \"chapter_title\": \"The Magical Portal\",\n      \"image_prompt\": \"A paper cut style illustration of the young boy standing in front of a swirling, colorful portal, surrounded by sparkling dust. The portal is shaped like a giant book with a magical glow. The boy is holding a book in his hand, looking with wonder at the portal.\",\n      \"text\": \"As Leo read the book, the pages began to glow. The words seemed to come alive, and a shimmering portal appeared in front of him. The portal was shaped like a giant book, with swirling colors and sparkling dust. The boy couldn't believe his eyes. He had never seen anything like it before.  The book in his hand began to float, guiding him towards the portal. With a deep breath, Leo stepped through the portal. The world around him dissolved in a burst of colors, and he found himself in a place unlike anything he had ever imagined.\"\n    },\n    {\n      \"chapter_title\": \"Welcome to Magic School\",\n      \"image_prompt\": \"A paper cut style illustration of the young boy, now wearing a magical robe, walking through a grand, colorful school. The school is filled with whimsical classrooms, floating books, and students learning magical skills. In the background, a friendly wizard with a long beard and a sparkling wand is welcoming the boy.\",\n      \"text\": \"Leo found himself in the grand courtyard of the Magic School. The school was filled with whimsical classrooms, floating books, and students of all ages learning magical skills. The air buzzed with excitement and the sound of laughter.  A friendly wizard with a long beard and a sparkling wand greeted Leo. \\\"Welcome, young scholar, to the Magic School! Here, you will learn the wonders of magic and discover the secrets of the universe.\\\"  Leo was thrilled. He couldn't wait to start his magical journey.\"\n    },\n    {\n      \"chapter_title\": \"Lessons in Magic\",\n      \"image_prompt\": \"A paper cut style illustration of the young boy sitting at a desk in a classroom filled with magical objects. The boy is practicing a simple spell, with a small, glowing ball floating in the air. Other students are learning various magical skills, like levitating objects, controlling fire, and reading minds.\",\n      \"text\": \"Leo's first lesson was in the Spellcraft classroom. The classroom was filled with magical objects: glowing crystals, swirling potions, and enchanted books.  The teacher, a wise old witch named Willow, taught Leo a simple spell to make a small ball of light float in the air. Leo practiced diligently, and soon, he was able to make the ball of light dance and twirl with a wave of his hand.  Other students were learning various magical skills: levitating objects, controlling fire, and reading minds. Leo was amazed by the endless possibilities of magic.\"\n    },\n    {\n      \"chapter_title\": \"The Magic of Friendship\",\n      \"image_prompt\": \"A paper cut style illustration of the young boy, surrounded by his new magical friends, all wearing different colored robes and carrying magical objects. They are playing a game of magical tag in a beautiful, enchanted garden filled with glowing flowers and magical creatures. The boy is smiling and laughing, enjoying his time with his new friends.\",\n      \"text\": \"As Leo spent more time at the Magic School, he made new friends. He met a playful pixie named Luna, who could talk to animals, and a brave dragon named Sparky, who could breathe fire. They played magical games in the enchanted garden, where glowing flowers danced and magical creatures flew through the air.  Leo realized that the magic school wasn't just about learning spells; it was about making friends, discovering new things, and embracing the wonders of the world. He felt happy and grateful for his new life and the magic that surrounded him. He knew that no matter where life took him, he would always remember the magic he found at the Magic School.\"\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });
  

 