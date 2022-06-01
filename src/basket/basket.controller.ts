import { BasketService } from './basket.service';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { Body, Controller, Delete, Get, Post, UseGuards } from "@nestjs/common";
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@Controller('basket')
export class BasketController {

    constructor(private basketService: BasketService) {}
    
    @Post('add')
    addProductInBasket(@GetUser('id') userId: number, @Body('productId') productId: number) {
        return this.basketService.addProductInBasket(userId, productId)
    }

    @Get()
    getAllProductsFromBasket(@GetUser('id') userId: number) {
        return this.basketService.getAllProductsFromBasket(userId) 
    }

    @Delete('remove')
    removeProductFromBasket(@GetUser('id') userId: number, @Body() body: {productId: number}) {
        return this.basketService.removeProductFromBasket(userId, body.productId)
    }
}