/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
let studentList = document.querySelector( ".student-list");



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   let startIndex = (page  * 9) - 9;
   let endIndex =  page  * 9;
   // create two variables that will represent the index for the first and last student on the page

 // select the element with a class of `student-list` and assign it to a variable
   studentList.innerHTML = '';
  // set the innerHTML property of the variable you just created to an empty string

    // loop over the length of the `list` parameter
   for ( let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {     // inside the loop create a conditional to display the proper students

         // inside the conditional:
        // create the elements needed to display the student information
        // insert the above elements

         const studentItem = studentList.insertAdjacentHTML('beforeend', `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
            <h3>${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>
         `)
      }
   }

// console.log(page);
// console.log(list)


}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const linkList = document.querySelector(".link-list");

function addPagination(list) {
// create a variable to calculate the number of pages needed
const numOfPages = Math.ceil(list.length/9);
  // select the element with a class of `link-list` and assign it to a variable
  // set the innerHTML property of the variable you just created to an empty string
linkList.innerHTML = '';
  // loop over the number of pages needed
  for ( let i = 1; i <= numOfPages; i++) {
    linkList.insertAdjacentHTML('beforeend',  `
      <li>
         <button type="button">${i}</button>
      </li>
      `);
    // create the elements needed to display the pagination button
    // insert the above elements
    linkList.querySelector("button").className = "active";
  }
  // give the first pagination button a class of "active"

  // create an event listener on the `link-list` element
  linkList.addEventListener("click", (e) => {
   if (e.target.type === "button") {
      let allButtons = linkList.querySelectorAll('button');
 // if the click target is a button:
      // remove the "active" class from the previous button
      // add the active class to the clicked button
      for (let i = 0; i < allButtons.length; i++) {
         allButtons[i].className = '';
      }
      e.target.className = 'active';
      showPage(list, e.target.textContent); // call the showPage function passing the `list` parameter and page to display as arguments
   }
  }

  )



}


// Call functions
showPage(data, 1);
addPagination(data);

//Extra Credit: Search Component
const searchTool = document.querySelector( 'h2'); // adding Search Component
window.addEventListener('load', e => {
searchTool.insertAdjacentHTML('beforeend',
`
<label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>
`
   );
// Add functionality to the Search Component
   const submit = document.querySelector('[type="button"]');
submit.addEventListener('click', e => {
   e.preventDefault();
   const studentSearch = [];
   const search = document.getElementById('search').value.toLowerCase();

      data.forEach(student => {
   const name = `${student.name.first} ${student.name.last}`.toLowerCase();
   if (name.includes(search))
      studentSearch.push(student);

});

//Display Search Results and handle not search matches
if (studentSearch.length) {
   showPage(studentSearch, 1);
   addPagination(studentSearch);
}     else {
      studentList.innerHTML = `<p>NO RESULTS FOUND</p>`;
      linkList.innerHTML = '';
}

});
});
