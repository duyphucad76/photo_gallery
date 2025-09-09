import axiosInstance from "./http";

export const getAllImages = async (search?: string,page?:number,limit?:number) => {
  const res = await axiosInstance.get("/images/?", { params: { search, page, limit } });
  return res.data.metadata;
};

export const uploadImages = async (formData: FormData) => {
  const res = await axiosInstance.post("/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.metadata
}

export const deleteImage = async (id: string | number) => {
  const numericId = Number(id)
  const res = await axiosInstance.delete(`/images/${numericId}`)
  return res.data.metadata
}

export const addImageToAlbum = async (imageId: string | number, albumId: string | number) => {
  const numericId = Number(imageId)
  const res = await axiosInstance.post(`/images/${numericId}/add-to-album`, { albumId })
  return res.data.metadata
}

export const removeImageFromAlbum = async (imageId: string | number) => {
  const numericId = Number(imageId)
  const res = await axiosInstance.delete(`/images/${numericId}/remove-from-album`)
  return res.data.metadata
}

export const getAllFavoriteImages = async () => {
  const res = await axiosInstance.get('/images/favorites/list')
  return res.data.metadata.favoriteImages
}

export const addFavoriteImages = async (imageIds: Array<string | number>) => {
  const res = await axiosInstance.post('/images/favorites/add-multiple', { imageIds })
  return res.data.message
}

export const removeFavoriteImages = async (imageIds: Array<string | number>) => {
  const res = await axiosInstance.post('/images/favorites/remove-multiple', { imageIds })
  return res.data.message
}