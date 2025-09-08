import { useEffect, useState } from "react"
import { getAllFavoriteImages, removeFavoriteImages } from "../../services/images.service"
import PhotoCard from "../../components/photo/PhotoCard";

interface ImageI {
    id: string;
    secureUrl: string;
    alt?: string;
}

const Favorites = () => {
    const [favoriteImages, setFavoriteImages] = useState<ImageI[]>([])

    const [loading, setLoading] = useState(false);
    const [removeMode, setRemoveMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);



    const fetchFavoriteImages = async () => {
        try {
            const res = await getAllFavoriteImages()
            setFavoriteImages(res)
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {

        fetchFavoriteImages()
    }, [])


    const handleToogleMode = () => {
        setRemoveMode(!removeMode)
        setSelectedIds([]);

    }
    const toggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        );
    };
    const handleRemove = async () => {
        try {
            await removeFavoriteImages(selectedIds)
            fetchFavoriteImages()
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <>
            <div className="p-6">
                {/* Nút xóa */}
                <div className="flex gap-3 mb-4">
                    <button
                        onClick={handleToogleMode}
                        className={`px-3 py-1 rounded ${removeMode ? "bg-red-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        {removeMode ? "Thoát chế độ xóa" : "Xóa ảnh khỏi mục yêu thích"}
                    </button>
                    {removeMode && selectedIds.length > 0 && (
                        <button
                            onClick={handleRemove}
                            className="ml-auto px-4 py-1 rounded bg-green-500 text-white"
                        >
                            Xóa {selectedIds.length} ảnh
                        </button>
                    )}
                </div>

                {/* Grid ảnh */}
                {loading ? (
                    <p>Đang tải...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {favoriteImages.map((image) => {
                            const isSelected = selectedIds.includes(image.id);

                            return (
                                <div
                                    key={image.id}
                                    className={`relative rounded-lg overflow-hidden border-4 ${isSelected
                                        ? "border-red-500"
                                        : "border-transparent hover:border-gray-300"
                                        } ${removeMode ? "cursor-pointer" : ""}`}
                                    onClick={() => removeMode && toggleSelect(image.id)}
                                >
                                    <PhotoCard secureUrl={image.secureUrl} alt={image.alt} />
                                    {isSelected && (
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-lg font-bold">
                                            ✓
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    )
}

export default Favorites