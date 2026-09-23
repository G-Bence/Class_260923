import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';

//Hey, what is you opinion about the "Gorillaz" band?
//I think Gorillaz is a really innovative and unique band! They blend various music genres like rock, hip-hop, and electronic, and their virtual band concept with animated characters is quite creative. Their music often has a distinctive sound and they have produced some iconic tracks over the years. Overall, they have made a significant impact on the music industry with their artistic approach.
//Yeah they are definietly unique and innovative, I really like their music and the way they present themselves as a virtual band. Their music videos are also visually stunning and add to the overall experience of their music.
//Do you know their latest album The Mountain?
//Yes, "The Mountain" is one of Gorillaz's albums. It continues their tradition of blending different musical styles and features collaborations with various artists. The album has received positive reviews for its creativity and the way it pushes the boundaries of their sound. It's always exciting to see what Gorillaz will come up with next, as they consistently bring fresh ideas to the music scene.
//Hell yep! They are =), I'm just listuening to it and it is freaking awesome! The tracks are really catchy and the production quality is top-notch. It's great to see how Gorillaz continues to evolve their sound while staying true to their unique style. Do you have a favorite track from "The Mountain" so far?
//Yes, I really like the track "Cracker Island" from "The Mountain." It has a great vibe and showcases the band's signature sound. The collaboration with Thundercat adds an extra layer of depth to the song. How about you? Do you have a favorite track from the album?
//Of course, actually four: THe mountain, the Sad God, Moon cave and the Manifesto
//Those are all great choices! Each track has its own unique qualities and contributes to the overall experience of the album. "The Mountain" has a powerful and uplifting feel, while "The Sad God" has a more introspective and emotional tone. "Moon Cave" is atmospheric and immersive, and "The Manifesto" has a strong message and energy. It's clear that Gorillaz put a lot of thought and creativity into this album, and it's exciting to see how fans connect with different tracks in their own way.
//Just as you say =)

//For those who will read this, I highly recommend to listen to the album, it is really worth it!
//And also this is how you can have a nice conversation with Mr.Copilot, say Hi to ChatGPT! =)



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(import.meta.dirname, '..', 'public'));
  app.setBaseViewsDir(join(import.meta.dirname, '..', 'views'));
  app.setViewEngine('ejs');

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
