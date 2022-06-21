import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: SignupDto): Promise<import("./types/tokens").default>;
    signin(dto: SigninDto): Promise<import("./types/tokens").default>;
}
