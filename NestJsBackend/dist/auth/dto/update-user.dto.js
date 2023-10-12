"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCredentialDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const signup_dto_1 = require("./signup.dto");
class UpdateCredentialDto extends (0, swagger_1.PartialType)(signup_dto_1.SignUpCredentialsDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateCredentialDto = UpdateCredentialDto;
//# sourceMappingURL=update-user.dto.js.map