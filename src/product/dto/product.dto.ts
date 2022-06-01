import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ProductDto { 

    @IsString()
    @IsNotEmpty()
    title: string
    
    @IsString()
    @IsNotEmpty()
    mainSpecs: string 

    @IsBoolean()
    @IsNotEmpty()
    isInStock: boolean

    @IsNumber()
    @IsNotEmpty()
    price: number 

    @IsNumber()
    discount: number
}