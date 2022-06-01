import { UsersService } from "./users.service";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
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
