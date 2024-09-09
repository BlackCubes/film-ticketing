import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.index({ email: 'text', username: 'text' });

          schema.pre('save', async function (next) {
            if (!this.isModified('password') || !this.password) {
              return next();
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(this.password, salt);

            this.password = hash;

            return next();
          });

          schema.pre('save', async function (next) {
            if (!this.isModified('password') || this.isNew) {
              return next();
            }

            this.passwordChangedAt = new Date(Date.now() - 1000);

            next();
          });

          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
