import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseKey
  });
  throw new Error('Required environment variables VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are not set');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Debug function to check connection
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('videos').select('count');
    if (error) throw error;
    console.log('Supabase connection successful', { count: data });
    return true;
  } catch (error) {
    console.error('Supabase connection failed:', error);
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