import { PrismaService } from "src/prisma/prisma.service";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllUsers(): Promise<{
        id: number;
        createdAt: Date;
        email: string;
        role: import(".prisma/client").Role;
        profileImage: import(".prisma/client").ProfileImage;
        review: import(".prisma/client").Review[];
        _count: {
            review: number;
        };
    }[]>;
}
