import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// CSPの設定を環境に応じて調整
const getCSPSettings = (mode: 'development' | 'production') => {
  const common = [
    "default-src 'self'",
    "img-src 'self' data: https: http:",
    "style-src 'self' 'unsafe-inline'",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co"
  ];

  if (mode === 'development') {
    // 開発環境では必要な許可を追加
    common.push("script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'");
    common.push("worker-src 'self' blob:");
  } else {
    // 本番環境ではより制限的な設定
    common.push("script-src 'self' 'unsafe-inline'");
    common.push("worker-src 'self'");
  }

  return common.join('; ');
};

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'supabase-vendor': ['@supabase/supabase-js'],
        },
      },
    },
  },
  define: {
    'process.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL),
    'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY),
  },
  server: {
    headers: {
      'Content-Security-Policy': getCSPSettings('development')
    }
  }
}));