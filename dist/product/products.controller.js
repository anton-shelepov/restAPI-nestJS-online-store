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
exports.ProductsController = void 0;
const jwt_guard_1 = require("./../auth/guard/jwt.guard");
const specs_dto_1 = require("./dto/specs.dto");
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const products_service_1 = require("./products.service");
const roles_decorator_1 = require("../roles/roles.decorator");
const roles_guard_1 = require("../roles/roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
const file_interceptor_options_1 = require("../_utils/file-interceptor-options");
let ProductsController = class ProductsController {
    constructor(productsService) {
        this.productsService = productsService;
    }
    getPopularProducts() {
        return this.productsService.getPopularProducts();
    }
    getProduct(id) {
        return this.productsService.getProduct(+id);
    }
    getProductReviews(productId) {
        return this.productsService.getProductReviews(+productId);
    }
    createProduct(categoryName, product, productSpecs) {
        return this.productsService.createProduct(categoryName, product, productSpecs.specs);
    }
    uploadImages(files, productId) {
        return this.productsService.uploadImages(files, +productId);
    }
    deleteProduct(body) {
        return this.productsService.deleteProduct(body.productId);
    }
};
__decorate([
    (0, common_1.Get)('popular'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getPopularProducts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Get)(':id/reviews'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProductReviews", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)("categoryName")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.ProductDto,
        specs_dto_1.SpecsDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)('upload-images'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10, file_interceptor_options_1.FileInterceptorOptions)),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "uploadImages", null);
__decorate([
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "deleteProduct", null);
ProductsController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
exports.ProductsController = ProductsController;
//# sourceMappingURL=products.controller.js.map