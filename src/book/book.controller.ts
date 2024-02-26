import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schemas';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get('/:id')
  async findBook(@Param('id') id: string): Promise<Book> {
    const book = this.bookService.findById(id);
    if (!book) throw new Error('Not Found');
    return book;
  }
  q;
  @Post('/')
  async createBook(
    @Body()
    book: Book,
  ): Promise<Book> {
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
