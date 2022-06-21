import { PrismaService } from 'src/prisma/prisma.service';
export declare class BasketService {
    private prisma;
    constructor(prisma: PrismaService);
    addProductInBasket(userId: number, productId: number): Promise<import(".prisma/client").Basket>;
    removeProductFromBasket(userId: number, productId: number): Promise<void>;
    getAllProductsFromBasket(userId: number): Promise<import(".prisma/client").Product[]>;
}
