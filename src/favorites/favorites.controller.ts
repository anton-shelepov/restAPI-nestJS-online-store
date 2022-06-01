import { JwtGuard } from './../auth/guard/jwt.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { FavoritesService } from './favorites.service';


@UseGuards(JwtGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAllFavoriteProducts(@GetUser('id') userId: number) {
    return this.favoritesService.getAllFavoriteProducts(userId);
  } 

  @Post('add')
  addProductInFavorites(@GetUser('id') userId: number, @Body('productId') productId: number) {
    console.log(userId, productId)
    return this.favoritesService.addProductInFavorites(productId, userId);
  } 

  @Delete('remove')
  removeProductFromFavorites(@GetUser('id') userId: string, @Body('productId') productId: string) {
    return this.favoritesService.removeProductFromFavorites(+productId, +userId);
  }
}
