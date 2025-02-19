import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Video, supabase, checkSupabaseConnection } from '../lib/supabase';
import { Video as VideoIcon, Loader, AlertCircle } from 'lucide-react';

export default function VideoList() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        // First check the connection
        const isConnected = await checkSupabaseConnection();
        if (!isConnected) {
          throw new Error('Could not connect to Supabase');
        }

        const { data, error } = await supabase
          .from('videos')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase query error:', error);
          throw error;
        }
        
        console.log('Fetched videos:', data);
        setVideos(data || []);
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
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold mb-2">Error</p>
          <p className="text-sm">{error}</p>
          <p className="text-sm mt-4">Please check your Supabase connection and environment variables.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Video Library</h1>
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
            No videos found in the database
          </div>
        )}
      </div>
    </div>
  );
}