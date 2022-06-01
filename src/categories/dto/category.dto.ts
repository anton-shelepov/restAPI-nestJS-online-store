import { IsNotEmpty, IsString } from "class-validator"

export class CategoryCreateDto { 

    @IsString()
    @IsNotEmpty()
    categoryName: string

    @IsString()
    @IsNotEmpty()
    categoryCatalogName: string 
}