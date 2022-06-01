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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const platform_express_1 = require("@nestjs/platform-express");
const jwt_guard_1 = require("./../auth/guard/jwt.guard");
const common_1 = require("@nestjs/common");
const decorator_1 = require("../auth/decorator");
const profile_service_1 = require("./profile.service");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const file_interceptor_options_1 = require("../_utils/file-interceptor-options");
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    getProfile(userId) {
        return this.profileService.getProfile(userId);
    }
    updateProfile(userId, updatedData) {
        return this.profileService.updateProfile(userId, updatedData);
    }
    addProfileImage(file, userId) {
        return this.profileService.addProfileImage(file.filename, userId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorator_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)('update'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Patch)('add-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', file_interceptor_options_1.FileInterceptorOptions)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, decorator_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", void 0)
], ProfileController.prototype, "addProfileImage", null);
ProfileController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map