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
exports.OrderNotificationService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const telegraf_1 = require("telegraf");
const typeorm_1 = require("typeorm");
let OrderNotificationService = class OrderNotificationService {
    async start(ctx) {
        const chatId = ctx.chat.id;
        await ctx.reply(`Ваш Chat ID: ${chatId}`);
        console.log('Chat ID:', chatId);
    }
    async test() {
        const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
        const message = `✅ Заказ #${1} был успешно оплачен!`;
        try {
            await this.bot.telegram.sendMessage(chatId, message);
        }
        catch (error) {
            console.error('❌ Ошибка при отправке уведомления в Telegram:', error.message);
        }
    }
    constructor(dataSource, bot) {
        this.dataSource = dataSource;
        this.bot = bot;
    }
    async onModuleInit() {
        const options = this.dataSource.options;
        const host = options.host;
        const port = options.port;
        const username = options.username;
        const password = options.password;
        const database = options.database;
        this.pgClient = new pg_1.Client({
            host: host,
            port: port,
            user: username,
            password: password,
            database: database,
        });
        await this.pgClient.connect();
        await this.pgClient.query('LISTEN order_paid_channel');
        this.pgClient.on('notification', async (msg) => {
            const orderId = msg.payload;
            if (msg.channel === 'order_paid_channel') {
                await this.sendTelegramNotification(orderId);
            }
        });
    }
    async sendTelegramNotification(orderId) {
        const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
        const message = `✅ Заказ #${orderId} был успешно оплачен!`;
        try {
            await this.bot.telegram.sendMessage(chatId, message);
        }
        catch (error) {
            console.error('❌ Ошибка при отправке уведомления в Telegram:', error.message);
        }
    }
};
exports.OrderNotificationService = OrderNotificationService;
__decorate([
    (0, nestjs_telegraf_1.Start)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telegraf_1.Context]),
    __metadata("design:returntype", Promise)
], OrderNotificationService.prototype, "start", null);
exports.OrderNotificationService = OrderNotificationService = __decorate([
    (0, common_1.Injectable)(),
    (0, nestjs_telegraf_1.Update)(),
    __param(1, (0, nestjs_telegraf_1.InjectBot)()),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        telegraf_1.Telegraf])
], OrderNotificationService);
//# sourceMappingURL=order-notification.service.js.map