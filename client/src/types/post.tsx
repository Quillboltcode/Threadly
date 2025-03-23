export interface Post {
    id: string;
    content: string;
    tag: string[];
    createdAt: string;
    updatedAt: string;
    image: string[]|null;
    like: number;   
    share: number;
    comment: number;
    repost: boolean;
    author :{
      name: string
      email: string
      avatar: string
    }
}