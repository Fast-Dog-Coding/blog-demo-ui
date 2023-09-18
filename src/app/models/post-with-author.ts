import { Post } from './post';
import { User } from './user';

export interface PostWithAuthor {
  post: Post;
  author: User;
}
