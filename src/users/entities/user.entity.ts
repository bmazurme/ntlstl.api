import { Entity, Column, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';

import { BaseEntity } from '../../base-entity';

import { Post } from '../../posts/entities/post.entity';

@Entity()
export class User extends BaseEntity {
  @Column({
    unique: true,
  })
  @IsEmail()
  email: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  // @OneToMany(() => UserRole, (userRole) => userRole.id)
  // public userRole: UserRole[];
}
