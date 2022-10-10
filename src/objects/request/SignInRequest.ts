import { IsDefined, IsEmail,  MaxLength, MinLength,  } from "class-validator";
import ViewModel from "../../shared/boiler/ViewModel";

export default class SignInRequest extends ViewModel
{
    @IsDefined({message : "Email is required"})
    @MinLength(4, {message : "Email is too short"})
    @MaxLength(128, {message: "Email is too long"})
    @IsEmail({}, {message : "Email not in right format"})
    email:string;

    @IsDefined({message : "Password is required"})
    @MinLength(6, {message : "Password must at least 6 charaters"})
    @MaxLength(8192, {message: "Password is too long"})
    password:string;
}