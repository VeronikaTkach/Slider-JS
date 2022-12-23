let entities = [{
  image: {
    url: "./images/slider1.jpg",
    title: "Rostov-on-Don, Admiral"
  },
  data: {
    area: "81 m2",
    city: "Rostov-on-Don",
    propertyName: "LCD admiral",
    repairTime: "3,5 month"
  }
},{
  image: {
    url: "./images/slider2.jpg",
    title: "Sochi Thieves"
  },
  data: {
    area: "105 m2",
    city: "Sochi",
    propertyName: "Thieves",
    repairTime: "4 month"
  }
},{
  image: {
    url: "./images/slider3.jpg",
    title: "Rostov-on-Don Patriotic"
  },
  data: {
    area: "93 m2",
    city: "Rostov-on-Don",
    propertyName: "Patriotic",
    repairTime: "3 month"
  }
}];

function initSlider(options) {
  if (!entities || !entities.length) return;

  options = options || {
    titles: false,
    dots: true,
    autoplay: false
  };

  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".image-content");
  let sliderDots = document.querySelector(".slider__dots");
  let sliderLink = document.querySelector(".projects-list");
  let cityElement = document.querySelector("#city");
  let areaElement = document.querySelector("#area");
  let timeElement = document.querySelector("#time");

  initImages();
  initArrows();
  initLink();

  if (options.dots) {
    initDots();
  }

  moveSlider(0);

  function initImages() {
    entities.forEach((entity, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${entity.image.url});" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }

  function initArrows() {
    sliderArrows.querySelectorAll(".slider__arrows").forEach(arrow => {
      arrow.addEventListener("click", function() {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0? entities.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === entities.length - 1? 0 : curNumber + 1;
        }

        moveSlider(nextNumber);
      });
    });
  }

  function initLink(){
    sliderLink.querySelectorAll(".projects-link").forEach(link => {
      link.addEventListener("click", function() {
        let imageNumber;
        if (link.classList.contains("link-first")) {
          imageNumber = entities.length - 3;
        } 
        if (link.classList.contains("link-second")) {
          imageNumber = entities.length - 2;
        } 
        if (link.classList.contains("link-third")) {
          imageNumber = entities.length - 1;
        } 

        moveSlider(imageNumber);
      });
    });
  }

  function initDots() {
    entities.forEach((entity, index) => {
      let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }

  function moveSlider(index) {
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + index).classList.add("active");
    
    if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + index).classList.add("active");
    }

    areaElement.innerHTML = entities[index].data.area;
    cityElement.innerHTML = `${entities[index].data.city}<br>${entities[index].data.propertyName}`;
    timeElement.innerHTML = entities[index].data.repairTime;
  }
}

let sliderOptions = {
dots: true,
};

document.addEventListener("DOMContentLoaded", function() {
initSlider(sliderOptions);
});