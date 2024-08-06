"use client"; 

import { useEffect, useState } from 'react';

interface Voice {
  id: string;
  name: string;
  category: string;
  labels: string[]; 
  preview_url: string;
}

export default function Home() {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [playing, setPlaying] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch('/api/voices', { method: 'GET' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch voices');
        }
        return response.json();
      })
      .then((data) => {
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

  return (
    <div style={{ backgroundColor: '#121212', color: 'white', padding: '20px' }}>
      <h1>Vozes Disponíveis</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {voices.map((voice) => (
          <li key={voice.id} style={{ marginBottom: '20px' }}>
            <div><strong>Name:</strong> {voice.name}</div>
            <div><strong>Category:</strong> {voice.category}</div>
            <div><strong>Labels:</strong> {Array.isArray(voice.labels) ? voice.labels.join(', ') : 'No labels'}</div>
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
