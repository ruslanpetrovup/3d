"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const dotenv = require("dotenv");
const path_1 = require("path");
const serve_static_1 = require("@nestjs/serve-static");
const config_1 = require("@nestjs/config");
const stripe_module_1 = require("./stripe/stripe.module");
const order_module_1 = require("./order/order.module");
const preview_module_1 = require("./preview/preview.module");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const order_notification_module_1 = require("./order-notification/order-notification.module");
const user_module_1 = require("./user/user.module");
dotenv.config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            nestjs_telegraf_1.TelegrafModule.forRoot({
                token: process.env.TELEGRAM_BOT_TOKEN,
            }),
            order_notification_module_1.OrderNotificationModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                autoLoadEntities: true,
                synchronize: true,
                retryAttempts: 10,
                retryDelay: 3000,
                connectTimeoutMS: 10000,
            }),
            stripe_module_1.StripeModule,
            order_module_1.OrderModule,
            preview_module_1.PreviewModule,
            user_module_1.UserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map