import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';


@Injectable()
export class ProductsService {

    constructor(private prisma: PrismaService) { }

    async getProduct(id: number) {
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
            })
            
            if (!product) throw new NotFoundException('Product not found') 

            return product

        } catch (error) {
            return error
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
            }) 

            if (!popularProducts) throw new NotFoundException('No one product was not found')

            return popularProducts

        } catch (error) {
            return error
        }
    }

    async getProductReviews(productId: number) {
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
            }) 
            if (!reviews) throw new NotFoundException('Reviews not found')

            return reviews

        } catch (error) {
            return error
        }
    }

    async createProduct(
        categoryName: string,
        productData: ProductDto,
        productSpecs: {
            specGroupTitle: string,
            specGroupValues: {
                value: string[]
            }[]
        }[]) {

        try {
            const product = await this.prisma.product.create({
                data: {
                    ...productData,
                    category: {
                        connect: {
                            categoryName
                        }
                    }
                }
            })

            for (let currentGroup = 0; currentGroup < productSpecs.length; currentGroup++) {

                //Create spec group in product
                const specGroup = await this.prisma.specGroup.create({
                    data: {
                        specGroupTitle: productSpecs[currentGroup].specGroupTitle,
                        product: {
                            connect: {
                                id: product.id
                            }
                        },
                    }
                })

                //Create values for current spec group what using in product
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
                    })
                }
            }
            return product

        } catch (error) {
            return error
        }
    }

    async uploadImages(files: Array<Express.Multer.File>, productId: number) {

        const images: Prisma.Enumerable<string> = files.map((file) => file.filename)

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
                })
            }
        } catch (error) {
            return error
        }
    }

    async deleteProduct(productId: number) {
        try {
            //Delete all specsGroupsValues what deleting product using
            const usingSpecsGroups = await this.prisma.specGroup.findMany({
                where: {
                    productId: productId
                }
            })
            for (let currentGroup = 0; currentGroup < usingSpecsGroups.length; currentGroup++) {
                await this.prisma.specGroupValue.deleteMany({
                    where: {
                        specGroupId: usingSpecsGroups[currentGroup].id
                    }
                })
            }

            //Delete all specsGroups what deleting product using
            await this.prisma.specGroup.deleteMany({
                where: {
                    productId: productId
                }
            })

            //Delete product own
            await this.prisma.product.delete({
                where: {
                    id: productId,
                }
            })

        } catch (error) {
            return error
        } 
    }
}