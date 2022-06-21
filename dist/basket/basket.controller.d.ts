import { BasketService } from './basket.service';
export declare class BasketController {
    private basketService;
    constructor(basketService: BasketService);
    addProductInBasket(userId: number, productId: number): Promise<import(".prisma/client").Basket>;
    getAllProductsFromBasket(userId: number): Promise<import(".prisma/client").Product[]>;
    removeProductFromBasket(userId: number, body: {
        productId: number;
    }): Promise<void>;
}
