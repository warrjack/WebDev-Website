document.querySelectorAll('.image-container').forEach(item => {
    const img = item.querySelector('img');

    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const mouseY = e.clientY - rect.top; // Mouse Y position relative to the item
        const imgHeight = img.height - rect.height
        const mousePercentage = (mouseY/rect.height)*imgHeight
        img.style.transform = `translateY(-${mousePercentage}px)`; // Move up
        
    });

    item.addEventListener('mouseleave', () => {
        img.style.transform = 'translateY(0)'; // Reset position when mouse leaves
    });
});

// Set background image for future filtering
window.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.image-container').forEach(el => {
        const bg = el.getAttribute('image-data');
        el.style.setProperty('--image-data-url', `url(${bg})`);
     });
     
});
// Get the modal, image elements, and close button
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.getElementById("close");
const images = document.querySelectorAll("#website-preview");

var scrollStatus = true;

// Function to open the modal and display the clicked image
images.forEach((image) => {
    image.addEventListener("click", function () {
        modal.style.display = "flex"; // Show the modal
        modal.classList.add("show"); // Show the modal with a fade-in effect
        modalImg.src = this.src; // Set the clicked image as modal content
        scrollStatus = false;
        //disableScroll();
    });
});

// Close the modal when the close button is clicked
closeBtn.addEventListener("click", function () {
    modal.classList.remove("show"); // Hide the modal with a fade-out effect
    scrollStatus = true;
    enableScroll();
    
});

// Close the modal when clicking anywhere outside the image
window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.classList.remove("show"); // Hide the modal with a fade-out effect
        scrollStatus = true;
        enableScroll();
        
    }
});


// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
