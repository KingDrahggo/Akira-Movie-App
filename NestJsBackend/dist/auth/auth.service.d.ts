import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SignUpCredentialsDto } from './dto/signup.dto';
import { SignInCredentialsDto } from './dto/signin.dto';
import { UpdateCredentialDto } from './dto/update-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CheckEmailDto } from './dto/check-email.dto';
import { DeleteUserDto } from './dto/delete-user.dot';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    signUp(signupCredentialsDto: SignUpCredentialsDto): Promise<{
        accessToken: string;
    }>;
    signIn(signinCredentialsDto: SignInCredentialsDto): Promise<{
        accessToken: string;
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto): {
        accessToken: string;
    };
    checkEmail({ email }: CheckEmailDto): Promise<boolean>;
    updateUser(updateCredentialDto: UpdateCredentialDto, user: User): Promise<{
        accessToken: string;
    }>;
    deleteAnyUser(deleteUserDto: DeleteUserDto, user: User): Promise<{
        email: string;
    }>;
    deleteUserById(user: User, id: string): Promise<User>;
    getUser(user: User): Promise<User>;
    private createToken;
}
