"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
const bodyParser = require("body-parser");
const passport = require("passport");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: ['http://localhost:3000'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.use(passport.initialize());
    app.use('/payment/webhook', bodyParser.raw({
        type: 'application/json',
        limit: '500mb'
    }));
    app.use(bodyParser.json({
        limit: '500mb',
        verify: (req, res, buf) => {
            if (req.originalUrl === '/payment/webhook' || req.originalUrl === '/sumsub/webhook') {
                req.rawBody = buf;
            }
        }
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Documentation LilYou')
        .setDescription('API endpoints for the backend LilYou')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map