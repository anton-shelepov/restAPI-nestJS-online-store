import { Prisma } from '@prisma/client';
import { Body, Controller, Get, Param, Post, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { JwtGuard } from "src/auth/guard";
import { Roles } from "src/roles/roles.decorator";
import { RolesGuard } from "src/roles/roles.guard";
import { FileInterceptorOptions } from "src/_utils/file-interceptor-options";
import { CategoriesService } from "./categories.service";
import { CategoryCreateDto } from "./dto";

@Controller('categories')
export class CategoriesController {

    constructor(private categoriesService: CategoriesService) { }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles('ADMIN')
    @Post('create')
    createNewCategory(@Body() data: CategoryCreateDto) {
        return this.categoriesService.createNewCategory(data)
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @UseGuards(JwtGuard)
    @Post('upload-images')
    @UseInterceptors(FilesInterceptor('files', 2, FileInterceptorOptions))
    uploadImages(@UploadedFiles() files: Array<Express.Multer.File>, @Body('categoryName') categoryName: string) {
        const imageName: string = files[0].filename
        const iconName: string = files[1].filename
        return this.categoriesService.uploadImages(imageName, iconName, categoryName)
    }

    @Get()
    getAllCategories() {
        return this.categoriesService.getAllCategories()
    }

    @Get(':category')
    getProductsByCategory(@Param() param: { category: string }, @Query('page') page: string) {
        console.log(page)
        return this.categoriesService.getProductsByCategory(param.category, +page)
    }
}