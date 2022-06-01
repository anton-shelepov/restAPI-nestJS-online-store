import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
export declare class CustomTextLength implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
