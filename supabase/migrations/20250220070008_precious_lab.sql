/*
  # Add test video data

  1. Test Data
    - Add sample video entry
    - Add sample segments for the video
  
  2. Security
    - Enable RLS on videos table
    - Enable RLS on segments table
    - Add policies for public read access
*/

-- Add a test video
INSERT INTO videos (id, title, file_path, duration, user_id)
VALUES (
  'test-video-1',
  'Introduction to React',
  'https://example.com/videos/react-intro.mp4',
  3600,
  'system'
);

-- Add test segments
INSERT INTO segments (video_id, segment_no, summary, start_time, end_time, thumbnail_url)
VALUES
  (
    'test-video-1',
    1,
    'Introduction and Setup',
    0,
    300,
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80'
  ),
  (
    'test-video-1',
    2,
    'Components and Props',
    301,
    900,
    'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80'
  ),
  (
    'test-video-1',
    3,
    'State and Hooks',
    901,
    1800,
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
  );

-- Enable RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE segments ENABLE ROW LEVEL SECURITY;

-- Add policies for public read access
CREATE POLICY "Allow public read access on videos"
  ON videos
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access on segments"
  ON segments
  FOR SELECT
  TO public
  USING (true);