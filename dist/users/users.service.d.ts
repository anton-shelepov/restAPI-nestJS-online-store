import { PrismaService } from "src/prisma/prisma.service";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUsers(): Promise<{
        createdAt: Date;
        id: number;
        review: import(".prisma/client").review[];
        _count: {
            review: number;
        };
        profileImage: import(".prisma/client").profileImage;
        email: string;
        role: import(".prisma/client").role;
    }[]>;
}
