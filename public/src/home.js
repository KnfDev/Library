function _getbkbyauthid(books,authorId){//searching books database for the authorId in that database
  return books.filter((book)=>book.authorId===authorId)//first parenthisis will always be a variable(search item)this becomes an index
}

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let total = 0;
  for (let i = 0; i < books.length; i++) {
    if (books[i].borrows[0].returned === false) {
      total += 1;
    }
  }
  return total;
}



function getMostCommonGenres(books) {
  let result = {};
  for (let i = 0; i < books.length; i++) {
    let genre = books[i].genre;
    if (result[genre]) {
      result[genre] += 1;
    } else {
      result[genre] = 1;
    }
  }
  let final = [];
  for (let item in result) {
    final.push({
      name: item,
      count: result[item],
    });
  }
  let order = final.sort((a, b) => b.count - a.count).slice(0, 5);
  return order;
}

function getMostPopularBooks(books) {
  let order = books
    .sort((a, b) => b.borrows.length - a.borrows.length)
    .slice(0, 5)
    .map((book) => {
      (book.name = book.title), (book.count = book.borrows.length);
      return { name: book.name, count: book.count };
    });
  //.push;
  //console.log("--", order);
  return order;
}

function getMostPopularAuthors(books, authors) {
  let array = authors.map((author)=>{
    let name = author.name.first +' '+ author.name.last
    let authorbks = _getbkbyauthid(books, author.id)
    let borrows = authorbks.reduce((acc,book)=>acc+book.borrows.length,0)
    let authinfo = {
      name: name,
      count: borrows
    }
    return authinfo
  })
  array.sort((a,b)=> b.count-a.count)
  array.splice(5)
  return array
} 

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
