import { createClient } from '@supabase/supabase-js';

const getSupabaseConfig = () => {
  const url = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error('Supabase configuration is missing:', {
      hasUrl: !!url,
      hasKey: !!key,
      mode: import.meta.env.MODE
    });
  }

  return { url, key };
};

const { url: supabaseUrl, key: supabaseKey } = getSupabaseConfig();

export const supabase = createClient(
  supabaseUrl || '',
  supabaseKey || '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

export async function checkSupabaseConnection() {
  const config = getSupabaseConfig();
  if (!config.url || !config.key) {
    console.error('Supabase credentials are not configured');
    return false;
  }

  try {
    console.log('Checking Supabase connection...');
    const { data, error } = await supabase.from('videos').select('count');
    
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
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