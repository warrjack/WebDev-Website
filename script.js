const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting){
			entry.target.classList.add('show');
		} else{
			entry.target.classList.remove('show')
		}
	});
})

const hiddenElements = document.querySelectorAll('.hidden', '.hidden-slide')
hiddenElements.forEach((el) => observer.observe(el));

// Select all buttons with the "View More Details" id
const flipCards = document.querySelectorAll('.flip-card');
const viewMoreButtons = document.querySelectorAll('#view-more-details-button');
const viewSummaryButtons = document.querySelectorAll('#view-summary-button');

// Loop through the buttons and add event listeners
viewMoreButtons.forEach((button) => {
  button.addEventListener('click', function() {
    // Get the flip-card-inner element that corresponds to the button clicked
    const flipCardInner = button.closest('.flip-card').querySelector('.flip-card-inner');
    
    // Toggle the 'flipped' class to trigger the flip effect
    flipCardInner.classList.toggle('flipped');
  });
});

viewSummaryButtons.forEach((button) => {
  button.addEventListener('click', function() {
    // Get the flip-card-inner element that corresponds to the button clicked
    const flipCardInner = button.closest('.flip-card').querySelector('.flip-card-inner');
    
    // Toggle the 'flipped' class to trigger the flip effect
    flipCardInner.classList.remove('flipped');
  });
});

// Drop down menu options
function dropdownFunction() {
  document.getElementsByClassName("dropdown-content")[0].classList.toggle("show-dropdown");
}
window.onclick = function(event) {
  if(!event.target.matches('.dropdown-button')){
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++){
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show-dropdown')) {
        openDropdown.classList.remove('show-dropdown');
      }
    }
  }
}

//Change settings when selecting subject options
function selectOption(option){
  document.querySelector(".dropdown-button").firstChild.textContent = option;
  document.getElementsByClassName("dropdown-content")[0].classList.remove("show-dropdown");
  var messageBoxPlaceholder = document.getElementsByClassName("message-box")[0];
  if(option == "Outreach"){ messageBoxPlaceholder.placeholder = "Hi there, I'm John. I'm reaching out to discuss a new project...";}
  else if(option == "Basic Plan"){ messageBoxPlaceholder.placeholder = "Hello! I'm Emily. I'd like to learn more about your Basic Plan...";}
  else if(option == "Standard Plan"){ messageBoxPlaceholder.placeholder = "Hi there, my name is Sharon. I would like to reach out about an idea...";}
  else if(option == "Premium Plan"){ messageBoxPlaceholder.placeholder = "Hi, I'm Mark. I have a business that would benefit from a new app...";}
  else if(option == "Other"){ messageBoxPlaceholder.placeholder = "Hi there, I'm Jack. I wanted to reach out about a project of mine...";}
  else { messageBoxPlaceholder.placeholder = "Hi there, I'm Kevin. I have an idea for a website...";}
}