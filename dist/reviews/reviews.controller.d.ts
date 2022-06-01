import { ReviewsService } from './reviews.service';
import { ReviewDto } from './dto';
export declare class ReviewsController {
    private reviewsService;
    constructor(reviewsService: ReviewsService);
    createReview(userId: number, review: ReviewDto): Promise<void>;
    deleteReview(body: {
        reviewId: number;
        productId: number;
    }): Promise<void>;
}
