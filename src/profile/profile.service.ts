import { UpdateProfileDto } from './dto/update-profile.dto';
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import * as argon from 'argon2'
import { user } from '@prisma/client';
import * as fs from 'fs'

@Injectable()
export class ProfileService {

    constructor(private prisma: PrismaService) { }

    async getProfile(userId: number) {
        try {
            const userProfile = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    profileImage: {
                        select: {
                            fileName: true
                        }
                    }
                }
            })

            delete (await userProfile).hash
            return userProfile

        } catch (error) {
            throw error
        }
    }

    async updateProfile(userId: number, updatedData: UpdateProfileDto) {
        try {
            const user: user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                }
            })

            const userProfile = await this.prisma.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    email: updatedData.email,
                    fullName: updatedData.fullName,
                    address: updatedData.address,
                    phone: updatedData.phone,
                    gender: updatedData.gender,
                }
            })

            // If updated data have old and new password fields, we need to verify it with the current password
            if (updatedData.oldPassword && updatedData.newPassword) {
                const passwordsMatches = await argon.verify(user.hash, updatedData.oldPassword)

                if (!passwordsMatches) throw new ForbiddenException('Credentials incorrect');

                const hash = await argon.hash(updatedData.newPassword)

                await this.prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        hash,
                    }
                })
            }

            delete userProfile.hash
            return userProfile

        } catch (error) {
            throw error
        }
    }

    async addProfileImage(fileName: string, userId: number) {
        try { 
            const currentProfileImage = await this.prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    profileImage: true
                }
            }).then(image => image.profileImage) 

            // If user already have profileImage
            if (currentProfileImage) {
                // Delete image from db
                await this.prisma.profileImage.delete({
                    where: {
                        userId,
                    }
                }) 

                // Delete image from public uploads
                await fs.unlink(`./uploads/images/${currentProfileImage.fileName}`, (err) => {
                    if (err) {
                        console.log(err)
                        return err
                    }
                })
            }

            // Add new image in db and connect it with user
            const newProfileImage = await this.prisma.profileImage.create({
                data: {
                    fileName,
                    user: {
                        connect: {
                            id: userId
                        }
                    }
                }
            }) 

            return newProfileImage

        } catch (error) {
            throw error
        } 
    }
}