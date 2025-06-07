import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { Client } from "pg";
import { InjectBot, Start, Update, Command, Ctx } from "nestjs-telegraf";
import { Context, Telegraf } from "telegraf";
import { DataSource, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Subscriber } from "./entities/subscriber.entity";

@Injectable()
@Update()
export class OrderNotificationService implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly dataSource: DataSource,
    @InjectBot() private readonly bot: Telegraf<any>,
    @InjectRepository(Subscriber)
    private readonly subscriberRepository: Repository<Subscriber>
  ) {}

  @Start()
  async start(@Ctx() ctx: Context) {
    await ctx.reply("Send /auth <password> to subscribe to notifications");
  }

  @Command("auth")
  async auth(@Ctx() ctx: Context) {
    const text = ctx.message && "text" in ctx.message ? ctx.message.text : "";
    const [, password] = text.split(" ");
    if (password === process.env.TELEGRAM_BOT_PASSWORD) {
      const chatId = String(ctx.chat.id);
      const existing = await this.subscriberRepository.findOne({
        where: { chatId },
      });
      if (!existing) {
        await this.subscriberRepository.save({ chatId });
      }
      await ctx.reply("Successfully subscribed to notifications");
    } else {
      await ctx.reply("Invalid password");
    }
  }

  private pgClient: Client;

  async test() {
    const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
    const message = `✅ Заказ #${1} был успешно оплачен!`;

    try {
      await this.bot.telegram.sendMessage(chatId, message);
    } catch (error) {
      console.error(
        "❌ Ошибка при отправке уведомления в Telegram:",
        error.message
      );
    }
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

    await this.pgClient.query("LISTEN order_paid_channel");

    this.pgClient.on("notification", async (msg) => {
      const orderId = msg.payload;

      if (msg.channel === "order_paid_channel") {
        await this.sendTelegramNotification(orderId);
      }
    });
  }

  async onModuleDestroy() {
    if (this.pgClient) {
      await this.pgClient.end();
    }
  }

  async sendMessageToSubscribers(message: string) {
    const subscribers = await this.subscriberRepository.find();
    for (const sub of subscribers) {
      try {
        await this.bot.telegram.sendMessage(sub.chatId, message);
      } catch (error) {
        console.error("Telegram send error:", error.message);
      }
    }
  }

  private async sendTelegramNotification(orderId: string) {
    const timestamp = new Date().toLocaleString("uk-UA");

    const message = `💥💰 *ОПЛАТА! ОПЛАТА! ОПЛАТА!* 💰💥\n
#️⃣ Заказ №${orderId}
🟢 Статус: *УСПЕШНАЯ ОПЛАТА*
🕒 Время: ${timestamp}
📦 Готовим к отправке!
━━━━━━━━━━━━━━━\n
🔥 Деньги зашли. Двигаемся дальше.`;

    await this.sendMessageToSubscribers(message);
  }
}
