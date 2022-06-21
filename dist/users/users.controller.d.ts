import { UsersService } from "./users.service";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
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
