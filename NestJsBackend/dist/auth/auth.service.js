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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const user_role_enum_1 = require("./enums/user-role.enum");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async signUp(signupCredentialsDto) {
        try {
            const { username, password, email, tmdb_key, role } = signupCredentialsDto;
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = this.userRepository.create({
                username,
                password: hashedPassword,
                email,
                tmdb_key,
                role: user_role_enum_1.UserRole[role] || user_role_enum_1.UserRole.USER,
            });
            await this.userRepository.save(user);
            const userfromdb = await this.userRepository.findOne({
                where: { email },
            });
            const accessToken = await this.createToken(userfromdb);
            return { accessToken };
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
    async signIn(signinCredentialsDto) {
        const { email, password } = signinCredentialsDto;
        const user = await this.userRepository.findOne({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = this.createToken(user);
            return { accessToken };
        }
        else {
            throw new common_1.UnauthorizedException('Please check your login credentials');
        }
    }
    refreshToken(refreshTokenDto) {
        const accessToken = this.createToken(refreshTokenDto);
        return { accessToken };
    }
    async checkEmail({ email }) {
        const user = await this.userRepository.findOne({ where: { email } });
        return user ? true : false;
    }
    async updateUser(updateCredentialDto, user) {
        const { role } = updateCredentialDto;
        const update = await this.userRepository.update({ email: user.email }, Object.assign(Object.assign({}, updateCredentialDto), { role: user_role_enum_1.UserRole[role] }));
        const updatedUser = await this.userRepository.findOne({
            where: { email: user.email },
        });
        const accessToken = this.createToken(updatedUser);
        return { accessToken };
    }
    async deleteAnyUser(deleteUserDto, user) {
        if (user.role !== user_role_enum_1.UserRole.ADMIN)
            new common_1.UnauthorizedException(`You don't have the permission to delete a user.`);
        const { email } = deleteUserDto;
        const userfromdb = await this.userRepository.findOne({ where: { email } });
        if (!userfromdb) {
            throw new common_1.NotFoundException(`User "${user.username}" not found!`);
        }
        await this.userRepository.delete({ email });
        return { email };
    }
    async deleteUserById(user, id) {
        const userfromdb = await this.userRepository.findOne({ where: { id } });
        if (!userfromdb) {
            throw new common_1.NotFoundException(`User which ID is "${id}" not found!`);
        }
        if (user.role !== user_role_enum_1.UserRole.ADMIN)
            new common_1.UnauthorizedException(`You don't have the permission to delete a user.`);
        await this.userRepository.delete({ id });
        return userfromdb;
    }
    async getUser(user) {
        const existUser = await this.userRepository.findOne({
            where: { user },
        });
        if (!existUser)
            throw new common_1.NotFoundException(`User "${user.username}" not found!`);
        return user;
    }
    createToken(user) {
        const payload = {
            id: user.id.toString(),
            username: user.username,
            email: user.email,
            role: user.role,
            tmdb_key: user.tmdb_key,
        };
        const accessToken = this.jwtService.sign(payload);
        return accessToken;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map