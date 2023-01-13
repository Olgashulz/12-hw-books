const books = [];
let inputData = prompt('Enter book data (isbn, title, author, yearOfPublishing) separate by ","');
while (inputData) {
    let arr = inputData.split(',');
    if (books.findIndex(p => p.isbn === arr[0]) >= 0) {
        alert("A book with this isbn already exists, check and enter the correct data.");
    } else if (arr.length === 3 && Number.isNaN(Number(arr[2])) || arr.length === 4 && Number.isNaN(Number(arr[3]))) {
        alert("You entered incorrect year of publishing.");
    } else {
        arr.length === 3 ?  books.push(new Book(arr[0].trim(), arr[1].trim(), "unknownAuthor", Number(arr[2]))) :
        books.push(new Book(arr[0].trim(), arr[1].trim(), arr[2].trim(), Number(arr[3])));
    }
    inputData = prompt('Enter book data (isbn, title, author, yearOfPublishing) separate by ","');
}


printBooks(books);
printStats(books);

function printBooks(books) {
    books.length > 0 ? books.forEach((p, i) => console.log(`${i + 1}) ${p.fullInfoBook()}`)) : console.log("No data to print.");
}

function printStats(books) {
    console.log("=================================")
    if (books.length > 0) {
        const min = books.reduce((acc, book) => acc.yearOfPublishing < book.yearOfPublishing ? acc : acc = book, books[0]);
        const max = books.reduce((acc, book) => acc.yearOfPublishing > book.yearOfPublishing ? acc : acc = book, books[0]);
        console.log(`Min year of publishing one book: ${min.fullInfoBook()}`);
        console.log(`Max year of publishing one book: ${max.fullInfoBook()}`);
        console.log("=================================")
        const allMinPublishing = books.filter(b => b.yearOfPublishing <= min.yearOfPublishing);
        const allMaxPublishing = books.filter(b => b.yearOfPublishing >= max.yearOfPublishing);
        console.log(`Min year of publishing ${allMinPublishing.length} books:`);
        printBooks(allMinPublishing);
        console.log("=================================")
        console.log(`Max year of publishing ${allMaxPublishing.length} books:`);
        printBooks(allMaxPublishing)
    } else {
        console.log("No data for stats.")
    }
}

function Book(isbn, title, author, yearOfPublishing) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.yearOfPublishing = yearOfPublishing;
    this.fullInfoBook = function () {
        return `id:${this.isbn} title:${this.title} author:${this.author} year:${this.yearOfPublishing}`;
    };
}