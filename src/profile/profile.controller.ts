import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { Body, Controller, Get, Patch, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileInterceptorOptions } from 'src/_utils/file-interceptor-options';

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController { 

    constructor(private profileService: ProfileService) {}

    @Get()
    getProfile(@GetUser('id') userId: number) {
        return this.profileService.getProfile(userId)
    }

    @Patch('update')
    updateProfile(@GetUser('id') userId: number , @Body() updatedData: UpdateProfileDto) {
        return this.profileService.updateProfile(userId, updatedData)
    }

    @Patch('add-image')
    @UseInterceptors(FileInterceptor('file', FileInterceptorOptions))
    addProfileImage(@UploadedFile() file: Express.Multer.File, @GetUser('id') userId: number) {
        return this.profileService.addProfileImage(file.filename, userId)
    }
}