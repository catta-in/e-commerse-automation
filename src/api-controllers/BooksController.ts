import { AddListOfBooks, AddListOfBooksResponse, DeleteBooksFromListResponse, GetAllBooksResult } from "../../models/interfaces/Books.ts"
import { HTTPResponse } from "../../models/interfaces/HTTPResponse.ts"
import { BaseController } from "./BaseController.ts"


export class BooksController extends BaseController {
    private GET_ALL_BOOKS = 'BookStore/v1/Books'
    private ADD_LIST_OF_BOOKS = 'BookStore/v1/Books'
    private DELETE_LIST_OF_BOOKS_FOR_USER = 'BookStore/v1/Books'

    constructor() {
        super('BooksController')
    }

    public async getAllBooks<T = GetAllBooksResult>(
        expectSuccess = true
    ): Promise<HTTPResponse<T>> {
        const response = await this.httpRequest.get({
            url: this.GET_ALL_BOOKS
        })
        this.checkResult(response, expectSuccess)
        return response
    }

    public async addBooksToList<T = AddListOfBooksResponse>(
        body: AddListOfBooks,
        expectSuccess = true
    ): Promise<HTTPResponse<T>> {
        const response = await this.httpRequest.post({
            url: this.ADD_LIST_OF_BOOKS,
            data: body
        })
        this.checkResult(response, expectSuccess)
        return response
    }

    public async deleteBooksFromList<T = DeleteBooksFromListResponse>(
        userId: string,
        expectSuccess = true
    ): Promise<HTTPResponse<T>> {
        const response = await this.httpRequest.delete({
            url: `${this.DELETE_LIST_OF_BOOKS_FOR_USER}?UserId=${userId}`
        })
        this.checkResult(response, expectSuccess)
        return response
    }
}