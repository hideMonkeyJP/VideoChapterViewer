import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase Configuration:', {
  url: supabaseUrl ? 'exists' : 'missing',
  key: supabaseKey ? 'exists' : 'missing'
});

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Required Supabase environment variables are missing. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('videos').select('count');
    if (error) {
      console.error('Supabase connection error:', error);
      throw error;
    }
    console.log('Supabase connection successful:', data);
    return true;
  } catch (error) {
    console.error('Failed to connect to Supabase:', error);
    return false;
  }
}

export type Video = {
  id: string;
  title: string;
  file_path: string;
  duration: number;
  created_at: string;
  user_id: string;
};

export type Segment = {
  id: string;
  video_id: string;
  segment_no: number;
  summary: string;
  start_time: number;
  end_time: number;
  thumbnail_url: string;
  created_at: string;
};