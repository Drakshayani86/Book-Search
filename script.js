
var resultContainer = document.querySelector('.result-container'); 

var resultTable = document.querySelector('#data');

var userBookList = document.querySelector('.user-book-list');

var recentUserContainerInfo = document.querySelector('.conatiner-user-info');

var btn = document.getElementById("btn");

var btnReset = document.getElementById("btn-reset");

var btnRemove = document.querySelector('.remove');

const searchInput = document.querySelector('.search');

// eventListener for search 
searchInput.addEventListener('input',() => searchBooks(searchInput.value));


/***** Search for the book*****/
const searchBooks = async searchText => {
  
  const res = await fetch("./books.json");

  const books = await res.json();
  //Get matches to current text input 
  let matches = books.filter(book=>{
    const regex = new RegExp(`^${searchText}`,'gi');
    return book.title.match(regex) || book.authors[0].match(regex);
  });
  // if searchText is null
  if(searchText.length==0){
    matches=[];
  }
  outputHtml(matches);
};


const outputHtml = matches=>{
  // if searchText is not null 
  if(matches.length>0){
    const html = matches.map(match=>`
        <li>
					<span class="name"> 
						 Title: ${match.title} <br>
						 ISBN: ${match.isbn} <br>
             Author: ${match.authors[0]} <br>
             <img src=${match.thumbnailUrl}><br>
             Status: ${match.status} <br>
             Summary: ${match.longDescription}<br>
					</span>
				</li>
     `).join('');
    resultTable.innerHTML=html;
  }
  //if details of the book are not found
  else{
    const errResponse = `<h2 style="color: red">Sorry, cannot fetch details</h2>`;
    resultTable.innerHTML=errResponse;
  }
};


btn.addEventListener("click", function() {
	fetch("./books.json").then(
  res=>{
    res.json().then(
      data=>{
        console.log(data);
        if(data.length>0){
          var temp=" ";
          temp="<thead>"+"<tr>"+"<th>ISBN</th>"+"<th>TITLE</th>"+"<th>AUTHOR</th>"+"<th>STATUS</th>"+"</tr>"+"</thead>"
          data.forEach((u)=>{
            temp +="<tr>"
            temp+="<td>"+u.isbn+"</td>";
            temp+="<td>"+u.title+"</td>";
            temp+="<td>"+u.authors[0]+"</td>"
            temp+="<td>"+u.status+"</td></tr>";

          })
          resultTable.innerHTML=temp;
          
        }
      }
    )
  }
)
});