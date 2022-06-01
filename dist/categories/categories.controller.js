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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const guard_1 = require("../auth/guard");
const roles_decorator_1 = require("../roles/roles.decorator");
const roles_guard_1 = require("../roles/roles.guard");
const file_interceptor_options_1 = require("../_utils/file-interceptor-options");
const categories_service_1 = require("./categories.service");
const dto_1 = require("./dto");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    createNewCategory(data) {
        return this.categoriesService.createNewCategory(data);
    }
    uploadImages(files, categoryName) {
        const imageName = files[0].filename;
        const iconName = files[1].filename;
        return this.categoriesService.uploadImages(imageName, iconName, categoryName);
    }
    getAllCategories() {
        return this.categoriesService.getAllCategories();
    }
    getProductsByCategory(param, page) {
        console.log(page);
        return this.categoriesService.getProductsByCategory(param.category, +page);
    }
};
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CategoryCreateDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "createNewCategory", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Post)('upload-images'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 2, file_interceptor_options_1.FileInterceptorOptions)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)('categoryName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "uploadImages", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "getAllCategories", null);
__decorate([
    (0, common_1.Get)(':category'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "getProductsByCategory", null);
CategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories.controller.js.map