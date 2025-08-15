export interface PhotoI {
  id: string;
  src: string;
  title: string;
  date: string;
  category: "beautiful" | "moments" | "people" | "places" | "things";
  type: "image" | "video";
}

export interface PhotoGroupI {
  month: string;
  year: string;
  photos: PhotoI[];
}
