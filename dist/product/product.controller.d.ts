import { ProductService } from "./product.service";
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    createProduct(): () => Promise<string>;
}
