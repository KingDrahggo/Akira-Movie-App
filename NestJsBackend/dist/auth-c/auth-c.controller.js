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
exports.AuthCController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const auth_c_service_1 = require("./auth-c.service");
const user_entity_1 = require("../auth/entities/user.entity");
const get_user_decorator_1 = require("../auth/decorators/get-user.decorator");
const signin_dto_1 = require("../auth/dto/signin.dto");
const signup_dto_1 = require("../auth/dto/signup.dto");
const update_user_dto_1 = require("../auth/dto/update-user.dto");
const check_email_dto_1 = require("../auth/dto/check-email.dto");
let AuthCController = class AuthCController {
    constructor(authService) {
        this.authService = authService;
    }
    signUp(signupCredentialsDto, res) {
        return this.authService.signUp(signupCredentialsDto, res);
    }
    signIn(signinCredentialsDto, res) {
        return this.authService.signIn(signinCredentialsDto, res);
    }
    checkEmail(checkEmailDto) {
        return this.authService.checkEmail(checkEmailDto);
    }
    updateUser(user, updateCredentialDto, res) {
        return this.authService.updateUser(updateCredentialDto, user, res);
    }
    findAll(request) {
        console.log(request.cookies);
    }
    refreshToken(user, res) {
        this.authService.refreshToken(user, res);
    }
    signOut(res) {
        this.authService.signOut(res);
    }
};
__decorate([
    (0, common_1.Post)('/signup'),
    openapi.ApiResponse({ status: 201, type: require("../auth/entities/user.entity").User }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignUpCredentialsDto, Object]),
    __metadata("design:returntype", Promise)
], AuthCController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiForbiddenResponse)({ description: 'not authorized' }),
    (0, common_1.Post)('/signin'),
    openapi.ApiResponse({ status: 201, type: require("../auth/entities/user.entity").User }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_dto_1.SignInCredentialsDto, Object]),
    __metadata("design:returntype", void 0)
], AuthCController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('/check-email'),
    openapi.ApiResponse({ status: 201, type: Boolean }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_email_dto_1.CheckEmailDto]),
    __metadata("design:returntype", void 0)
], AuthCController.prototype, "checkEmail", null);
__decorate([
    (0, common_1.Patch)('/userupdate'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt-c')),
    openapi.ApiResponse({ status: 200, type: require("../auth/entities/user.entity").User }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        update_user_dto_1.UpdateCredentialDto, Object]),
    __metadata("design:returntype", void 0)
], AuthCController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthCController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/refresh-token'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt-c')),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Object]),
    __metadata("design:returntype", void 0)
], AuthCController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Get)('/signout'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthCController.prototype, "signOut", null);
AuthCController = __decorate([
    (0, swagger_1.ApiTags)('auth-c'),
    (0, common_1.Controller)('auth-c'),
    __metadata("design:paramtypes", [auth_c_service_1.AuthCService])
], AuthCController);
exports.AuthCController = AuthCController;
//# sourceMappingURL=auth-c.controller.js.map