import { Entity, Column, ManyToOne, OneToMany, JoinTable } from 'typeorm';
import { Length } from 'class-validator';

import { BaseEntity } from '../../base-entity';

import { User } from '../../users/entities/user.entity';
import { Like } from '../../likes/entities/like.entity';
import { PostTag } from '../../post-tags/entities/post-tag.entity';

@Entity()
export class Post extends BaseEntity {
  @Column()
  @Length(1, 250)
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Like, (like) => like.post)
  like: Like[];

  @OneToMany(() => PostTag, (postTag) => postTag.id)
  @JoinTable()
  postTag: PostTag[];
}
