"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const fs = require("fs");
let ProfileService = class ProfileService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(userId) {
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
            });
            delete (await userProfile).hash;
            return userProfile;
        }
        catch (error) {
            throw error;
        }
    }
    async updateProfile(userId, updatedData) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                }
            });
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
            });
            if (updatedData.oldPassword && updatedData.newPassword) {
                const passwordsMatches = await argon.verify(user.hash, updatedData.oldPassword);
                if (!passwordsMatches)
                    throw new common_1.ForbiddenException('Credentials incorrect');
                const hash = await argon.hash(updatedData.newPassword);
                await this.prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        hash,
                    }
                });
            }
            delete userProfile.hash;
            return userProfile;
        }
        catch (error) {
            throw error;
        }
    }
    async addProfileImage(fileName, userId) {
        try {
            const currentProfileImage = await this.prisma.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    profileImage: true
                }
            }).then(image => image.profileImage);
            if (currentProfileImage) {
                await this.prisma.profileImage.delete({
                    where: {
                        userId,
                    }
                });
                await fs.unlink(`./uploads/images/${currentProfileImage.fileName}`, (err) => {
                    if (err) {
                        console.log(err);
                        return err;
                    }
                });
            }
            const newProfileImage = await this.prisma.profileImage.create({
                data: {
                    fileName,
                    user: {
                        connect: {
                            id: userId
                        }
                    }
                }
            });
            return newProfileImage;
        }
        catch (error) {
            throw error;
        }
    }
};
ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map