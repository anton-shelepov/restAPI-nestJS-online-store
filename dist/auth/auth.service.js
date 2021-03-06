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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const runtime_1 = require("@prisma/client/runtime");
const argon = require("argon2");
const prisma_service_1 = require("./../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async signup(dto) {
        try {
            const hash = await argon.hash(dto.password);
            const newUser = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                }
            });
            const tokens = await this.getTokens(newUser.id, newUser.role);
            await this.updateRtHash(newUser.id, tokens.refresh_token);
            return tokens;
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('Credentials taken');
                }
            }
            throw error;
        }
    }
    async signin(dto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user)
            throw new common_1.ForbiddenException('Credentials incorrect');
        const passwordsMatches = await argon.verify(user.hash, dto.password);
        if (!passwordsMatches)
            throw new common_1.ForbiddenException('Credentials incorrect');
        return this.getTokens(user.id, user.email);
    }
    async updateRtHash(userId, rt) {
        const hashedRt = await argon.hash(rt);
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRt
            }
        });
    }
    async getTokens(userId, role) {
        const payload = {
            sub: userId,
            role
        };
        const accessToken = await this.jwt.signAsync(payload, {
            expiresIn: 15,
            secret: this.config.get("AT_SECRET"),
        });
        const refreshToken = await this.jwt.signAsync(payload, {
            expiresIn: "90d",
            secret: this.config.get("RT_SECRET")
        });
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService, config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map