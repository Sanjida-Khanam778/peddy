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
    const button = document.createElement("button");
    button.classList.add(
      "flex",
      "gap-3",
      "justify-center",
      "items-center",
      "border",
      "rounded-2xl",
      "p-4",
      "w-full",
      "md:p-6"
    );
    button.innerHTML = `
                <img class="h-10 md:h-full" src = ${element.category_icon}/>
                <p class="font-bold text-xl md:text-2xl">${element.category}</p>
        `;
    categoryBtnContainer.appendChild(button);
    // button.setAttribute("onclick",viewAll())
  });
};

async function loadAllPets() {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  showAllPets(data.pets);
}

const showAllPets = (pets) => {
  // console.log(pets)
  const cardContainer = document.getElementById("pet-container-all");
  pets.forEach((pet) => {
    // console.log(pet)
    const div1 = document.createElement("div");
    div1.className = "p-5 border rounded-xl col-span-1";
    div1.innerHTML = `
        
              <div><img class = "rounded-lg" src=${pet.image}/></div>
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
                  }$</p>
                </div>
              </div>
             <div class="flex items-center justify-between mt-4">
              <button class="border rounded-lg px-4 py-2"><img class="h-7" src="images/like-icon.png" alt=""></button>
              <button class="text-lg font-bold text-primary border rounded-lg px-4 py-2">Adopt</button>
              <button class="text-lg font-bold text-primary border rounded-lg px-4 py-2">Details</button>
             </div>
           
        `;
    cardContainer.appendChild(div1);
  });
};

loadAllPets();
loadCategory();
