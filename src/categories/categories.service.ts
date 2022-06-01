import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CategoryCreateDto } from "./dto";

@Injectable()
export class CategoriesService {

    constructor(private prisma: PrismaService) { }

    async createNewCategory({ categoryName, categoryCatalogName }: CategoryCreateDto) {
        try {
            const category = this.prisma.category.create({
                data: {
                    categoryName,
                    categoryCatalogName
                }
            })
            return category

        } catch (error) {
            throw error
        }
    }

    async uploadImages(imageName: string, iconName: string, categoryName: string) {
        try {
            const uploadImages = await this.prisma.category.update({
                where: {
                    categoryName,
                },
                data: {
                    image: imageName,
                    icon: iconName
                }
            })
            return uploadImages

        } catch (error) {
            throw error
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
            })
            return categories

        } catch (error) {
            throw error
        }

    }

    async getProductsByCategory(category: string, page: number) {
        try {

            const pageSize = 5
            let currentCursor = 1

            if (page && page !== 1) {
                currentCursor = currentCursor + (page * pageSize - pageSize)
            } 

            console.log(currentCursor)

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
            }) 

            console.log(categoryProducts)

            if(!categoryProducts) {
                throw new NotFoundException('No one product of category not found')
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
            }) 
            return {
                categoryProducts,
                productsCount,
                pageSize
            }

        } catch (error) {
            return error
        }
    }
}