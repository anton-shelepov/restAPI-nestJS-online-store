"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const prisma_service_1 = require("./../prisma/prisma.service");
const common_1 = require("@nestjs/common");
let ReviewsService = class ReviewsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createReview(userId, review) {
        try {
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
            });
            const productRating = await this.prisma.review.aggregate({
                _avg: {
                    rating: true
                },
                where: {
                    productId: review.productId
                }
            });
            await this.prisma.product.update({
                where: {
                    id: review.productId
                },
                data: {
                    rating: +productRating._avg.rating.toFixed()
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
    async deleteReview(reviewId, productId) {
        try {
            await this.prisma.review.delete({
                where: {
                    id: reviewId
                }
            });
            const productRating = await this.prisma.review.aggregate({
                _avg: {
                    rating: true
                },
                where: {
                    productId,
                }
            });
            await this.prisma.product.update({
                where: {
                    id: productId
                },
                data: {
                    rating: +productRating._avg.rating.toFixed()
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
};
ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsService);
exports.ReviewsService = ReviewsService;
//# sourceMappingURL=reviews.service.js.map