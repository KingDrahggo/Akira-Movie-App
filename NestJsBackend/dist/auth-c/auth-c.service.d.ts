import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { User } from 'src/auth/entities/user.entity';
import { SignUpCredentialsDto } from 'src/auth/dto/signup.dto';
import { SignInCredentialsDto } from 'src/auth/dto/signin.dto';
import { UpdateCredentialDto } from 'src/auth/dto/update-user.dto';
import { CheckEmailDto } from 'src/auth/dto/check-email.dto';
export declare class AuthCService {
    private readonly userRepository;
    private readonly jwtService;
    private configService;
    constructor(userRepository: Repository<User>, jwtService: JwtService, configService: ConfigService);
    signUp(signupCredentialsDto: SignUpCredentialsDto, res: Response): Promise<User>;
    signIn(signinCredentialsDto: SignInCredentialsDto, res: Response): Promise<User>;
    refreshToken(user: User, res: Response): Promise<void>;
    checkEmail({ email }: CheckEmailDto): Promise<boolean>;
    updateUser(updateCredentialDto: UpdateCredentialDto, user: User, res: Response): Promise<User>;
    signOut(res: Response): Promise<void>;
    private createToken;
}
