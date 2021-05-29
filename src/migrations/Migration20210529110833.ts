import { Migration } from '@mikro-orm/migrations';

export class Migration20210529110833 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "score" ("id" serial primary key, "created_at" timestamptz(0) not null, "update_at" timestamptz(0) not null, "email" text not null, "score" int not null);');

    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "update_at" timestamptz(0) not null, "name" text not null, "email" text not null);');
  }

}
