import { test, expect } from '@playwright/test'
import { BooksController } from '../../src/api-controllers/BooksController'


test.describe('Add a book to the list of books for a logged in user', () => {
    let booksController: BooksController
    let isbn: string
    let userId: string

    test.beforeAll(async () => {
        booksController = new BooksController()
        await booksController.loginAndGetData()
        userId = process.env.USER_ID ?? ''
    })

    test.afterAll(async () => {
        await booksController.deleteBooksFromList(userId)
    })

    test('Find a book and add it to the list', async () => {
        await test.step('Get all books and find a needed one', async () => {
            const response = await booksController.getAllBooks(true)
            expect(response.data.books[0]).toHaveProperty('isbn')
            isbn = response.data.books[0].isbn

        })

        await test.step('Add book to the list', async () => {
            const body = {
                userId: userId,
                collectionOfIsbns: [
                    {
                        isbn: isbn
                    }
                ]
            }
            const response = await booksController.addBooksToList(body)
            expect(response.data.books[0].isbn).toBe(isbn)
        })
    })
})