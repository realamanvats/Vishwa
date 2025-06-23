// Google Drive Video Helper Functions

export interface GoogleDriveVideo {
  id: string;
  title: string;
  description: string;
  driveFileId: string;
  thumbnail?: string;
  duration?: string;
}

/**
 * Convert Google Drive sharing URL to embed URL
 * Input: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * Output: https://drive.google.com/file/d/FILE_ID/preview
 */
export const convertDriveUrlToEmbed = (driveUrl: string): string => {
  // Extract file ID from various Google Drive URL formats
  const fileIdMatch = driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  
  if (fileIdMatch && fileIdMatch[1]) {
    const fileId = fileIdMatch[1];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  // If it's already an embed URL, return as is
  if (driveUrl.includes('/preview')) {
    return driveUrl;
  }
  
  throw new Error('Invalid Google Drive URL format');
};

/**
 * Get thumbnail URL for Google Drive video
 */
export const getDriveThumbnail = (fileId: string): string => {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
};

/**
 * Check if Google Drive file is publicly accessible
 */
export const isDriveFilePublic = async (fileId: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://drive.google.com/file/d/${fileId}/view`, {
      method: 'HEAD',
      mode: 'no-cors'
    });
    return true; // If no error, file is accessible
  } catch (error) {
    return false;
  }
};

/**
 * Extract file ID from Google Drive URL
 */
export const extractFileId = (driveUrl: string): string | null => {
  const fileIdMatch = driveUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
  return fileIdMatch ? fileIdMatch[1] : null;
};