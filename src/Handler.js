const { nanoid } = require('nanoid');
const Book = require('./Books');

// ========================== Add Items Books ================================
const addBooks = (req, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  const bookId = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const dataBook = {
    bookId,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    insertedAt,
    updatedAt,
  };

  Book.push(dataBook);
  const isReady = Book.filter((data) => data.bookId === bookId).length > 0;

  if (isReady) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);

  return response;
};
// ========================== /Add Items Books ================================

// ========================== GET All Books ================================
const getAllBook = (request, h) => {
  const { name, reading, finished } = request.query;
  if (name) {
    const book = Book.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    const response = h.response({
      status: "success",
      data: {
        books: book.map((book) => ({
          id: book.bookId,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  if (reading) {
    const book = Book.filter((book) => Number(book.reading) === Number(reading));
    const response = h.response({
      status: "success",
      data: {
        books: book.map((book) => ({
          id: book.bookId,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  if (finished) {
    const book = Book.filter((book) => Number(book.finished) === Number(finished));
    const response = h.response({
      status: "success",
      data: {
        books: book.map((book) => ({
          id: book.bookId,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "success",
    data: {
      books: Book.map((book) => ({
        id: book.bookId,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

// ========================== /GET All Books ================================

// ========================== GET ById Books ================================
const getBookById = (request, h) => {
  const { bookId } = request.params;
  const book = Book.filter((book) => book.bookId === bookId)[0];

  if (book === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  const response = h.response({
    status: 'success',
    data: {
      book,
    },
  });
  response.code(200);
  return response;
};
// ========================== /GET ById Books ================================

// ========================== Edit Items Books ================================
const editBookById = (request, h) => {
  const { bookId } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = Book.findIndex((book) => book.bookId === bookId);

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  if (index !== -1) {
    Book[index] = {
      ...Book[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  }
  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
};
// ========================== /Edit Items Book ================================

// ========================== Delete Items Books =================================
const deleteBook = (req, h) => {
  const { bookId } = req.params;

  const index = Book.findIndex((data) => data.bookId === bookId);

  if (index !== -1) {
    Book.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
// ========================== /Delete Items Books ================================

module.exports = {
  addBooks,
  getAllBook,
  getBookById,
  editBookById,
  deleteBook,
};