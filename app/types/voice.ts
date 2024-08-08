import { Labels } from './labels';

export interface Voice {
  voice_id: string;
  name: string;
  category: string;
  labels: Labels;
  preview_url: string;
}
