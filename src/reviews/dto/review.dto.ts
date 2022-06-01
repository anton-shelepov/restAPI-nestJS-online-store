import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ReviewDto { 

    @IsNumber()
    @IsNotEmpty()
    productId: number

    @IsString()
    @IsNotEmpty()
    usedTerm: string
    
    @IsString() 
    dignity: string 

    @IsString() 
    flaws: string

    @IsString() 
    comment: string 

    @IsIn([1,2,3,4,5])
    @IsNumber() 
    rating: number 
}