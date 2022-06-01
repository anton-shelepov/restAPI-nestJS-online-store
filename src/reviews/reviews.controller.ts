import { JwtGuard } from './../auth/guard/jwt.guard';
import { ReviewsService } from './reviews.service';
import { Body, Controller, Delete, Post, UseGuards } from "@nestjs/common";
import { ReviewDto } from './dto';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('reviews')
export class ReviewsController {

    constructor(private reviewsService: ReviewsService) {}

    @Post('create')
    createReview(@GetUser('id') userId: number, @Body() review: ReviewDto) {
        return this.reviewsService.createReview(userId, review)
    }

    @Delete('delete')
    deleteReview(@Body() body: {reviewId: number, productId: number}) {
        return this.reviewsService.deleteReview(body.reviewId, body.productId)
    } 
}