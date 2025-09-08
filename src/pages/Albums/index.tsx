import { useEffect, useState } from "react";
import AlbumList from "../../components/album/AlbumList";
import { deleteAlbum, getAllAlbums, updateAlbum } from "../../services/albums.service";

const Albums = () => {
  const [albums, setAlbums] = useState([]);

  const fetchAlbums = async () => {
    try {
      const res = await getAllAlbums();
      setAlbums(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleUpdate = async (
    id: string | number,
    data: { title?: string; description?: string; cover?: string }
  ) => {
    try {
      await updateAlbum(id, data);
      await fetchAlbums(); // reload list sau update
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deleteAlbum(id);
      await fetchAlbums();
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="p-6">
      <AlbumList albums={albums} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
};

export default Albums;
