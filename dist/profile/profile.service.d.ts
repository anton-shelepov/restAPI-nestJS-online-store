import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from "src/prisma/prisma.service";
import { user } from '@prisma/client';
export declare class ProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: number): Promise<user & {
        profileImage: {
            fileName: string;
        };
    }>;
    updateProfile(userId: number, updatedData: UpdateProfileDto): Promise<user>;
    addProfileImage(fileName: string, userId: number): Promise<import(".prisma/client").profileImage>;
}
