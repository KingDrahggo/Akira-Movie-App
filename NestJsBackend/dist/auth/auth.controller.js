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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const user_entity_1 = require("./entities/user.entity");
const get_user_decorator_1 = require("./decorators/get-user.decorator");
const check_email_dto_1 = require("./dto/check-email.dto");
const refresh_token_dto_1 = require("./dto/refresh-token.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const signin_dto_1 = require("./dto/signin.dto");
const signup_dto_1 = require("./dto/signup.dto");
const delete_user_dot_1 = require("./dto/delete-user.dot");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signUp(signupCredentialsDto) {
        return this.authService.signUp(signupCredentialsDto);
    }
    signIn(signinCredentialsDto) {
        return this.authService.signIn(signinCredentialsDto);
    }
    refreshToken(refreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto);
    }
    checkEmail(checkEmailDto) {
        return this.authService.checkEmail(checkEmailDto);
    }
    updateUser(user, updateCredentialDto) {
        console.log(user.id.toString());
        return this.authService.updateUser(updateCredentialDto, user);
    }
    deleteAnyUser(user, deleteUserDto) {
        return this.authService.deleteAnyUser(deleteUserDto, user);
    }
    deleteUserById(user, id) {
        return this.authService.deleteUserById(user, id);
    }
};
__decorate([
    (0, common_1.Post)('/signup'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignUpCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiForbiddenResponse)({ description: 'not authorized' }),
    (0, common_1.Post)('/signin'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_dto_1.SignInCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('/refresh-token'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('/check-email'),
    openapi.ApiResponse({ status: 201, type: Boolean }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_email_dto_1.CheckEmailDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "checkEmail", null);
__decorate([
    (0, common_1.Patch)('/userupdate'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        update_user_dto_1.UpdateCredentialDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('/deleteuser'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, delete_user_dot_1.DeleteUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "deleteAnyUser", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    openapi.ApiResponse({ status: 200, type: require("./entities/user.entity").User }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "deleteUserById", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map