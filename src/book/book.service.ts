import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schemas';
import mongoose from 'mongoose';
import { error } from 'console';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async findById(id: string): Promise<Book> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }

    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new Error('id not found');
    }
    return book;
  }

  async create(book: Book): Promise<Book> {
    // const newBook = await this.bookModel.create(book);
    // return await newBook.save();
    const createdBook = new this.bookModel(book);
    return await createdBook.save();
  }

  async updateBook(id: string, book: Book): Promise<Book> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }

    const updateBook = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
    });
    if (!updateBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return await updateBook.save();
  }

  async deleteBook(id): Promise<void> {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('Invalid ID', 400);
    }
    const deleteBook = await this.bookModel.findByIdAndDelete(id);
    if (!deleteBook) {
      throw new Error('Book not found');
    }
  }
}
