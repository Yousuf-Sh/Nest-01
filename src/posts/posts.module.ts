import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { PostOwnerGuard } from './Guards/post_owner.guard';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([User,Post,Tag]),
    forwardRef(() => UsersModule),],
  controllers: [PostsController],
  providers: [PostsService,PostOwnerGuard],
  exports:[PostsService]
})
export class PostsModule {}
