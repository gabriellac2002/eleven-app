import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: {
        "Accept": "application/json",
        "xi-api-key": process.env.XI_API_KEY as string,
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch voices' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
