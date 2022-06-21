/// <reference types="multer" />
import { CategoriesService } from "./categories.service";
import { CategoryCreateDto } from "./dto";
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    createNewCategory(data: CategoryCreateDto): Promise<import(".prisma/client").Category>;
    uploadImages(files: Array<Express.Multer.File>, categoryName: string): Promise<import(".prisma/client").Category>;
    getAllCategories(): Promise<(import(".prisma/client").Category & {
        _count: {
            products: number;
        };
    })[]>;
    getProductsByCategory(param: {
        category: string;
    }, page: string): Promise<any>;
}
