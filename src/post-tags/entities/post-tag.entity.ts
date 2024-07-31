import { Entity, Column } from 'typeorm';

import { BaseEntity } from '../../base-entity';

@Entity()
export class PostTag extends BaseEntity {
  @Column()
  postId: number;
  @Column()
  tagId: number;
}
