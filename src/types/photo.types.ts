export interface PhotoI {
  id: string;
  secureUrl: string;
  tags: string[];
  album?: {
    id: string;
    title: string
  };
}
