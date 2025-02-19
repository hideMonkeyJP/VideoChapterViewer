import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mlidxmirlzzrvdujgtab.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1saWR4bWlybHp6cnZkdWpndGFiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTg5MDM3NCwiZXhwIjoyMDU1NDY2Mzc0fQ.4TM-35Q-4ZdmhG5xwcmNFhwgacsapezcXCufuhPxcm0';

export const supabase = createClient(supabaseUrl, supabaseKey);

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