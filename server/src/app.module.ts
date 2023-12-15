import { ResourcesModule } from './resources';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './resources/message/message.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ...ResourcesModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
