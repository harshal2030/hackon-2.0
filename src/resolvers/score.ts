import { Score } from 'src/entities/Score';
import { MyContext } from 'src/types';
import { Resolver, Query, Arg, Ctx, InputType, Field, ObjectType, Mutation, Int } from 'type-graphql';
import { User } from '../entities/User';

@ObjectType()
class ScoreRes {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => Score, { nullable: true })
  score?: Score;
}

@InputType()
class ScoreType {
  @Field(() => Int)
  score: number;

  @Field()
  email: string;
}

@Resolver()
export class UserResolver {
  @Query(() => ScoreRes)
  async me(
    @Arg('email', () => String) email: string,
    @Ctx() { em }: MyContext
  ): Promise<ScoreRes> {
    const score = await em.findOne(Score, { email });

    if (!score) {
      return { error: 'No such score found' }
    }

    return { score };
  }

  @Mutation(() => ScoreRes)
  async registerScore(
    @Arg('options') options: ScoreType,
    @Ctx() { em }: MyContext
  ): Promise<ScoreRes> {
    const user = await em.findOne(User, { email: options.email });

    if (!user) {
      return {
        error: 'No such user',
      }
    }

    const score = em.create(Score, options);
    await em.persistAndFlush(score);

    return { score };
  }
}
