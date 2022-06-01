import { PrismaService } from "src/prisma/prisma.service";
import { CategoryCreateDto } from "./dto";
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    createNewCategory({ categoryName, categoryCatalogName }: CategoryCreateDto): Promise<import(".prisma/client").category>;
    uploadImages(imageName: string, iconName: string, categoryName: string): Promise<import(".prisma/client").category>;
    getAllCategories(): Promise<(import(".prisma/client").category & {
        _count: {
            products: number;
        };
    })[]>;
    getProductsByCategory(category: string, page: number): Promise<any>;
}
