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
exports.LinkFiles = exports.LinkFilesCategory = void 0;
const typeorm_1 = require("typeorm");
var LinkFilesCategory;
(function (LinkFilesCategory) {
    LinkFilesCategory["PHOTO"] = "photo";
    LinkFilesCategory["FILE"] = "file";
    LinkFilesCategory["VIDEO"] = "video";
    LinkFilesCategory["OTHER"] = "other";
})(LinkFilesCategory || (exports.LinkFilesCategory = LinkFilesCategory = {}));
let LinkFiles = class LinkFiles {
};
exports.LinkFiles = LinkFiles;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LinkFiles.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LinkFiles.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LinkFiles.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], LinkFiles.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], LinkFiles.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], LinkFiles.prototype, "category", void 0);
exports.LinkFiles = LinkFiles = __decorate([
    (0, typeorm_1.Entity)()
], LinkFiles);
//# sourceMappingURL=link-files.entity.js.map