import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BasketService {

    constructor(private prisma: PrismaService) { }

    async addProductInBasket(userId: number, productId: number) { 
        try {
            // Try to find user basket
            const basket = await this.prisma.basket.findFirst({
                where: {
                    userId
                }
            })

            // Create basket if it not found
            if (!basket) {
                await this.prisma.basket.create({
                    data: {
                        userId
                    }
                })
            }

            // Connect product with user basket
            await this.prisma.basket.update({
                where: {
                    userId
                },
                data: {
                    products: {
                        connect: {
                            id: productId
                        }
                    }
                }
            })
            return basket

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async removeProductFromBasket(userId: number, productId: number) {
        try {
            await this.prisma.basket.update({
                where: {
                    userId,
                },
                data: {
                    products: {
                        disconnect: {
                            id: productId
                        }
                    }
                }
            })

        } catch (error) { 
            throw error
        }
    }

    async getAllProductsFromBasket(userId: number) { 
        try {
            return await this.prisma.product.findMany({
                where: {
                    basket: {
                        some: {
                            userId
                        }
                    }
                }
            })

        } catch (error) {
            console.log(error)
            throw error
        } 
    } 
}