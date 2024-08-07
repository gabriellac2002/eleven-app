import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { text, voiceId }: { text: string; voiceId: string } = await request.json();
    console.log('Received text:', text); 
    console.log('Received voiceId:', voiceId); 

    if (!text || !voiceId) {
      return NextResponse.json({ error: 'Text and voiceId are required' }, { status: 400 });
    }

    console.log("cheguei aqui")

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'xi-api-key': process.env.XI_API_KEY as string,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8,
          style: 0.0,
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate audio');
    }

    const audioStream = response.body;
    if (!audioStream) {
      throw new Error('No audio stream found');
    }

    return new NextResponse(audioStream, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'attachment; filename="output.mp3"'
      }
    });
  } catch (error) {
    console.error('Error:', (error as Error).message); // Adicionado para depuração
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
