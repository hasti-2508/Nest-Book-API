import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';


@Module({
  imports: [
    BookModule,
    MongooseModule.forRoot(
      'mongodb+srv://HastiKapadiya:Admin%40123@cluster0.u2jqhsh.mongodb.net/NestDemoBookAPI',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    try{
      await mongoose.connection;
      console.log("MongoDB is Connected...");
    }
    catch (err) {                                                             
      console.error(err);
    }
  }
}
