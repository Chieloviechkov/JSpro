document.addEventListener("DOMContentLoaded", function () {

    // Task 1
    const toggleButton = document.getElementById("toggleButton");
    const menu = document.getElementById("menu");
  
    let menuIsOpen = false;
  
    function toggleMenu() {
      if (menuIsOpen) {
        menu.style.display = "none";
      } else {
        menu.style.display = "block";
      }
      menuIsOpen = !menuIsOpen;
    }
  
    // Task 3
    let currentImageIndex = 0;
  const imageList = [
    "image/pngwing.com2.png",
    "image/pngwing.com.png",
    ]
  function changeBackgroundImage() {
    currentImageIndex = (currentImageIndex + 1) % imageList.length;
    const newBackgroundImage = imageList[currentImageIndex];
    toggleButton.style.backgroundImage = `url(${newBackgroundImage})`;
    }

    toggleButton.addEventListener("click", changeBackgroundImage);
  
    toggleButton.addEventListener("click", toggleMenu);
  
    // Task 2
    const buttonBiggest = document.querySelector(".biggerFontSize");
    let fontSize = 0;
  
    function fontSizeBigger() {
      fontSize += 10;
      buttonBiggest.style.fontSize = `${fontSize}px`;
    }
  
    buttonBiggest.addEventListener("click", fontSizeBigger);
  
  });
  