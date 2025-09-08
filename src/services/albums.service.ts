import axiosInstance from "./http";

export const createAlbum = async (title: string, description: string, cover_image: File) => {
    const res = await axiosInstance.post('/albums', { title, description, cover_image })
    return res.data.metadata
}
export const getAllAlbums = async () => {
    const res = await axiosInstance.get('/albums')
    return res.data.metadata.albums
}

export const deleteAlbum = async (id: number | string) => {
    const res = await axiosInstance.delete(`/albums/${id}`)
    return res.data
}

export const updateAlbum = async (id: number | string, data: { title?: string, description?: string, cover_image?: string }) => {
    const res = await axiosInstance.patch(`/albums/${id}`, { title: data.title, description: data.description, cover_image: data.cover_image })
    return res.data.message
}

export const getAllImagesInAlbum = async (id: number | string) => {
    const res = await axiosInstance.get(`/images/album/${id}`)
    return res.data.metadata
}
