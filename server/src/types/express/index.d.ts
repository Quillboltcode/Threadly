import { Request } from 'express';
import { IUser } from '../../models/User';
import { IComment } from 'models/Comment';
import { IPost } from 'models/Post';
import { ILike } from 'models/Like';

// declare global {
//   namespace Express {
//     interface Request {
//       user: IUser;
//       comment?: IComment;
//       post?: IPost;
//       like?: ILike;
//     }
//   }
// }
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
declare module 'express-serve-static-core' {
  interface Request {
      user: IUser;
      comment?: IComment;
      post?: IPost;
      like?: ILike;
  }
}