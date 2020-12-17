let form = document.querySelector('form');
let input = form.findBook;
let searchTerm;
let searchResult = document.querySelector('#searchResult');
let results = document.querySelector('#results');
console.log(input);

function handleInput(e) {
  e.preventDefault();
  searchTerm = input.value;
  console.log(input.value);
  // let html = `You searched for ${input.value}. Showing results.`;
  searchBooks(input.value);
  form.reset();
}

async function searchBooks(searchInput) {
  let html = '';
  let book;
  let bookBeingSearched = encodeURIComponent(searchInput);
  console.log(bookBeingSearched);
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookBeingSearched}`, {
  method: 'GET',
  });
  const data = await response.json();
  console.log(data);
  searchResult.innerHTML = `You searched for ${searchTerm}. Showing ${data.items.length} results.`;
  // display results
  for(let i=0; i < data.items.length; i++) {
    console.log(i);
    book = `<div class="book">
    <img src="${data.items[i].volumeInfo.imageLinks ? data.items[i].volumeInfo.imageLinks.thumbnail : ''}" alt="${data.items[i].volumeInfo.title} cover">
    <h2>${data.items[i].volumeInfo.title}</h2>
    <p>by ${data.items[i].volumeInfo.authors ? data.items[i].volumeInfo.authors[0] : ''}</p>
    <p>${data.items[i].volumeInfo.pageCount ? data.items[i].volumeInfo.pageCount : 'Unknown'} pages</p>
    </div>
    `;
    html = html + book;
  }
  results.innerHTML = html;
}

form.addEventListener('submit', handleInput);

// console.log(data.items[i].volumeInfo.title);
// console.log(data.items[i].volumeInfo.authors[0]);
// console.log(data.items[i].volumeInfo.imageLinks.thumbnail);
// console.log(data.items[i].volumeInfo.pageCount);