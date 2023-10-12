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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpCredentialsDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_role_enum_1 = require("../enums/user-role.enum");
class SignUpCredentialsDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { username: { required: true, type: () => String, minLength: 4, maxLength: 10 }, password: { required: true, type: () => String }, email: { required: true, type: () => String }, role: { required: true, type: () => String }, tmdb_key: { required: true, type: () => String, minLength: 15 } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'show username in the header or nav after user signin',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(4),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], SignUpCredentialsDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpCredentialsDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignUpCredentialsDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(user_role_enum_1.UserRole),
    __metadata("design:type", String)
], SignUpCredentialsDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(15),
    __metadata("design:type", String)
], SignUpCredentialsDto.prototype, "tmdb_key", void 0);
exports.SignUpCredentialsDto = SignUpCredentialsDto;
//# sourceMappingURL=signup.dto.js.map