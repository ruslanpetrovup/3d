import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Client } from 'pg';
import { InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { DataSource } from 'typeorm';

@Injectable()
@Update()
export class OrderNotificationService implements OnModuleInit, OnModuleDestroy {
  @Start()
  async start(ctx: Context) {
    const chatId = ctx.chat.id;
    await ctx.reply(`Ваш Chat ID: ${chatId}`);
    console.log('Chat ID:', chatId);
  }

  private pgClient: Client;

  async test(){
    const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
    const message = `✅ Заказ #${1} был успешно оплачен!`;

    try {
      await this.bot.telegram.sendMessage(chatId, message);
    } catch (error) {
      console.error(
        '❌ Ошибка при отправке уведомления в Telegram:',
        error.message,
      );
    }
  }
  constructor(
    private readonly dataSource: DataSource,
    @InjectBot() private readonly bot: Telegraf<any>,
    
  ) {
    // this.test()
  }

  async onModuleInit() {
    const options = this.dataSource.options as any;

    const host = options.host;
    const port = options.port;
    const username = options.username;
    const password = options.password;
    const database = options.database;

    this.pgClient = new Client({
      host: host as string,
      port: port as number,
      user: username as string,
      password: password as string,
      database: database as string,
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

  async onModuleDestroy() {
    if (this.pgClient) {
      await this.pgClient.end();
    }
  }

  private async sendTelegramNotification(orderId: string) {
    const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
    const message = `✅ Заказ #${orderId} был успешно оплачен!`;

    try {
      await this.bot.telegram.sendMessage(chatId, message);
    } catch (error) {
      console.error(
        '❌ Ошибка при отправке уведомления в Telegram:',
        error.message,
      );
    }
  }
}
