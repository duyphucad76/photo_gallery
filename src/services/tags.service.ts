import axiosInstance from "./http"

export const getAllTags = async () => {
    const res = await axiosInstance.get('/tags')
    return res.data.metadata
}

export const createTag = async (name: string) => {
    const res = await axiosInstance.post('/tags', {name: name})
    return res.data.message
}

export const deleteTag = async (tagId: string | number) => {
    const res = await axiosInstance.delete(`/tags/:${tagId}`,)
    return res.data.metadata
}