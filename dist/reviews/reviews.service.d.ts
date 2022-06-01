import { PrismaService } from './../prisma/prisma.service';
import { ReviewDto } from "./dto";
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    createReview(userId: number, review: ReviewDto): Promise<void>;
    deleteReview(reviewId: number, productId: number): Promise<void>;
}
