/// <reference types="multer" />
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    getProduct(id: number): Promise<any>;
    getPopularProducts(): Promise<any>;
    getProductReviews(productId: number): Promise<any>;
    createProduct(categoryName: string, productData: ProductDto, productSpecs: {
        specGroupTitle: string;
        specGroupValues: {
            value: string[];
        }[];
    }[]): Promise<any>;
    uploadImages(files: Array<Express.Multer.File>, productId: number): Promise<any>;
    deleteProduct(productId: number): Promise<any>;
}
