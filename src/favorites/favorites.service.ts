import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {

	constructor(private prisma: PrismaService) { }

	async addProductInFavorites(userId: number, productId: number) {
		try {
			// Try to find user favorites
			const favorites = await this.prisma.favorite.findFirst({
				where: {
					userId
				}
			})

			// Create favorites if it not found
			if (!favorites) {
				await this.prisma.favorite.create({
					data: {
						userId
					}
				})
			}

			// Connect product with user favorite
			await this.prisma.favorite.update({
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

			return favorites

		} catch (error) {
			throw error
		}
	}

	async removeProductFromFavorites(userId: number, productId: number) {
		try {
			await this.prisma.favorite.update({
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

	async getAllFavoriteProducts(userId: number) {
		try {
			return await this.prisma.product.findMany({
				where: {
					favorite: {
						some: {
							userId
						}
					}
				}
			})

		} catch (error) {
			throw error
		}
	}
}
