export interface Post {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    image: string|null;
    like: number;   
    share: number;
    comment: number;
    author: {
      id: string;
      name: string;
      email: string;
    }
}