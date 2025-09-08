import React from "react";

interface PhotoCardProps {
  secureUrl?: string;
  alt?: string;
  onClick?: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ secureUrl, alt, onClick }) => {
  return (
    <div
      className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer bg-white"
      onClick={onClick}
    >
      <img
        src={secureUrl}
        alt={alt || "photo"}
        className="w-full h-60 object-cover"
      />
    </div>
  );
};

export default PhotoCard;
