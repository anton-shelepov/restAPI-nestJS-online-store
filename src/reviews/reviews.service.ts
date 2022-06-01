import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from "@nestjs/common";
import { ReviewDto } from "./dto";

@Injectable()
export class ReviewsService {

    constructor(private prisma: PrismaService) { }

    async createReview(userId: number, review: ReviewDto) {
        try {
            //Create new review and connect it with product
            await this.prisma.review.create({
                data: {
                    comment: review.comment,
                    dignity: review.dignity,
                    rating: review.rating,
                    flaws: review.flaws,
                    usedTerm: review.usedTerm,
                    product: {
                        connect: {
                            id: review.productId,
                        }
                    },
                    author: {
                        connect: {
                            id: userId
                        }
                    }
                }
            })

            // Get new rating AVG
            const productRating = await this.prisma.review.aggregate({
                _avg: {
                    rating: true
                },
                where: {
                    productId: review.productId
                }
            }) 

            // Update product rating data
            await this.prisma.product.update({
                where: {
                    id: review.productId
                },
                data: {
                    rating: +productRating._avg.rating.toFixed()
                }
            })

        } catch (error) {
            throw error
        }
    }

    async deleteReview(reviewId: number, productId: number) {
        try {

            // Delete review 
            await this.prisma.review.delete({
                where: {
                    id: reviewId
                }
            })

            // Get new rating AVG
            const productRating = await this.prisma.review.aggregate({
                _avg: {
                    rating: true
                },
                where: {
                    productId,
                }
            }) 

            // Update product rating data
            await this.prisma.product.update({
                where: {
                    id: productId
                },
                data: {
                    rating: +productRating._avg.rating.toFixed()
                }
            }) 
            
        } catch (error) {
            throw error
        }
    }
}