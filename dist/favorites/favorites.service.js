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
exports.FavoritesService = void 0;
const prisma_service_1 = require("./../prisma/prisma.service");
const common_1 = require("@nestjs/common");
let FavoritesService = class FavoritesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addProductInFavorites(userId, productId) {
        try {
            const favorites = await this.prisma.favorite.findFirst({
                where: {
                    userId
                }
            });
            if (!favorites) {
                await this.prisma.favorite.create({
                    data: {
                        userId
                    }
                });
            }
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
            });
            return favorites;
        }
        catch (error) {
            throw error;
        }
    }
    async removeProductFromFavorites(userId, productId) {
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
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getAllFavoriteProducts(userId) {
        try {
            return await this.prisma.product.findMany({
                where: {
                    favorite: {
                        some: {
                            userId
                        }
                    }
                }
            });
        }
        catch (error) {
            throw error;
        }
    }
};
FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavoritesService);
exports.FavoritesService = FavoritesService;
//# sourceMappingURL=favorites.service.js.map