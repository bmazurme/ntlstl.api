import { Entity, Column } from 'typeorm';

import { BaseEntity } from '../../base-entity';

@Entity()
export class comment extends BaseEntity {
  @Column()
  body: string;
  @Column()
  userId: number;
}
