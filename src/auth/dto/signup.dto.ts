import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator"

export class SignupDto {

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsOptional()
    fullName?: string

    @IsString()
    @IsOptional()
    @IsPhoneNumber('RU', { message: "Invalid phone number" })
    phoneNumber?: string

}