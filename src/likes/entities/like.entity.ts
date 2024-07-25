import { Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../base-entity';

import { Post } from '../../posts/entities/post.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Like extends BaseEntity {
  @ManyToOne(() => Post, (post) => post.like)
  post: Post;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
