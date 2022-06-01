import { BasketService } from './basket.service';
export declare class BasketController {
    private basketService;
    constructor(basketService: BasketService);
    addProductInBasket(userId: number, productId: number): Promise<import(".prisma/client").basket>;
    getAllProductsFromBasket(userId: number): Promise<import(".prisma/client").product[]>;
    removeProductFromBasket(userId: number, body: {
        productId: number;
    }): Promise<void>;
}
