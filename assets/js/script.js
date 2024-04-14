const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section.cities")
const apiKey = "ecd683ba8b864d9192d530fdce8e639c";
form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;

    const listItems = list.querySelectorAll(".ajax-section .city");
    const listItemsArray = array.from(listItems);
  
    if (listItemsArray.length > 0) {
      const filteredArray = listItemsArray.filter(el => {
          let content = "";
  
          if (inputVal.includes(",")){
              if (inputVal.split(",")[1].length > 2){
                  inputVal = inputVal.split(",")[0];
                  content = el.querySelector(".city-name span").textContent.toLowerCase();
              } else {
                  content = el.querySelector(".city-name span").textContent.toLowerCase();
              }
              return content == inputVal.toLowerCase();
          }
      });
      if (filteredArray.length > 0) {
          msg.textContent = `You already have the weather for ${filteredArray[0].querySelector(".city-name span").textContent
      }`;
      form.reset();
      input.focus();
      return;
      }
    }   







const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${APIkey}`;

fetch(url)
.then(response => response.json())
.then(data => {
    // data
})
.catch(() => {
    msg.textContent = "Please search for a valid city";
});

const { main, name, sys, weather } = data;
const icon = `https://openweathermap.org/img/wn/${
    weather[0]["icon"]}@2x.png`;

  const li = document.createElement("li");
  li.classList.add("city");
  const markup = `
  <h2 class="city-name" data-name="${name}, ${sys.country}">
  <span>${name}</span>
  <sup>${sys.country}</sup>
  </h2>
  <div class="city-temp">${Math.round(main.temp)}
  </div>
  <figure>
  <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
  <figcaption>${weather[0]["description"]}</figcaption>
  </figure>
  `;
  li.innerHTML = markup;
  list.appendChild(li);

  msg.textContent ="";
  form.reset();
  input.focus();
})

.catch(() => {
    msg.textContent = "Please search a valid city";
});



