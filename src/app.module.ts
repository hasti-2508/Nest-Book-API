import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { RolesGuard } from './role/role.guard';
import { APP_GUARD } from '@nestjs/core';



@Module({
  imports: [
    BookModule,
    MongooseModule.forRoot(
      'mongodb+srv://HastiKapadiya:Admin%40123@cluster0.u2jqhsh.mongodb.net/NestDemoBookAPI?retryWrites=true&w=majority&appName=Cluster0',
    ),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },],
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
