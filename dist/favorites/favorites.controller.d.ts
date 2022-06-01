import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    getAllFavoriteProducts(userId: number): Promise<import(".prisma/client").product[]>;
    addProductInFavorites(userId: number, productId: number): Promise<import(".prisma/client").favorite>;
    removeProductFromFavorites(userId: string, productId: string): Promise<void>;
}
