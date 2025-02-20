import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase環境変数が設定されていません');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || '',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'X-Client-Info': 'video-chapter-viewer'
      }
    }
  }
);

export async function checkSupabaseConnection() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return false;
  }

  try {
    const { data, error } = await supabase.from('videos').select('count');
    if (error) {
      console.error('Supabase接続エラー:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Supabase接続チェック中にエラーが発生:', error);
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