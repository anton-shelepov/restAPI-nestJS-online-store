import { PrismaService } from 'src/prisma/prisma.service';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    createProduct(): Promise<string>;
}
