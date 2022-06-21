import { PrismaService } from "src/prisma/prisma.service";
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: number): Promise<import(".prisma/client").User & {
        profileImage: {
            fileName: string;
        };
    }>;
    updateProfile(userId: number, updatedData: UpdateProfileDto): Promise<import(".prisma/client").User>;
    addProfileImage(fileName: string, userId: number): Promise<import(".prisma/client").ProfileImage>;
}
