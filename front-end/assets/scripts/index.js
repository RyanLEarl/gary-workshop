/* ******************************** NAVBAR ******************************* */
directories = [
    '',
    'Beads',
    'Ceramics',
    'EpoxyTables',
    'Feathers',
    'Glass',
    'LaserEngraving',
    'Metal',
    'Wood'
  ]
  
  var getDirectories = directories;
  
  function createHead() {
    const head = document.getElementById("head");
    var title = document.createElement("Title");
    title.innerHTML = "Gary's Workshop"
    head.appendChild(title);
  }
  
  function createHeader() {
    const header = document.getElementById("header");
    var nav = document.createElement("nav");
    var menu = document.createElement("div")
    nav.setAttribute("id", "nav")
    var name = document.createElement("a");
    name.setAttribute("class", "logo")
    name.setAttribute("href", "/")
    name.innerHTML = "Gary's Workshop"
    nav.appendChild(name)
    menu.setAttribute("class", "menu")
    for (i = 0; i<= getDirectories.length-1; i++) {
      var list = document.createElement("li");
      var item = document.createElement("a");
      item.setAttribute("class", "btn");
      if (getDirectories[i] == "") {
        getDirectories[i] = "Home";
        item.setAttribute("href", "/");
      }
      else {
        item.setAttribute("href", "/WorkType/"+getDirectories[i]+".html");
      }
      item.innerHTML = getDirectories[i];
      list.appendChild(item)
      menu.appendChild(list);
      nav.appendChild(menu);
    }
    header.appendChild(nav);
  }
  /* ******************************** LOAD IMAGES ******************************* */
  function loadCarouselImages(images) {
    const listSize = images.length
    // console.log(listSize)
    let i=0
    while (i < listSize) {
      console.log(i)
      const currentImage = images.indexOf(images[i]);
      const container = document.getElementById("slideshow-container");
      var slide = document.createElement("div");
      var number = document.createElement("div");
      var img = document.createElement("img");
      var caption = document.createElement("div");
      var prevButton = document.createElement("a");
      var nextButton = document.createElement("a");
      slide.setAttribute("class","mySlides fade");
      number.setAttribute("class","numbertext");
      number.innerHTML = (currentImage+1)+"/"+listSize;
      img.setAttribute("src",images[i]);
      img.setAttribute("style","width:100%");
      caption.setAttribute("class","text");
      caption.innerHTML = "";
      prevButton.setAttribute("class", "prev");
      prevButton.setAttribute("onclick", "plusSlides(-1)");
      prevButton.innerHTML="&#10094;";
      nextButton.setAttribute("class", "next");
      nextButton.setAttribute("onclick", "plusSlides(1)");
      nextButton.innerHTML="&#10095;";
      slide.appendChild(number);
      slide.appendChild(img);
      slide.appendChild(caption);
      container.appendChild(slide);
      container.appendChild(prevButton);
      container.appendChild(nextButton);
      i++
    }
  }
  
  function getImageNames(workTypeDirectory, directorySize) {
    console.log(workTypeDirectory)
    i = 0;
    images = []
    console.log(directorySize);
    while (i<directorySize) {
      images.push("/assets/images/"+workTypeDirectory+"/"+i+".jpeg");
      i++;
    }
    loadCarouselImages(images);
  }
  
  /* ******************************** Carousel ******************************* */
  let slideIndex = 1;
  showSlides(slideIndex);
  
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  
  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
  }

/* ******************************** CONTACT ******************************* */
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('contact-form').addEventListener('submit', async function(event) {
      event.preventDefault();
      const senderName = document.getElementById('name').value;
      const senderEmail = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      console.log(`senderName: ${senderName}\n senderEmail: ${senderEmail}\n message: ${message}`)
      sendPostEmail(senderName, senderEmail, message);
      document.getElementById("thank-you-message").innerHTML = "Thanks for your message. \nI'll get back to you shortly";
      document.getElementById('contact-form').style.display = 'none';
    });
  });
  
  function sendPostEmail(senderName, senderEmail, message) {
    fetch(API_BASE_URL, {
    method: "POST",
    body: JSON.stringify({
      senderName: senderName,
      senderEmail: senderEmail,
      message: message
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.text())
    .then(text => {
      // Display the return message here
      document.querySelector('#return-message').textContent = text;
    });
  }