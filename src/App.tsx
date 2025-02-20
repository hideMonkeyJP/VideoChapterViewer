import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

function App() {
  // 起動時に環境変数の状態をチェック
  React.useEffect(() => {
    console.log('App mounted, checking environment:', {
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV,
      viteMode: import.meta.env.MODE,
      hasSupabaseUrl: !!import.meta.env.VITE_SUPABASE_URL,
      hasSupabaseKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY
    });
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/video/:id" element={<VideoDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;