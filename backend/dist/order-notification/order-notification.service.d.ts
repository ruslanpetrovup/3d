import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Context, Telegraf } from 'telegraf';
import { DataSource } from 'typeorm';
export declare class OrderNotificationService implements OnModuleInit, OnModuleDestroy {
    private readonly dataSource;
    private readonly bot;
    start(ctx: Context): Promise<void>;
    private pgClient;
    test(): Promise<void>;
    constructor(dataSource: DataSource, bot: Telegraf<any>);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private sendTelegramNotification;
}
