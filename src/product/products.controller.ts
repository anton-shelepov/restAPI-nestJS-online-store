import { JwtGuard } from './../auth/guard/jwt.guard';
import { SpecsDto } from './dto/specs.dto';
import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { ProductDto } from "./dto";
import { ProductsService } from "./products.service";
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileInterceptorOptions } from 'src/_utils/file-interceptor-options';

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService) { }

    @Get('popular')
    getPopularProducts() {
        return this.productsService.getPopularProducts()
    } 

    @Get(':id')
    getProduct(@Param('id') id: string) {
        return this.productsService.getProduct(+id)
    } 

    @Get(':id/reviews') 
    getProductReviews(@Param('id') productId: string) {
        return this.productsService.getProductReviews(+productId)
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @UseGuards(JwtGuard)
    @Post('create')
    createProduct(
        @Body("categoryName") categoryName: string,
        @Body() product: ProductDto,
        @Body() productSpecs: SpecsDto,
    ) {
        return this.productsService.createProduct(categoryName, product, productSpecs.specs)
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @UseGuards(JwtGuard)
    @Post('upload-images')
    @UseInterceptors(FilesInterceptor('files', 10, FileInterceptorOptions))
    uploadImages(@UploadedFiles() files: Array<Express.Multer.File>, @Body('productId') productId: number) {
        return this.productsService.uploadImages(files, +productId)
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @UseGuards(JwtGuard)
    @Delete('delete')
    deleteProduct(@Body() body: { productId: number }) {
        return this.productsService.deleteProduct(body.productId)
    }
}