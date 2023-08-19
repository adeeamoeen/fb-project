const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const items = [

    // Add more items as needed
];

function displayResults(searchTerm) {
    searchResults.innerHTML = '';

    const matchingItems = items.filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matchingItems.length === 0) {
        searchResults.innerHTML = 'No results found.';
    } else {
        matchingItems.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.textContent = item;
            searchResults.appendChild(resultItem);
        });
    }
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value;
    displayResults(searchTerm);
});
const input = document.getElementById("dropdown-input");
const dropdownList = document.getElementById("dropdown-list");

input.addEventListener("focus", function() {
  dropdownList.style.display = "block";
});

input.addEventListener("blur", function() {
  setTimeout(() => {
    dropdownList.style.display = "none";
  }, 200);
});

input.addEventListener("input", function() {
  const filter = input.value.toLowerCase();
  const options = dropdownList.getElementsByTagName("li");
  for (let i = 0; i < options.length; i++) {
    const optionText = options[i].textContent || options[i].innerText;
    if (optionText.toLowerCase().indexOf(filter) > -1) {
      options[i].style.display = "";
    } else {
      options[i].style.display = "none";
    }
  }
});

dropdownList.addEventListener("click", function(event) {
  if (event.target.tagName === "LI") {
    input.value = event.target.textContent;
    dropdownList.style.display = "none";
  }
});
