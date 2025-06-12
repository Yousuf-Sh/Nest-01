import { 
  CanActivate, 
  ExecutionContext, 
  ForbiddenException, 
  Injectable, 
  NotFoundException, 
  UnauthorizedException 
} from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostOwnerGuard implements CanActivate {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const postId = parseInt(request.params.id);
       
        if (!user) throw new UnauthorizedException('User Not Authenticated');
        
        try {
            const post = await this.postRepository.findOne({
                where: { id: postId },
                relations: ['user'], // Load the user relation
            });
            
            if (!post) throw new NotFoundException('Post Not Found');
            
            if (post.user.id === user.id || user.role==='ADMIN') {
                return true;
            }
            console.log(user);
            
            throw new ForbiddenException('You can only modify your own posts');
        } catch (error) {
            if (error instanceof ForbiddenException || error instanceof NotFoundException) {
                throw error;
            }
            throw new ForbiddenException('Unable to verify post ownership');
        }
    }
}