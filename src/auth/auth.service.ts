import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../prisma/prisma.service';
import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';


@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

    async signup(dto: AuthDto) {

        // generate a hash of password
        const hash = await argon.hash(dto.password)

        try {
            // save the new user in the data base
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                }
            })
            return this.signToken(user.id, user.email)

        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw error;
        }
    }

    async signin(dto: AuthDto) {
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

        return this.signToken(user.id, user.email)
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '6000m',
            secret: this.config.get("JWT_SECRET"),
        })

        return {
            access_token: token,
        }
    }
}