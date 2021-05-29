import { MyContext } from 'src/types';
import { Resolver, Query, Arg, Ctx, InputType, Field, ObjectType, Mutation } from 'type-graphql';
import { User } from '../entities/User';
import validator from 'validator';


@ObjectType()
class UserRes {
  @Field(() => String, { nullable: true })
  error?: string;

  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
class UserType {
  @Field()
  email: string;

  @Field()
  name: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User)
  async me(
    @Arg('email', () => String) email: string,
    @Ctx() { em }: MyContext
  ) {
    const user = await em.findOne(User, { email });

    return user;
  }

  @Mutation(() => UserRes)
  async register(
    @Arg('user') user: UserType,
    @Ctx() { em }: MyContext,
  ): Promise<UserRes> {
    if (!validator.isEmail(user.email)) {
      return {
        error: 'Please enter valid email'
      }
    }

    if (user.name.trim().length < 1) {
      return {
        error: 'Please enter your name'
      }
    }

    const userCreated = em.create(User, { name: user.name, email: user.email });
    try {
      await em.persistAndFlush(userCreated);
    } catch (e) {
      if (e.code === '23505') {
        return {
          error: 'E-mail already exists'
        }
      }
    }

    return { user: userCreated };
  }
}
