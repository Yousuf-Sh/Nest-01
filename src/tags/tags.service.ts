import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor (
    @InjectRepository(Tag)
    private readonly tagRepo : Repository<Tag>
  ){}
  create(createTagDto: CreateTagDto) {
    
    const tag = this.tagRepo.create({title:createTagDto.title});
    return this.tagRepo.save(tag);
  }

  findAll() {
    return `This action returns all tags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
