export interface Photo {
  id: string;
  secureUrl: string;
  tags: string[];
  album?: {
    id: string;
    title: string
  };
}

export interface PhotoGroupI {
  month: string;
  year: string;
  photos: Photo[];
}

export interface PhotoCardI {
  src: string;
  title?: string;
  description?: string;
  onClick?: () => void;
}

export interface AlbumGridI {
  photos: Photo[];
  onPhotoClick?: (photo: Photo) => void;
}