"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const common_2 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const CookieParser = require("cookie-parser");
async function bootstrap() {
    const logger = new common_2.Logger();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(CookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('MoviesBackEnd')
        .setDescription('This backend for myMovie web project for Angular Training~')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    const port = 4231;
    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map