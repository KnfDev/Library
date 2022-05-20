
function _finder(search,id) {
  return search.find(list=>list.id===id)
}

function findAuthorById(authors,id) {
  return _finder(authors,id)
}

// function findAuthorById(authors, id) {
//   for (let author of authors) {
//     if (author.id === id) return author;
//   }
// }

// return authors.find(author=>author.id===id)

function findBookById(books,id){
  return _finder(books,id)
}
// function findBookById(books, id) {
//   for (let book of books) {
//     if (book.id === id) return book;
//   }
// }

// return books.find(book=> book.id===id)

function partitionBooksByBorrowedStatus(books) {
  let borrowed = []; //empty array to hold borrowed items
  let returned = []; //empty array to hold returned items
  for (let i = 0; i < books.length; i++) {
    //loops through books data
    const isBorrowed = books[i].borrows; //assigning data to value isBorrowed
    if (isBorrowed[0].returned === true) {
      //if the value of returned
      returned.push(books[i]); //
    } else if (isBorrowed[0].returned === false) {
      borrowed.push(books[i]);
    }
  }
  let final = [borrowed, returned];
  return final;
}

function getBorrowersForBook(book, accounts) {
  let { borrows } = book; //array that is LESS than 10, will need to use slice at end
  //console.log(borrows)
  const borrowers = borrows.map(({ id, returned }) => {
    let accountsMatch = accounts.find((accountId) => id === accountId.id);

    return { ...accountsMatch, returned };
  })
  return borrowers.sort((a,b)=>a-b).slice(0,10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
