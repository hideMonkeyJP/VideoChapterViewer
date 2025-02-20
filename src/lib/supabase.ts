import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase Config:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseKey,
  urlPreview: supabaseUrl ? `${supabaseUrl.slice(0, 20)}...` : 'missing',
  keyPreview: supabaseKey ? `${supabaseKey.slice(0, 8)}...` : 'missing'
});

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables for Supabase configuration');
  throw new Error('環境変数が設定されていません。VITE_SUPABASE_URLとVITE_SUPABASE_ANON_KEYを確認してください。');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

export async function checkSupabaseConnection() {
  try {
    console.log('Checking Supabase connection...');
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Cannot check connection: Missing Supabase credentials');
      return false;
    }

    // First try a simple health check
    const { error: healthError } = await supabase.from('videos').select('count');
    if (healthError) {
      console.error('Health check failed:', healthError);
      return false;
    }

    // Try to fetch actual data
    const { data, error, status, statusText } = await supabase
      .from('videos')
      .select('*')
      .limit(1);
    
    console.log('Connection check details:', {
      success: !error,
      status,
      statusText,
      error: error?.message,
      hasData: !!data,
      dataCount: data?.length
    });
    
    if (error) {
      console.error('Supabase query error:', error);
      return false;
    }

    console.log('Connection successful, sample data:', data);
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