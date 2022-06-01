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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProduct(id) {
        try {
            const product = await this.prisma.product.findUnique({
                where: {
                    id
                },
                include: {
                    specs: {
                        select: {
                            specGroupTitle: true,
                            specGroupValues: {
                                select: {
                                    value: true,
                                }
                            }
                        }
                    },
                    images: {
                        select: {
                            fileName: true
                        }
                    },
                    _count: {
                        select: {
                            reviews: true
                        }
                    }
                },
            });
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            return product;
        }
        catch (error) {
            return error;
        }
    }
    async getPopularProducts() {
        try {
            const popularProducts = await this.prisma.product.findMany({
                take: 10,
                orderBy: {
                    reviews: {
                        _count: 'desc'
                    }
                },
                select: {
                    _count: {
                        select: {
                            reviews: true
                        }
                    },
                    id: true,
                    isInStock: true,
                    discount: true,
                    price: true,
                    images: {
                        take: 1,
                    },
                    rating: true,
                    title: true,
                }
            });
            if (!popularProducts)
                throw new common_1.NotFoundException('No one product was not found');
            return popularProducts;
        }
        catch (error) {
            return error;
        }
    }
    async getProductReviews(productId) {
        try {
            const reviews = await this.prisma.product.findMany({
                where: {
                    id: productId
                },
                select: {
                    reviews: {
                        take: 5,
                    }
                }
            });
            if (!reviews)
                throw new common_1.NotFoundException('Reviews not found');
            return reviews;
        }
        catch (error) {
            return error;
        }
    }
    async createProduct(categoryName, productData, productSpecs) {
        try {
            const product = await this.prisma.product.create({
                data: Object.assign(Object.assign({}, productData), { category: {
                        connect: {
                            categoryName
                        }
                    } })
            });
            for (let currentGroup = 0; currentGroup < productSpecs.length; currentGroup++) {
                const specGroup = await this.prisma.specGroup.create({
                    data: {
                        specGroupTitle: productSpecs[currentGroup].specGroupTitle,
                        product: {
                            connect: {
                                id: product.id
                            }
                        },
                    }
                });
                for (let currentValue = 0; currentValue < productSpecs[currentGroup].specGroupValues.length; currentValue++) {
                    await this.prisma.specGroupValue.create({
                        data: {
                            value: productSpecs[currentGroup].specGroupValues[currentValue].value,
                            specGroup: {
                                connect: {
                                    id: specGroup.id
                                }
                            }
                        }
                    });
                }
            }
            return product;
        }
        catch (error) {
            return error;
        }
    }
    async uploadImages(files, productId) {
        const images = files.map((file) => file.filename);
        try {
            for (let currentImage = 0; currentImage < images.length; currentImage++) {
                await this.prisma.productImage.create({
                    data: {
                        fileName: images[currentImage],
                        product: {
                            connect: {
                                id: productId
                            }
                        }
                    }
                });
            }
        }
        catch (error) {
            return error;
        }
    }
    async deleteProduct(productId) {
        try {
            const usingSpecsGroups = await this.prisma.specGroup.findMany({
                where: {
                    productId: productId
                }
            });
            for (let currentGroup = 0; currentGroup < usingSpecsGroups.length; currentGroup++) {
                await this.prisma.specGroupValue.deleteMany({
                    where: {
                        specGroupId: usingSpecsGroups[currentGroup].id
                    }
                });
            }
            await this.prisma.specGroup.deleteMany({
                where: {
                    productId: productId
                }
            });
            await this.prisma.product.delete({
                where: {
                    id: productId,
                }
            });
        }
        catch (error) {
            return error;
        }
    }
};
ProductsService = __decorate([
    (0, common_2.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map