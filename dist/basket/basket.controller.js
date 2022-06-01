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
exports.BasketController = void 0;
const basket_service_1 = require("./basket.service");
const jwt_guard_1 = require("./../auth/guard/jwt.guard");
const common_1 = require("@nestjs/common");
const decorator_1 = require("../auth/decorator");
let BasketController = class BasketController {
    constructor(basketService) {
        this.basketService = basketService;
    }
    addProductInBasket(userId, productId) {
        return this.basketService.addProductInBasket(userId, productId);
    }
    getAllProductsFromBasket(userId) {
        return this.basketService.getAllProductsFromBasket(userId);
    }
    removeProductFromBasket(userId, body) {
        return this.basketService.removeProductFromBasket(userId, body.productId);
    }
};
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], BasketController.prototype, "addProductInBasket", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorator_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BasketController.prototype, "getAllProductsFromBasket", null);
__decorate([
    (0, common_1.Delete)('remove'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], BasketController.prototype, "removeProductFromBasket", null);
BasketController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('basket'),
    __metadata("design:paramtypes", [basket_service_1.BasketService])
], BasketController);
exports.BasketController = BasketController;
//# sourceMappingURL=basket.controller.js.map