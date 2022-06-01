import { PrismaService } from './../prisma/prisma.service';
export declare class FavoritesService {
    private prisma;
    constructor(prisma: PrismaService);
    addProductInFavorites(userId: number, productId: number): Promise<import(".prisma/client").favorite>;
    removeProductFromFavorites(userId: number, productId: number): Promise<void>;
    getAllFavoriteProducts(userId: number): Promise<import(".prisma/client").product[]>;
}
