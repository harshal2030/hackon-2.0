import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
@Entity()
export class Score {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({type: 'date'})
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updateAt = new Date();

  @Field(() => String)
  @Property({ type: 'text', unique: true })
  email!: string;

  @Field(() => Int)
  @Property({ type: 'int' })
  score!: number;
}
