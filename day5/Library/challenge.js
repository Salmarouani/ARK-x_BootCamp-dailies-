const books = require('./books.json');

// 1️⃣ Price of a Book
function priceOfBook(bookName) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].title === bookName) {
      return books[i].price;
    }
  }
  return null;
}

// 2️⃣ Affordable Books
function affordableBooks(budget) {
  const result = [];
  for (let i = 0; i < books.length; i++) {
    if (books[i].price <= budget) {
      result[result.length] = books[i];
    }
  }
  return result;
}

// 3️⃣ Find Book by Genre
function findBookByGenre(genre) {
  const result = [];
  for (let i = 0; i < books.length; i++) {
    const genres = books[i].genres;
    for (let j = 0; j < genres.length; j++) {
      if (genres[j] === genre) {
        result[result.length] = books[i];
        break;
      }
    }
  }
  return result;
}

// 4️⃣ Group Books by Genre
function groupByGenre() {
  const grouped = {};

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const genres = book.genres;

    for (let j = 0; j < genres.length; j++) {
      const genre = genres[j];
      if (!grouped[genre]) {
        grouped[genre] = [];
      }
      grouped[genre][grouped[genre].length] = book;
    }
  }

  return grouped;
}

// 5️⃣ Sort Books by Price (Bubble Sort)
function sortBooksByPrice() {
  const sorted = [];
  for (let i = 0; i < books.length; i++) {
    sorted[i] = books[i];
  }

  for (let i = 0; i < sorted.length - 1; i++) {
    for (let j = 0; j < sorted.length - i - 1; j++) {
      if (sorted[j].price > sorted[j + 1].price) {
        const temp = sorted[j];
        sorted[j] = sorted[j + 1];
        sorted[j + 1] = temp;
      }
    }
  }

  return sorted;
}

// 🔍 Optional: Export functions (for use in tests)
module.exports = {
  priceOfBook,
  affordableBooks,
  findBookByGenre,
  groupByGenre,
  sortBooksByPrice
};
