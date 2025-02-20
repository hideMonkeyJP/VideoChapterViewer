import { createClient } from '@supabase/supabase-js';

// @ts-ignore - グローバル変数の型定義
declare const __SUPABASE_URL__: string;
// @ts-ignore - グローバル変数の型定義
declare const __SUPABASE_KEY__: string;

const supabaseUrl = __SUPABASE_URL__;
const supabaseKey = __SUPABASE_KEY__;

// 環境変数のチェックを強化
if (!supabaseUrl || !supabaseKey) {
  console.error('Critical: Supabase credentials are missing', {
    url: {
      exists: !!supabaseUrl,
      value: supabaseUrl || 'undefined'
    },
    key: {
      exists: !!supabaseKey,
      length: supabaseKey?.length || 0
    }
  });
  throw new Error('Supabase credentials are not properly configured');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function checkSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...');
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