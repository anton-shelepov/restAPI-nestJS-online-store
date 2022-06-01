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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoriesService = class CategoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createNewCategory({ categoryName, categoryCatalogName }) {
        try {
            const category = this.prisma.category.create({
                data: {
                    categoryName,
                    categoryCatalogName
                }
            });
            return category;
        }
        catch (error) {
            throw error;
        }
    }
    async uploadImages(imageName, iconName, categoryName) {
        try {
            const uploadImages = await this.prisma.category.update({
                where: {
                    categoryName,
                },
                data: {
                    image: imageName,
                    icon: iconName
                }
            });
            return uploadImages;
        }
        catch (error) {
            throw error;
        }
    }
    async getAllCategories() {
        try {
            const categories = await this.prisma.category.findMany({
                include: {
                    _count: {
                        select: {
                            products: true
                        }
                    }
                }
            });
            return categories;
        }
        catch (error) {
            throw error;
        }
    }
    async getProductsByCategory(category, page) {
        try {
            const pageSize = 5;
            let currentCursor = 1;
            if (page && page !== 1) {
                currentCursor = currentCursor + (page * pageSize - pageSize);
            }
            console.log(currentCursor);
            const categoryProducts = await this.prisma.product.findMany({
                take: pageSize,
                cursor: {
                    id: currentCursor
                },
                where: {
                    category: {
                        categoryName: category
                    }
                },
                include: {
                    images: {
                        take: 1,
                        select: {
                            fileName: true,
                        }
                    },
                    _count: {
                        select: {
                            reviews: true,
                        }
                    }
                }
            });
            console.log(categoryProducts);
            if (!categoryProducts) {
                throw new common_1.NotFoundException('No one product of category not found');
            }
            const productsCount = await this.prisma.product.aggregate({
                where: {
                    category: {
                        categoryName: category
                    }
                },
                _count: {
                    _all: true
                }
            });
            return {
                categoryProducts,
                productsCount,
                pageSize
            };
        }
        catch (error) {
            return error;
        }
    }
};
CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
exports.CategoriesService = CategoriesService;
//# sourceMappingURL=categories.service.js.map