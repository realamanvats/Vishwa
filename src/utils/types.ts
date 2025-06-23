export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  images: string[];
  videoUrl?: string;
  driveVideoUrl?: string; // For Google Drive videos
}

export interface PhotoAlbum {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  images: string[];
  description: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  embedUrl: string;
  duration: string;
  platform?: 'youtube' | 'vimeo' | 'google-drive'; // Platform identifier
}

export interface TeamMember {
  name: string;
  role: string;
  image?: string;
}