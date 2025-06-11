import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Post } from './entities/post.entity';
import { In, Repository } from 'typeorm';
import { Tag } from 'src/tags/entities/tag.entity';
import { PostOwnerGuard } from './Guards/post_owner.guard';
import { AuthGuard } from 'src/auth/Guards/auth.guard';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo:Repository<User>,
    @InjectRepository(Post)
    private readonly postRepo:Repository<Post>,
    @InjectRepository(Tag)
    private readonly tagsRepo:Repository<Tag>
  ){}

 async create(createPostDto: CreatePostDto) {
    const user = await this.userRepo.findOneBy({id:createPostDto.userId});
    const tags = await this.tagsRepo.findBy({id:In(createPostDto.tags)});
    if (!user){
      throw new NotFoundException('User does not exist');
    }  
      const post = this.postRepo.create({
        title:createPostDto.title, 
        content:createPostDto.content,
        user: user,
        tags: tags
      });

  return await this.postRepo.save(post);
  }

  findAll() {
    return `This action returns all posts`;
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOneByOrFail({id});

    return post;
  }
  
  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  async remove(id: number) {
    await this.postRepo.delete(id);
  }
}
