import { IsArray, IsNotEmpty } from "class-validator"

export class SpecsDto {

    
    specs: {
        specGroupTitle: string
        specGroupValues: {
            value: string[]
        } []
    }[]
} 