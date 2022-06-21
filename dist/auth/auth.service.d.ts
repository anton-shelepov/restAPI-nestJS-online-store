import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './../prisma/prisma.service';
import { SigninDto } from "./dto/signin.dto";
import { SignupDto } from './dto/signup.dto';
import Tokens from "./types/tokens";
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    signup(dto: SignupDto): Promise<Tokens>;
    signin(dto: SigninDto): Promise<Tokens>;
    updateRtHash(userId: number, rt: string): Promise<void>;
    getTokens(userId: number, role: string): Promise<Tokens>;
}
