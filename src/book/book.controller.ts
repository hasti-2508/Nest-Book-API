import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schemas';
import { Query as ExpressQuery} from 'express-serve-static-core';
import { Roles } from 'src/role/roles.decorator';
import { Role } from 'src/role/role.enum';
// import { AuthGuard } from '@nestjs/passport'

@Controller('book')
export class BookController {
  roles: Role[]
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(
    @Query() query: ExpressQuery
  ): Promise<Book[]> {
    return this.bookService.findAll(query);
  }                                                                                                   

  @Get('/:id')
  async findBook(@Param('id') id: string): Promise<Book> {
    const book = this.bookService.findById(id);
    if (!book) throw new Error('Not Found');
    return book;
  }

  @Post('/')
  @Roles(Role.ADMIN)
  // @UseGuards(AuthGuard()) // for protected routes
  async createBook(
    @Body()
    book: Book,
  ): Promise<Book> {
    console.log("post")
    return this.bookService.create(book);
  }

  @Put('/:id')
  async updateBook(@Param('id') id: string, @Body() book: Book): Promise<Book> {
    const updateBook = await this.bookService.updateBook(id, book);
    if (!updateBook) {
      throw new Error('Book not found');
    }
    return updateBook;
  }

  @Delete('/:id')
  async deleteBook(@Param('id') id: string): Promise<void> {
    await this.bookService.deleteBook(id);
  }
}
