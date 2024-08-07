"use client"; 
import { useEffect, useState } from 'react';

interface Voice {
  voice_id: string; 
  name: string;
  category: string;
  labels: string[]; 
  preview_url: string;
}

export default function Home() {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [playing, setPlaying] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/voices', { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch voices');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.voices); 
        setVoices(data.voices);
      })
      .catch((error) => {
        console.error('Error fetching voices:', error);
      });
  }, []);

  const handlePlayPause = (url: string) => {
    if (playing === url) {
      audio?.pause();
      setPlaying(null);
    } else {
      if (audio) {
        audio.pause();
      }
      const newAudio = new Audio(url);
      newAudio.play();
      setAudio(newAudio);
      setPlaying(url);
    }
  };

  const handleGenerateAudio = (voiceId: string) => {
    if (!text.trim()) return;
  
    console.log('Generating audio for voiceId:', voiceId);
  
    fetch('/api/generate-audio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, voiceId }), 
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }
      return response.blob(); 
    })
    .then((blob) => {
      const newAudio = new Audio(URL.createObjectURL(blob));
      newAudio.play();
      setAudio(newAudio);
      setPlaying(URL.createObjectURL(blob));
    })
    .catch((error) => {
      setLoading(null);
      console.error('Error generating audio:', error);
    });
  };
  

  return (
    <div style={{ backgroundColor: '#121212', color: 'white', padding: '20px' }}>
      <h1>Vozes Disponíveis</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        style={{ width: '100%', padding: '10px', borderRadius: '4px', marginBottom: '20px', color:'black' }}
        placeholder="Digite o texto para gerar áudio..."
      />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {voices.map((voice) => (
          <li key={voice.voice_id} style={{ marginBottom: '20px' }}>
            <div><strong>Name:</strong> {voice.name}</div>
            <div><strong>Category:</strong> {voice.category}</div>
            <div><strong>Labels:</strong> {Array.isArray(voice.labels) ? voice.labels.join(', ') : 'No labels'}</div>
            {text.trim() && (
              <button
                onClick={() => handleGenerateAudio(voice.voice_id)} 
                style={{ marginTop: '10px', padding: '10px', backgroundColor: '#1DB954', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                {loading === voice.voice_id ? 'Loading...' : 'Generate & Play'}
              </button>
            )}
            <button
              onClick={() => handlePlayPause(voice.preview_url)}
              style={{ marginTop: '10px', padding: '10px', backgroundColor: '#1DB954', color: 'white', border: 'none', borderRadius: '4px' }}
            >
              {playing === voice.preview_url ? 'Pause' : 'Play'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
