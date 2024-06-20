export interface GetAllBooksResult {
    books: [
        {
            isbn: string
            title: string
            subTitle: string
            author: string
            publish_date: string
            publisher: string
            pages: number
            description: string
            website: string
        }
    ]
}

export interface AddListOfBooks {
    userId: string
    collectionOfIsbns: [
        {
            isbn: string
        }
    ]
}

export interface AddListOfBooksResponse {
    books: [
        {
            isbn: string
        }
    ]
}

export interface DeleteBooksFromListResponse {
    userId: string
    message: string
}