import React from "react";
import AlbumCard from "../AlbumCard";

interface Album {
  id: number | string;
  title: string;
  description?: string;
  cover_image?: string[];
}

interface AlbumListProps {
  albums?: Album[];
  onUpdate: (
    id: string | number,
    data: { title?: string; description?: string; cover?: string }
  ) => void;
  onDelete: (id: string | number) => void
}

const AlbumList: React.FC<AlbumListProps> = ({ albums = [], onUpdate, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          id={album.id}
          title={album.title}
          coverPhotos={album.cover_image || []}
          description={album.description}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default AlbumList;
