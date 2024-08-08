import { NextResponse } from 'next/server';
import {put} from "@vercel/blob"
import fs from "fs";
import path from "path";


export async function POST(request: Request) {
  try {
    const { text, voiceId }: { text: string; voiceId: string } = await request.json();

    if (!text || !voiceId) {
      return NextResponse.json({ error: 'Text and voiceId are required' }, { status: 400 });
    }


    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': process.env.XI_API_KEY as string,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        voice_settings: {
          stability: 0,
          similarity_boost: 0,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate audio');
    }

    const audioStream = response.body;
    if (!audioStream) {
      throw new Error('No audio stream found');
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const file = Math.random().toString(36).substring(7);

    

    await put(`${file}.mp3`, buffer, {
      access: "public"
    })

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'attachment; filename="output.mp3"'
      }
    });
  } catch (error) {
    console.error('Error:', (error as Error).message); 
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}