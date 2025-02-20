import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

function App() {
  // 環境変数の状態をチェック
  React.useEffect(() => {
    const envCheck = {
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
      supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
      mode: import.meta.env.MODE,
      timestamp: new Date().toISOString()
    };
    
    console.log('Environment check:', {
      ...envCheck,
      hasUrl: !!envCheck.supabaseUrl,
      hasKey: !!envCheck.supabaseKey
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