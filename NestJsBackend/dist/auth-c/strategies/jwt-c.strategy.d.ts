import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Strategy } from 'passport-jwt';
import { User } from 'src/auth/entities/user.entity';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
declare const JwtCStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtCStrategy extends JwtCStrategy_base {
    private readonly userRepository;
    private readonly configService;
    constructor(userRepository: Repository<User>, configService: ConfigService);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
