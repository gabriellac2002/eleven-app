import { FC } from 'react';

interface VoiceItemProps {
  voice: {
    voice_id: string;
    name: string;
    category: string;
    labels: string[];
    preview_url: string;
  };
  text: string;
  onGenerateAudio: (voiceId: string) => void;
  onPlayPause: (url: string) => void;
  playing: string | null;
}

const VoiceItem: FC<VoiceItemProps> = ({ voice, text, onGenerateAudio, onPlayPause, playing }) => {
  return (
    <li key={voice.voice_id} style={{ marginBottom: '20px' }}>
      <div><strong>Name:</strong> {voice.name}</div>
      <div><strong>Category:</strong> {voice.category}</div>
      <div><strong>Labels:</strong> {Array.isArray(voice.labels) ? voice.labels.join(', ') : 'No labels'}</div>
      {text.trim() && (
        <button
          onClick={() => onGenerateAudio(voice.voice_id)}
          style={{ marginTop: '10px', padding: '10px', backgroundColor: '#1DB954', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          {playing === voice.voice_id ? 'Loading...' : 'Generate & Play'}
        </button>
      )}
      <button
        onClick={() => onPlayPause(voice.preview_url)}
        style={{ marginTop: '10px', padding: '10px', backgroundColor: '#1DB954', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        {playing === voice.preview_url ? 'Pause' : 'Play'}
      </button>
    </li>
  );
};

export default VoiceItem;
