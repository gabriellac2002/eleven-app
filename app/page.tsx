"use client"; 
import { useEffect, useState } from 'react';
import VoiceItem from './components/voice-item/voiceItem';
import Jumbotron from './components/jumbotron/Jumbotron';
import { Voice } from './types/voice';

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
    setLoading(voiceId);
  
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
      setLoading(null);
    })
    .catch((error) => {
      setLoading(null);
      console.error('Error generating audio:', error);
    });
  };

  return (
    <div>
      <Jumbotron 
        title="Transforme o Texto em Voz" 
        subtitle="Liberte o poder da nossa tecnologia de ponta para gerar fala realista e cativante em uma ampla gama de idiomas." 
        targetSectionId="audio-section"
      />
      <div id="audio-section" className="bg-gray-900 text-white p-8">
        <div className="mb-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="block p-2.5 w-full text-sm text-white bg-gray-800 rounded-lg border border-gray-700 focus:ring-green-500 focus:border-green-500"
            placeholder="Digite o texto para gerar áudio..."
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {voices.map((voice) => (
            <VoiceItem
              key={voice.voice_id}
              voice={voice}
              onPlayPause={handlePlayPause}
              onGenerateAudio={handleGenerateAudio}
              isPlaying={playing}
              isLoading={loading}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
