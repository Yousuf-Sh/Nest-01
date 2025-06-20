import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { PostOwnerGuard } from './Guards/post_owner.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body(ValidationPipe) createPostDto: CreatePostDto) {
    // return createPostDto; 
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id' ,ParseIntPipe) id: number) {
    return this.postsService.findOne(+id);
  }
  @UseGuards(AuthGuard,PostOwnerGuard)  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @UseGuards(AuthGuard,PostOwnerGuard)  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
