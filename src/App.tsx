import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

function App() {
  console.log('App rendering, env vars:', {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'exists' : 'missing'
  });

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