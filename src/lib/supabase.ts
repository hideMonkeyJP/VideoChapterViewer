import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 起動時に環境変数の状態を詳しくログ出力
console.log('Environment Variables Check:', {
  timestamp: new Date().toISOString(),
  environment: import.meta.env.MODE,
  variables: {
    VITE_SUPABASE_URL: {
      exists: !!supabaseUrl,
      type: typeof supabaseUrl,
      length: supabaseUrl?.length,
      preview: supabaseUrl ? `${supabaseUrl.slice(0, 10)}...` : 'undefined'
    },
    VITE_SUPABASE_ANON_KEY: {
      exists: !!supabaseKey,
      type: typeof supabaseKey,
      length: supabaseKey?.length,
      preview: supabaseKey ? `${supabaseKey.slice(0, 5)}...` : 'undefined'
    }
  }
});

// 環境変数が不足している場合は明確なエラーメッセージを表示
if (!supabaseUrl || !supabaseKey) {
  console.error('Critical: Missing Supabase credentials', {
    missingUrl: !supabaseUrl,
    missingKey: !supabaseKey
  });
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseKey || 'placeholder-key'
);

export async function checkSupabaseConnection() {
  try {
    console.log('Starting Supabase connection check...');
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        '環境変数が設定されていません:\n' +
        (!supabaseUrl ? '- VITE_SUPABASE_URL が未設定\n' : '') +
        (!supabaseKey ? '- VITE_SUPABASE_ANON_KEY が未設定\n' : '')
      );
    }

    // 接続テスト
    console.log('Testing database connection...');
    const { data, error } = await supabase.from('videos').select('count');
    
    if (error) {
      console.error('Database connection failed:', error);
      throw error;
    }

    console.log('Database connection successful:', {
      timestamp: new Date().toISOString(),
      result: data
    });

    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました';
    console.error('Connection check failed:', {
      timestamp: new Date().toISOString(),
      error: errorMessage
    });
    throw error;
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