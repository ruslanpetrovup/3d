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
exports.UsersBalance = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let UsersBalance = class UsersBalance {
};
exports.UsersBalance = UsersBalance;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UsersBalance.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UsersBalance.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 20, scale: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UsersBalance.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 20, scale: 2 }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UsersBalance.prototype, "pendingBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UsersBalance.prototype, "lastTransactionId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UsersBalance.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UsersBalance.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.VersionColumn)(),
    __metadata("design:type", Number)
], UsersBalance.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UsersBalance.prototype, "isFrozenBalance", void 0);
exports.UsersBalance = UsersBalance = __decorate([
    (0, typeorm_1.Entity)()
], UsersBalance);
//# sourceMappingURL=users-balance.entity.js.map