import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { PrismaService } from './../prisma/prisma.service';
import { SigninDto } from "./dto/signin.dto";
import { SignupDto } from './dto/signup.dto';
import Tokens from "./types/tokens";


@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

    async signup(dto: SignupDto): Promise<Tokens> {
        try {
            // generate a hash of password
            const hash = await argon.hash(dto.password)

            // save the new user in the data base
            const newUser = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                }
            })

            const tokens = await this.getTokens(newUser.id, newUser.role)
            await this.updateRtHash(newUser.id, tokens.refresh_token)

            return tokens;

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error;
        }
    }

    async signin(dto: SigninDto): Promise<Tokens> {
        // find user email in data base
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });

        // throw error if email not found
        if (!user) throw new ForbiddenException('Credentials incorrect');

        // check passwords match 
        const passwordsMatches = await argon.verify(user.hash, dto.password);

        // throw error if passwords not matches
        if (!passwordsMatches) throw new ForbiddenException('Credentials incorrect');

        return this.getTokens(user.id, user.email)
    }

    // Helper functions

    async updateRtHash(userId: number, rt: string) {
        const hashedRt = await argon.hash(rt)
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRt
            }
        })
    }

    async getTokens(userId: number, role: string): Promise<Tokens> {

        const payload = {
            sub: userId,
            role
        }

        const accessToken = await this.jwt.signAsync(payload, {
            expiresIn: 15,
            secret: this.config.get("AT_SECRET"),
        })

        const refreshToken = await this.jwt.signAsync(payload, {
            expiresIn: "90d",
            secret: this.config.get("RT_SECRET")
        })

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        }
    }
}