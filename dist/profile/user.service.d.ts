import { PrismaService } from "src/prisma/prisma.service";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserProfile(): Promise<import(".prisma/client").User>;
}
