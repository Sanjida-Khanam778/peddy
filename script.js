async function loadCategory() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  showCategoryBtn(data.categories);
}

const showCategoryBtn = (data) => {
  // console.log(data);
  const categoryBtnContainer = document.getElementById(
    "category-btn-container"
  );

  data.forEach((element) => {
    // console.log(element.category_icon)
    const div = document.createElement("div");
    div.classList.add("border", "rounded-2xl");
    div.innerHTML = `
               <button id="id-${element.category}" class = "category-btns flex gap-3 items-center p-4 md:p-6 w-full justify-center" onclick = "loadSpinner('${element.category}')">
                <img class="h-10 md:h-full" src = ${element.category_icon}/>
                <p class="font-bold text-xl md:text-2xl">${element.category}</p>
               </button>
        `;
    categoryBtnContainer.appendChild(div);
  });
};

const loadSpinner = (category) => {
  document.getElementById("loader").style.display = "block";
  document.getElementById("loader-container").style.display = "flex";
  const cardContainer = document.getElementById("pet-container-all");
  cardContainer.innerHTML = "";
  cardContainer.classList.remove("bg-text_dark", "bg-opacity-10");
  const imgContainer = document.getElementById("show-liked-img");
  imgContainer.innerHTML = "";
  document.getElementById("right-container").classList.remove("border");
  setTimeout(function () {
    loadByCategory(category);
  }, 2000);
  removeActive();
  document.getElementById(`id-${category}`).parentElement.className =
    "border-primary border-2 bg-primary bg-opacity-10 rounded-[120px]";

};

function removeActive(){
 const removeAll = document.getElementsByClassName('category-btns');
 for(let item of removeAll){
  // console.log(item);
  item.parentElement.classList.remove('border-primary', 'border-2', 'bg-primary', 'bg-opacity-10', 'rounded-[120px]')
  item.parentElement.classList.add('border', 'rounded-2xl');
 }
}

async function loadByCategory(category) {
  document.getElementById("loader").style.display = "none";
  document.getElementById("loader-container").style.display = "none";
  const cardContainer = document.getElementById("pet-container-all");
  cardContainer.innerHTML = "";
  cardContainer.classList.add("bg-text_dark", "bg-opacity-10");
  document.getElementById("right-container").classList.add("border");

  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const data = await res.json();
  showAllPets(data.data);
}

async function loadAllPets(status) {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  // console.log(data.pets)
  document.getElementById("loader").style.display = "block";
  document.getElementById("loader-container").style.display = "flex";
  const cardContainer = document.getElementById("pet-container-all");
  cardContainer.innerHTML = "";
  cardContainer.classList.remove("bg-text_dark", "bg-opacity-10");
  const imgContainer = document.getElementById("show-liked-img");
  imgContainer.innerHTML = "";
  document.getElementById("right-container").classList.remove("border");
  setTimeout(function () {
    if (status) {
      sortBtn(data.pets);
    } else {
      showAllPets(data.pets);
    }
  }, 2000);
}

const sortBtn = (pets) => {
  // console.log(pets);
  document.getElementById("loader").style.display = "none";
  document.getElementById("loader-container").style.display = "none";
  pets.sort((a, b) => b.price - a.price);
  // console.log(pets)
  showAllPets(pets);
};

const showAllPets = (pets) => {
  document.getElementById("loader").style.display = "none";
  document.getElementById("loader-container").style.display = "none";
  const cardContainer = document.getElementById("pet-container-all");
  cardContainer.innerHTML = "";
  cardContainer.classList.add("bg-text_dark", "bg-opacity-10");
  document.getElementById("right-container").classList.add("border");

  if (pets.length === 0) {
    cardContainer.classList.remove("grid");
    cardContainer.classList.add(
      "xl:p-24",
      "p-8",
      "bg-text_dark",
      "bg-opacity-10",
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "rounded-3xl"
    );
    cardContainer.innerHTML = `
    <img src="images/error.webp"/>
    <h2 class = "font-bold text-3xl mt-6 mb-4">No Information Available</h2>
    <p class = "text-tex_light text-center md:w-3/4 ">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
    `;
    return;
  } else {
    cardContainer.classList.add("grid");
    cardContainer.classList.remove(
      "xl:p-24",
      "p-8",
      "bg-text_dark",
      "bg-opacity-10",
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "rounded-3xl"
    );
  }
  pets.forEach((pet) => {
    // console.log(pet)
    const div1 = document.createElement("div");
    div1.className = "p-5 border rounded-xl col-span-1";
    div1.innerHTML = `
        
              <div class = "h-44"><img class = "rounded-lg w-full h-full object-cover" src=${pet.image}/></div>
              <div class="space-y-2 py-6 border-b">
                <h4 class="text-xl font-bold">${pet.pet_name}</h4>
                <div class="flex items-center gap-2">
                  <div><img src="images/breed-icon.png" alt=""></div>
                  <p class="text-text_light">Breed: ${
                    pet.breed ? pet.breed : "Not Available"
                  }</p>
                </div>
                <div class="flex items-center gap-2">
                  <div><img src="images/calender-icon.png" alt=""></div>
                  <p class="text-text_light">Birth: ${
                    pet.date_of_birth ? pet.date_of_birth : "Not Available"
                  }</p>
                </div>
                <div class="flex items-center gap-2">
                  <div><img src="images/gender-icon.png" alt=""></div>
                  <p class="text-text_light">Gender: ${
                    pet.gender ? pet.gender : "Not Available"
                  }</p>
                </div>
                <div class="flex items-center gap-2">
                  <div><img src="images/dollar-icon.png" alt=""></div>
                  <p class="text-text_light">Price: ${
                    pet.price ? pet.price : "Not Available"
                  }<span class ='${pet.price?"inline":"hidden"}'>$</span></p>
                </div>
              </div>
             <div class="flex items-center justify-between mt-4">
              <button onclick = "loadLikedImage('${
                pet.petId
              }')" class="border rounded-lg px-4 py-2"><img class="h-7" src="images/like-icon.png" alt=""></button>
              <button onclick = "my_modal_count.showModal(modalCount('${pet.petId}'))" id="adopt-${pet.petId}" class="text-lg font-bold text-primary border rounded-lg px-4 py-2">Adopt</button>
              <button onclick = "my_modal_5.showModal(displayModal('${
                pet.petId
              }'))" class="text-lg font-bold text-primary border rounded-lg px-4 py-2">Details</button>
             </div>
           
        `;
    cardContainer.appendChild(div1);
  });
};

function modalCount(id) {
  const countContainer = document.getElementById("countdown");
  const count = document.getElementById("count");
  const modal = document.getElementById("my_modal_count");
  // document.getElementById('count-modal-container').appendChild(modal);

  let num = 3;
  count.innerText = num;
  countContainer.classList.add("flex");
  // document.getElementById(`adopt-${id}`).innerText = "Adopt";

  const clockId = setInterval(() => {
    num--;
    count.innerText = num;
    if (num == 1) {
      clearInterval(clockId);
    }
    // console.log(num);
  }, 1000);
  setTimeout(() => {
    countContainer.classList.add("none");
    modal.close();
    document.getElementById(`adopt-${id}`).innerText = "Adopted";
  }, 3000);

}

async function displayModal(id) {
  // console.log(id)
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await res.json();
  loadModal(data.petData);
}

function loadModal(data) {
  // console.log(data)
  const modalBox = document.getElementById("modal-box");
  modalBox.innerHTML = `
   <div>
            <div><img class = "rounded-lg w-full" src=${data.image}/></div>
            <div>
              <div class="space-y-2 py-6 border-b">
                <h4 class="text-xl font-bold">${data.pet_name}</h4>
                <div class="grid grid-cols-1 md:grid-cols-2">
                  <div class="flex items-center gap-2 col-span-1">
                    <div><img src="images/breed-icon.png" alt=""></div>
                    <p class="text-text_light">Breed: ${
                      data.breed ? data.breed : "Not Available"
                    }</p>
                  </div>
                  <div class="flex items-center gap-2 col-span-1">
                    <div><img src="images/calender-icon.png" alt=""></div>
                    <p class="text-text_light">Birth: ${
                      data.date_of_birth ? data.date_of_birth : "Not Available"
                    }</p>
                  </div>
                  <div class="flex items-center gap-2 col-span-1">
                    <div><img src="images/gender-icon.png" alt=""></div>
                    <p class="text-text_light">Gender: ${
                      data.gender ? data.gender : "Not Available"
                    }</p>
                  </div>
                  <div class="flex items-center gap-2 col-span-1">
                    <div><img src="images/dollar-icon.png" alt=""></div>
                    <p class="text-text_light">Price: ${
                      data.price ? data.price : "Not Available"
                    }$</p>
                  </div>
                  <div class="flex items-center gap-2 col-span-1">
                    <div><img src="images/gender-icon.png" alt=""></div>
                    <p class="text-text_light">Vaccinated Satus: ${
                      data.vaccinated_status
                        ? data.vaccinated_status
                        : "Not Available"
                    }</p>
                  </div>
                </div>
              </div>
            </div>
            <div class = "py-6 space-y-2">
              <h4 class="font-bold">Details Information</h4>
              <p class ="text-justify">${
                data.pet_details ? data.pet_details : "Not Available"
              }</p>
            </div>
          </div>
  `;
}

async function loadLikedImage(id) {
  // console.log(id)
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await res.json();
  showLikedImage(data.petData.image);
  loadModal(data.petData);
}

function showLikedImage(image) {
  // console.log(image)
  const imgContainer = document.getElementById("show-liked-img");
  const div = document.createElement("div");
  div.className = "border rounded-xl col-span-1";
  div.innerHTML += `
  <img class="rounded-xl" src=${image}/>
  `;
  imgContainer.appendChild(div);
}

loadAllPets(false);
loadCategory();
