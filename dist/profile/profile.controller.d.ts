/// <reference types="multer" />
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    getProfile(userId: number): Promise<import(".prisma/client").user & {
        profileImage: {
            fileName: string;
        };
    }>;
    updateProfile(userId: number, updatedData: UpdateProfileDto): Promise<import(".prisma/client").user>;
    addProfileImage(file: Express.Multer.File, userId: number): Promise<import(".prisma/client").profileImage>;
}
