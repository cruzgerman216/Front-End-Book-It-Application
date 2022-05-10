import { Book } from './../shared/book/book.model';
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  bookListChanged = new EventEmitter<Book[]>();

  private apiBooks: Book[] = [];

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.apiBooks.slice();
  }

  fetchBooks(query: string) {
    const formattedQuery = query.split(' ').join('+').toLowerCase();

    // Send HTTP GET Request to "openLibrary" api endpoint using the formattedQuery
    this.http
      .get(`http://openlibrary.org/search.json?q=${formattedQuery}`)
      .subscribe((res) => {
        // console.log('res:', res);

        this.saveBooks(res);
      });
  }

  saveBooks(books) {
    // Clear previous results
    this.apiBooks = [];

    // Map over the books array from api
    books.docs.slice(0, 5).map((book) => {
      // Destructure the book results
      const { title, author_name, first_publish_year, isbn } = book;

      // Get our image path (BONUS)

      // For each book result => create a new book instantiation
      const newBook = new Book(
        title,
        author_name ? author_name[0] : '',
        '',
        'https://tse2.mm.bing.net/th?id=OIP.I6LGwie40Vw4K8gmV52MKwHaLc&pid=Api&P=0&w=300&h=300',
        0,
        first_publish_year,
        isbn ? isbn[0] : ''
      );

      // Push the new book to the allBooks array
      this.apiBooks.push(newBook);
    });

    // console.log('this.apiBooks:', this.apiBooks);
    this.bookListChanged.emit(this.apiBooks.slice());
  }
}
