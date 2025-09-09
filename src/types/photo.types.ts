export interface PhotoI {
  id: string;
  secureUrl: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  tags: string[];
  album?: {
    id: string;
    title: string
  };
}
