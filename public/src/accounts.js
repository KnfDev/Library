const { getBorrowersForBook } = require("./books");
function _getbkbyauthid(authors,authorId){//searching books database for the authorId in that database
  return authors.find((author)=>author.id===authorId)//first parenthisis will always be a variable(search item)this becomes an index
}


function _finder(search,id) {
  return search.find(list=>list.id===id)
}

function findAccountById(accounts,id){
  return _finder(accounts,id)
}
// function findAccountById(accounts, id) {//could have used .find
//   for (let account of accounts) {
//     if (account.id === id) return account;
//   }
// }

function sortAccountsByLastName(accounts) {
  let order = accounts.sort((a, b) =>
    a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1
  );
  return order;
}

function getTotalNumberOfBorrows(account, books) {//account exists in the overall database
  let result = 0; //number of times the accounts id appears in any books borrows array
  for(let i = 0; i < books.length; i++){
    const borrower=books[i].borrows//setting an array to borrower from book[i]borrows array
    for(let j = 0; j < borrower.length; j++){//looping through array of borrower
      if(borrower[j].id===account.id)//if account id exists, increase borrows by 1
      result+=1
    }
  }
  return result
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountsId = account.id
  let result = [];
  result = books.filter((book)=>{
    return book.borrows.some((borrow)=>borrow.id===accountsId&&!borrow.returned)
  }) 
  result = result.map((book)=> {
    let author = _getbkbyauthid(authors, book.authorId)
    let newItem = {
      ...book,
      author,
    }
    console.log(newItem)
    return newItem
})
//console.log(result)
return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
