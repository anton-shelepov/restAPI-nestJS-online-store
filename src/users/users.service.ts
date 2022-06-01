import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) {}

    async getAllUsers() {
        const users = await this.prisma.user.findMany({ 
            select: {
                createdAt: true,
                id: true, 
                review: true,
                _count: {
                    select: {
                        review: true,
                    }
                },
                profileImage: true,
                email: true,
                role: true
            }
        }) 
        return users

    }

}