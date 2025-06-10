import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Post,Tag])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
