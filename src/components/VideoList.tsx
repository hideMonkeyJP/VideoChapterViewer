import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, supabase, checkSupabaseConnection } from '../lib/supabase';
import { Video as VideoIcon, Loader, AlertCircle, Bug, Key } from 'lucide-react';

export default function VideoList() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<any>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        console.log('Starting to fetch videos...');
        
        // First check the connection
        const isConnected = await checkSupabaseConnection();
        console.log('Connection check result:', isConnected);
        
        if (!isConnected) {
          throw new Error('Supabaseに接続できません。環境変数が設定されていない可能性があります。');
        }

        // Debug: Test query
        console.log('Executing test query...');
        const testQuery = await supabase
          .from('videos')
          .select('*');
        
        console.log('Test query result:', testQuery);
        
        setDebug({
          supabaseUrl: import.meta.env.VITE_SUPABASE_URL ? 'exists' : 'missing',
          supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'exists' : 'missing',
          testQuery: {
            error: testQuery.error,
            status: testQuery.status,
            statusText: testQuery.statusText,
            count: testQuery.data?.length,
            data: testQuery.data
          }
        });

        if (testQuery.error) {
          console.error('Supabase query error:', testQuery.error);
          throw testQuery.error;
        }
        
        console.log('Fetched videos:', testQuery.data);
        setVideos(testQuery.data || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch videos';
        console.error('Error in fetchVideos:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg w-full">
          <div className="flex items-center mb-4">
            <Key className="w-8 h-8 text-red-500 mr-3" />
            <h2 className="text-xl font-semibold text-red-700">接続エラー</h2>
          </div>
          
          <p className="text-red-600 mb-4">{error}</p>
          
          <div className="bg-white p-4 rounded border border-red-100 mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">環境変数の状態:</h3>
            <ul className="text-sm space-y-1">
              <li className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${import.meta.env.VITE_SUPABASE_URL ? 'bg-green-500' : 'bg-red-500'}`}></span>
                VITE_SUPABASE_URL: {import.meta.env.VITE_SUPABASE_URL ? '設定済み' : '未設定'}
              </li>
              <li className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${import.meta.env.VITE_SUPABASE_ANON_KEY ? 'bg-green-500' : 'bg-red-500'}`}></span>
                VITE_SUPABASE_ANON_KEY: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '設定済み' : '未設定'}
              </li>
            </ul>
          </div>

          <p className="text-sm text-gray-600">
            .envファイルに必要な環境変数が設定されているか確認してください。
          </p>
          
          {debug && (
            <details className="mt-4">
              <summary className="cursor-pointer flex items-center text-sm text-gray-500">
                <Bug className="w-4 h-4 mr-2" />
                <span>詳細情報</span>
              </summary>
              <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
                {JSON.stringify(debug, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">ビデオライブラリ</h1>
        {debug && (
          <details className="text-sm">
            <summary className="cursor-pointer flex items-center text-gray-500">
              <Bug className="w-4 h-4 mr-2" />
              <span>デバッグ情報</span>
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
              {JSON.stringify(debug, null, 2)}
            </pre>
          </details>
        )}
      </div>
      <div className="grid gap-4">
        {videos.map((video) => (
          <Link
            key={video.id}
            to={`/video/${video.id}`}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 flex items-center space-x-4"
          >
            <div className="bg-blue-100 p-3 rounded-full">
              <VideoIcon className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{video.title}</h2>
              <p className="text-sm text-gray-500">
                {new Date(video.created_at).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
        {videos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            データベースにビデオが見つかりません
          </div>
        )}
      </div>
    </div>
  );
}