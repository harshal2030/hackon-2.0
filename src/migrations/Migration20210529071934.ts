import { Migration } from '@mikro-orm/migrations';

export class Migration20210529071934 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "score" ("id" serial primary key, "created_at" timestamptz(0) not null, "update_at" timestamptz(0) not null, "email" text not null, "score" jsonb not null);');
    this.addSql('alter table "score" add constraint "score_email_unique" unique ("email");');
  }

}
