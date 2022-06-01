/// <reference types="multer" />
import { SpecsDto } from './dto/specs.dto';
import { ProductDto } from "./dto";
import { ProductsService } from "./products.service";
export declare class ProductsController {
    private productsService;
    constructor(productsService: ProductsService);
    getPopularProducts(): Promise<any>;
    getProduct(id: string): Promise<any>;
    getProductReviews(productId: string): Promise<any>;
    createProduct(categoryName: string, product: ProductDto, productSpecs: SpecsDto): Promise<any>;
    uploadImages(files: Array<Express.Multer.File>, productId: number): Promise<any>;
    deleteProduct(body: {
        productId: number;
    }): Promise<any>;
}
