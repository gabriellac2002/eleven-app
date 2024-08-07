import React from 'react';
import { UserIcon } from '@heroicons/react/24/solid'; // Importe o ícone de pessoa

interface Voice {
  voice_id: string;
  name: string;
  category: string;
  labels: string[];
  preview_url: string;
}

interface VoiceItemProps {
  voice: Voice;
  onPlayPause: (url: string) => void;
  onGenerateAudio: (voiceId: string) => void;
  isPlaying: string | null;
  isLoading: string | null;
}

const VoiceItem: React.FC<VoiceItemProps> = ({ voice, onPlayPause, onGenerateAudio, isPlaying, isLoading }) => {
    return (
        <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center p-4">
          <div className="w-24 h-24 mb-3 mt-5 rounded-full flex items-center justify-center bg-gray-800 dark:bg-gray-700">
            <UserIcon className="w-14 h-14 text-green-500 dark:text-green-400" />
          </div>
          <h5 className="mb-1 text-xl font-medium text-white">{voice.name}</h5>
          <span className="text-sm text-gray-400">{voice.category}</span>
          <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
            {voice.labels.length > 0 ? voice.labels.join(', ') : 'No labels'}
          </div>
          <div className="flex mt-4 space-x-2">
            <button
              onClick={() => onGenerateAudio(voice.voice_id)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading === voice.voice_id ? 'Loading...' : 'Generate & Play'}
            </button>
            <button
              onClick={() => onPlayPause(voice.preview_url)}
              className="py-2 px-4 text-sm font-medium text-gray-100 bg-gray-800 rounded-lg border border-gray-700 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-600 dark:bg-gray-900 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              {isPlaying === voice.preview_url ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
    );
};

export default VoiceItem;
