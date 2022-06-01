/// <reference types="multer" />
import { CategoriesService } from "./categories.service";
import { CategoryCreateDto } from "./dto";
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    createNewCategory(data: CategoryCreateDto): Promise<import(".prisma/client").category>;
    uploadImages(files: Array<Express.Multer.File>, categoryName: string): Promise<import(".prisma/client").category>;
    getAllCategories(): Promise<(import(".prisma/client").category & {
        _count: {
            products: number;
        };
    })[]>;
    getProductsByCategory(param: {
        category: string;
    }, page: string): Promise<any>;
}
