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
exports.VerifyCode = exports.VerifyCodeType = void 0;
const typeorm_1 = require("typeorm");
var VerifyCodeType;
(function (VerifyCodeType) {
    VerifyCodeType["FORGOT_PASSWORD"] = "forgot_password";
    VerifyCodeType["VERIFY_EMAIL"] = "verify_email";
})(VerifyCodeType || (exports.VerifyCodeType = VerifyCodeType = {}));
let VerifyCode = class VerifyCode {
};
exports.VerifyCode = VerifyCode;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VerifyCode.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], VerifyCode.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], VerifyCode.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], VerifyCode.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: new Date() }),
    __metadata("design:type", Date)
], VerifyCode.prototype, "createdAt", void 0);
exports.VerifyCode = VerifyCode = __decorate([
    (0, typeorm_1.Entity)('verify_codes')
], VerifyCode);
//# sourceMappingURL=verify-code.entity.js.map