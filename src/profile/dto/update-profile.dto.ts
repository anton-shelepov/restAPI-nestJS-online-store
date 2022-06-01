import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class UpdateProfileDto { 

    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @IsString()
    fullName?: string

    @IsString()
    address?: string

    @IsString()
    phone?: string
    
    @IsString()
    gender?: string

    @IsString()
    oldPassword?: string

    @IsString()
    newPassword?: string
}


