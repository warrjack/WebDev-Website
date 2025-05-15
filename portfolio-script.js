/*document.querySelectorAll('.image-container').forEach(item => {
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
*/

// -- Filter Background Images --
// Set background image for future filtering
window.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.image-container').forEach(el => {
        const bg = el.getAttribute('image-data');
        el.style.setProperty('--image-data-url', `url(${bg})`);
     });

    // -- Scrolling Parallax --
    const wrapperArray = document.getElementsByClassName('image-container');
    const speedMultiplier = 3;

    // Vars are changed when resized
    var viewportHeight = window.innerHeight;
    var viewportWidth = window.innerWidth;
    var sampleScrollObject = wrapperArray[0].querySelector('.image-infront');
    var topOffest = sampleScrollObject.clientHeight * offsetAmount();
    parallaxEffect();


    window.addEventListener('resize', () => {
        viewportHeight = window.innerHeight;
        viewportWidth = window.innerWidth;
        // Top offset by y amount
        topOffest = sampleScrollObject.clientHeight * offsetAmount()
        parallaxEffect()
    });


    window.addEventListener('scroll', () => {
        parallaxEffect();
    });

    function offsetAmount(){
        if (viewportWidth > 1441){
            return sampleScrollObject.clientHeight * 0.95;
        }
        else if (viewportWidth > 1025) {
            return sampleScrollObject.clientHeight * 0.85;
        }
        else if (viewportWidth >= 820){
            return 175;
        }
        else {
            return 55;
        }

    }

    function parallaxEffect(){
        Array.from(wrapperArray).forEach(wrapper => {
            //get distance from top of wrapper to top of viewport
            const wrapperRect = wrapper.getBoundingClientRect();
            //point where wrapper leaves viewport
            const end = -wrapperRect.height - viewportHeight;
            if (wrapperRect.bottom < 0 || wrapperRect.top > viewportHeight){
                return;
            }
            // Calculate progress from 0 to 1
            const progress = (wrapperRect.top - end) / (viewportHeight - end);
            
            // /console.log(wrapperRect.top - end, start - end, progress);
            const clampedProgress = Math.min(Math.max(progress, 0), 1);

            //Check if on smaller screen
            var scrollObject;
            //Larger Screen Layout
            if(viewportWidth > 1025){
                scrollObject = wrapper.querySelector(".image-infront");
                // Calculate vertical translation from bottom (100%) to top (0%)
                const maxMove = ((wrapper.offsetHeight - scrollObject.offsetHeight) * speedMultiplier);
                const translateY = -1*((1 - clampedProgress) * maxMove - offsetAmount());
                console.log('offsetAmount', offsetAmount())
                scrollObject.style.transform = `translateY(${translateY}px)`;
            }
            //Smaller Screen Layout
            else{
                scrollObject = wrapper.parentElement.querySelector(".small-image-infront");
                // Calculate vertical translation from bottom (100%) to top (0%)
                const maxMove = ((wrapper.offsetHeight - scrollObject.offsetHeight) * speedMultiplier);
                const translateY = 1*((1 - clampedProgress) * maxMove + offsetAmount());
                console.log('offsetAmount', offsetAmount())
                scrollObject.style.transform = `translateY(${translateY}px)`;
            }

            
        });
    }
});

/*// -- Zoom in on image --
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
*/

// -- Disable Scrolling --
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

// call this to Disable Scrolling
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable Scrolling
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}


