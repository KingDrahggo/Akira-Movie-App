"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_role_enum_1 = require("../auth/enums/user-role.enum");
const user_entity_1 = require("../auth/entities/user.entity");
let AuthCService = class AuthCService {
    constructor(userRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signUp(signupCredentialsDto, res) {
        const { username, password, email, tmdb_key, role } = signupCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.userRepository.create({
            username,
            password: hashedPassword,
            email,
            tmdb_key,
            role: role ? user_role_enum_1.UserRole[role] : user_role_enum_1.UserRole.USER,
        });
        try {
            this.createToken(user, res);
            await this.userRepository.save(user);
            const userfromdb = await this.userRepository.findOne({
                where: { email },
            });
            return {
                id: userfromdb.id,
                username: userfromdb.username,
                email: userfromdb.email,
                tmdb_key: userfromdb.tmdb_key,
                role: userfromdb.role,
            };
        }
        catch (error) {
            if (error.code === '11000') {
                throw new common_1.ConflictException('Username already exists');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async signIn(signinCredentialsDto, res) {
        const { email, password } = signinCredentialsDto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
            this.createToken(user, res);
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                tmdb_key: user.tmdb_key,
                role: user.role,
            };
        }
        else {
            throw new common_1.UnauthorizedException('Please check your login credentials');
        }
    }
    async refreshToken(user, res) {
        this.createToken(user, res);
    }
    async checkEmail({ email }) {
        const user = await this.userRepository.findOne({ where: { email } });
        return user ? true : false;
    }
    async updateUser(updateCredentialDto, user, res) {
        const { role } = updateCredentialDto;
        await this.userRepository.update({ email: user.email }, Object.assign(Object.assign({}, updateCredentialDto), { role: user_role_enum_1.UserRole[role] }));
        this.createToken(user, res);
        const userfromdb = await this.userRepository.findOne({
            where: { email: user.email },
        });
        return {
            id: userfromdb.id,
            username: userfromdb.username,
            email: userfromdb.email,
            tmdb_key: userfromdb.tmdb_key,
            role: userfromdb.role,
        };
    }
    async signOut(res) {
        res.cookie('token', '', { expires: new Date() });
    }
    createToken(user, res) {
        const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            tmdb_key: user.tmdb_key,
        };
        const secretData = {
            accessToken: this.jwtService.sign(payload),
            refreshToken: '',
        };
        res.cookie('accessToken', secretData, {
            httpOnly: true,
            maxAge: this.configService.get('TOKEN_EXP'),
        });
    }
};
AuthCService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthCService);
exports.AuthCService = AuthCService;
//# sourceMappingURL=auth-c.service.js.map