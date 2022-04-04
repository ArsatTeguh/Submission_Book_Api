const {
  addBooks,
  getAllBook,
  getBookById,
  editBookById,
  deleteBook,
  GetSearch,
} = require('./Handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooks,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBook,
  },
  {
    method: 'GET',
    path: '/books/{idBook}',
    handler: getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{idBook}',
    handler: editBookById,
  },
  {
    method: 'DELETE',
    path: '/books/{idBook}',
    handler: deleteBook,
  },
  // {
  //   method: 'GET',
  //   path: '/books',
  //   handler: GetSearch,
  // },
];
module.exports = routes;