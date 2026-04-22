// Dropdown menus
const dropdownNavbarLink1 = document.getElementById('dropdownNavbarLink1');
const dropdownNavbar1 = document.getElementById('dropdownNavbar1');

dropdownNavbarLink1.onclick = function() {
    dropdownNavbar1.classList.toggle('hidden');
};

const hamburgerbtn = document.getElementById('hamburgerbtn');
const firstmenu = document.getElementById('firstmenu');

hamburgerbtn.onclick = function() {
    firstmenu.classList.toggle('hidden');  
};

// Main page
const products = document.getElementById("products");
const categories = document.getElementById("categories");
const productModal = document.getElementById("productModal");
const closeProduct = document.getElementById("closeProduct");
const modalSizes = document.getElementById("modalSizes");
const modalTypes = document.getElementById("modalTypes");
const modalSubcategory = document.getElementById('modalSubcategory')
const showMoreSizes = document.getElementById("showMoreSizes");
const showMoreTypes = document.getElementById("showMoreTypes");
const showMoreSubcategory = document.getElementById("showMoreSubcategory");



const allItems = [
  ...data.kampaniyalar || [], 
  ...data.pizza || [], 
  ...data.qalyanaltilar || [], 
  ...data.party || [], 
  ...data.pasta || [], 
  ...data.salat || [], 
  ...data.icki || [], 
  ...data.desert || [], 
  ...data.souses || [], 
  ...data.papadias || []
];

let currentItem = null; 
let basket = [];


function filterProducts(category) {
  let filteredProducts = allItems.filter(item => category ? item.category === category : true);

  let productHTML = '';
  filteredProducts.forEach((item) => {
    item.count = 1;

    productHTML += `
      <div id="product-${item.id}" style="max-width: 250px ; cursor:pointer;" class="bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer">
        <img class="w-full  object-cover rounded-lg" src="${item.img}" alt="${item.title}" />
        <div class="p-2">
          <h5 class="mb-1 text-xs font-bold text-gray-900">${item.title}</h5>
          <p class="mt-2 text-sm mb-7 text-gray-700">${item.composition}</p>
          <h7 class="text-sm mb-8 mt-4 font-semibold">${formatPrice(item.price)}</h7>
        </div>
        <div class="text-center">
          <button  style="border-radius: 20px;" id="sebet${item.id}" class="mb-4 border bg-white text-white border-white px-4 py-2 tracking-widest text-sm">                       
            SƏBƏTƏ ƏLAVƏ ET
          </button>
        </div>
      </div>
    `;
  });

  categories.innerHTML = `<h2 style="font-size: 40px;" class="py-2 text-6xl font-bold">${category.toUpperCase()}</h2>`; 
  products.innerHTML = productHTML;

  filteredProducts.forEach((item) => {
    document.getElementById(`product-${item.id}`).addEventListener("click", () => {

        currentItem = { ...item }; 
        currentItem.count = 1;

        document.getElementById("modalImage").src = item.img;
        document.getElementById("modalTitle").textContent = item.title;
        document.getElementById("modalComposition").textContent = item.composition;
        document.getElementById("modalPrice").textContent = `${formatPrice(item.price)}`;
        document.getElementById("modalItemCount").textContent = currentItem.count;;

        modalSizes.innerHTML = '';
        modalTypes.innerHTML = '';
        modalSubcategory.innerHTML = '';
        showMoreSizes.classList.add("hidden");
        showMoreTypes.classList.add("hidden");
        showMoreSubcategory.classList.add("hidden");

        const handleButtonSelection = (container, buttons, selectedButton) => {
            buttons.forEach((button) => {
                button.classList.remove("bg-gray-500", "text-white"); 
                button.classList.add("bg-white", "border-green-800", "text-black"); 
            });
            selectedButton.classList.remove("bg-white", "border-green-800", "text-black"); 
            selectedButton.classList.add("bg-gray-500", "text-white"); 
        };

        if (item.variations && item.variations.length > 0) {
            const uniqueSizes = [...new Set(item.variations.map(v => v.size))];
            const initialSizes = uniqueSizes.slice(0, 1); 
            let remainingSizes = uniqueSizes.slice(1); 

            initialSizes.forEach((size) => {
                const sizeHTML = `
                    <button style="width: 140px;" class="bg-white border border-green-800 px-4 py-2 rounded-lg mr-2 mb-2 font-bold">
                        ${size}
                    </button>
                `;
                modalSizes.innerHTML += sizeHTML;
            });

            const sizeButtons = modalSizes.querySelectorAll("button");
            sizeButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    handleButtonSelection(modalSizes, sizeButtons, button);
                });
            });

            if (sizeButtons.length > 0) {
                handleButtonSelection(modalSizes, sizeButtons, sizeButtons[0]);
            }

            if (remainingSizes.length > 0) {
                showMoreSizes.classList.remove("hidden");

                showMoreSizes.onclick = () => {
                    remainingSizes.forEach((size) => {
                        const sizeHTML = `
                            <button style="width: 140px;" class="bg-white border border-green-800 px-4 py-2 rounded-lg mr-2 mb-2 font-bold">
                                ${size}
                            </button>
                        `;
                        modalSizes.innerHTML += sizeHTML;
                    });
                    showMoreSizes.classList.add("hidden"); 

                    const newSizeButtons = modalSizes.querySelectorAll("button");
                    newSizeButtons.forEach((button) => {
                        button.addEventListener("click", () => {
                            handleButtonSelection(modalSizes, newSizeButtons, button);
                        });
                    });
                };
            }
        }
        else{
            document.getElementById('olcu').classList.add("hidden")
            document.getElementById('xemirnovu').classList.add("hidden")
            document.getElementById('pizzanovu').classList.add("hidden")
            

        }

        if (item.variations && item.variations.length > 0) {
            const uniqueTypes = [...new Set(item.variations.map(v => v.type))];
            const initialTypes = uniqueTypes.slice(0, 1); 
            let remainingTypes = uniqueTypes.slice(1); 

            initialTypes.forEach((type) => {
                const typeHTML = `
                    <button style="width: 140px;" class="bg-white border border-green-800 px-4 py-2 rounded-lg mr-2 mb-2 font-bold">
                        ${type}
                    </button>
                `;
                modalTypes.innerHTML += typeHTML;
            });

            const typeButtons = modalTypes.querySelectorAll("button");
            typeButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    handleButtonSelection(modalTypes, typeButtons, button);
                });
            });

            if (typeButtons.length > 0) {
                handleButtonSelection(modalTypes, typeButtons, typeButtons[0]);
            }

            if (remainingTypes.length > 0) {
                showMoreTypes.classList.remove("hidden");

                showMoreTypes.onclick = () => {
                    remainingTypes.forEach((type) => {
                        const typeHTML = `
                            <button style="width: 140px;" class="bg-white border border-green-800 px-4 py-2 rounded-lg mr-2 mb-2 font-bold">
                                ${type}
                            </button>
                        `;
                        modalTypes.innerHTML += typeHTML;
                    });
                    showMoreTypes.classList.add("hidden"); 

                    const newTypeButtons = modalTypes.querySelectorAll("button");
                    newTypeButtons.forEach((button) => {
                        button.addEventListener("click", () => {
                            handleButtonSelection(modalTypes, newTypeButtons, button);
                        });
                    });
                };
            }
        }

        if (item.subcategory && item.subcategory.length > 0) {
            const initialSubcategory = item.subcategory.slice(0, 1); 
            let remainingSubcategory = item.subcategory.slice(1); 

            initialSubcategory.forEach((subcategory) => {
                const subcategoryHTML = `
                    <button style="width: 140px;" class="bg-white border border-green-800 px-4 py-2 rounded-lg mr-2 mb-2 font-bold">
                        ${subcategory}
                    </button>
                `;
                modalSubcategory.innerHTML += subcategoryHTML;
            });

            const subcategoryButtons = modalSubcategory.querySelectorAll("button");
            subcategoryButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    handleButtonSelection(modalSubcategory, subcategoryButtons, button);
                });
            });

            if (subcategoryButtons.length > 0) {
                handleButtonSelection(modalSubcategory, subcategoryButtons, subcategoryButtons[0]);
            }

            if (remainingSubcategory.length > 0) {
                showMoreSubcategory.classList.remove("hidden");

                showMoreSubcategory.onclick = () => {
                    remainingSubcategory.forEach((subcategory) => {
                        const subcategoryHTML = `
                            <button style="width: 140px;" class="bg-white border border-green-800 px-4 py-2 rounded-lg mr-2 mb-2 font-bold">
                                ${subcategory}
                            </button>
                        `;
                        modalSubcategory.innerHTML += subcategoryHTML;
                    });
                    showMoreSubcategory.classList.add("hidden"); 

                    const newSubcategoryButtons = modalSubcategory.querySelectorAll("button");
                    newSubcategoryButtons.forEach((button) => {
                        button.addEventListener("click", () => {
                            handleButtonSelection(modalSubcategory, newSubcategoryButtons, button);
                        });
                    });
                };
            }
        }

        productModal.classList.remove("hidden");
        productModal.classList.add("flex");
    });
});


  filteredProducts.forEach((item) => {
    document.getElementById(`product-${item.id}`).addEventListener("mouseover", () => {
      document.getElementById(`sebet${item.id}`).classList.remove("bg-white", "text-white", "border-white");
      document.getElementById(`sebet${item.id}`).classList.add("bg-[#CFEB0B]", "hover:bg-white", "text-black", "border-black");
    });

    document.getElementById(`product-${item.id}`).addEventListener("mouseout", () => {
      document.getElementById(`sebet${item.id}`).classList.remove("bg-[#CFEB0B]", "hover:bg-white", "text-black", "border-black");
      document.getElementById(`sebet${item.id}`).classList.add("bg-white", "text-white", "border-white");
    });
  });
}

const updateModalCount = (newCount) => {
    if (currentItem) {
        currentItem.count = Math.max(1, newCount); 
        document.getElementById("modalItemCount").textContent = currentItem.count;
        document.getElementById("modalPrice").textContent = `${formatPrice(currentItem.count * currentItem.price)}`;
    }
};
closeProduct.addEventListener("click", () => {
  productModal.classList.add("hidden");
  productModal.classList.remove("flex");
});

productModal.addEventListener("click", (event) => {
  if (event.target === productModal) {
    productModal.classList.add("hidden");
    productModal.classList.remove("flex");
  }
});

document.querySelector(".fa-circle-minus").addEventListener("click", () => {
    updateModalCount(currentItem.count - 1);
});

document.querySelector(".fa-circle-plus").addEventListener("click", () => {
    updateModalCount(currentItem.count + 1);
});

const addBasket = () => {
    if (!currentItem) return;

    const existingItem = basket.find((item) => item.id === currentItem.id);

    if (existingItem) {
        existingItem.count += currentItem.count;
        existingItem.price = existingItem.count * existingItem.pricePerUnit; // Recalculate total price
    } else {
        basket.push({
            id: currentItem.id,
            name: currentItem.title,
            count: currentItem.count,
            pricePerUnit: currentItem.price, 
            price: currentItem.price * currentItem.count, 
        });
    }

    updateBasketDisplay();
};

const updateBasketDisplay = () => {
    const basketContainer = document.getElementById("basket");
    basketContainer.innerHTML = ''; 
    const mobbasket = document.getElementById('mobbasket');

    if (basket.length === 0) {
        basketContainer.innerHTML = `<p class="text-sm text-gray-500">Səbətiniz boşdur</p>`;
        mobbasket.innerHTML = '';
    } else {
        let totalSum = 0; 

        basket.forEach((item, index) => {
            totalSum += item.price; 
            const basketItemHTML = `
                <div class="basket-item border-b" data-index="${index}">
                    <div style="gap: 10px;" class="flex justify-between items-start mr-2 ">                        
                        <h2 class="font-bold">${item.name}</h2>

                        <button class="delete-btn font-bold cursor-pointer" data-index="${index}"><i class="fa-solid fa-x"></i></button>
                    </div>
                    <div class="flex justify-between px-4">
                        <div class="flex items-center justify-between">
                            <i class="fa-solid fa-circle-minus text-xl cursor-pointer decrease" data-index="${index}"></i>
                            <p class="text-3xl">${item.count}</p>
                            <i class="fa-solid fa-circle-plus text-xl cursor-pointer increase" data-index="${index}"></i>
                        </div>
                        <div>
                            <p>${formatPrice(item.price)}</p>
                        </div>
                    </div>
                </div>
            `;
            basketContainer.innerHTML += basketItemHTML;
        });

        const totalHTML = `
            <div class="basket-total">
                <h2 class="text-lg font-bold mt-4">Yekun: ${formatPrice(totalSum)}</h2>
            </div>
        `;
        basketContainer.innerHTML += totalHTML;
        mobbasket.innerHTML = totalHTML;

        // Add event listeners for increment and decrement buttons
        document.querySelectorAll(".fa-circle-minus").forEach((button) => {
            button.addEventListener("click", () => {
                const index = button.getAttribute("data-index");
                updateBasketItemCount(index, -1); 
            });
        });

        document.querySelectorAll(".fa-circle-plus").forEach((button) => {
            button.addEventListener("click", () => {
                const index = button.getAttribute("data-index");
                updateBasketItemCount(index, 1); 
            });
        });

        // Add event listeners for delete buttons
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", () => {
                const index = button.getAttribute("data-index");
                deleteBasketItem(index);
            });
        });
    }
};

const updateBasketItemCount = (index, change) => {
    const item = basket[index];
    item.count += change;

    if (item.count < 1) {
        deleteBasketItem(index); // Remove item if count goes below 1
    } else {
        item.price = item.count * item.pricePerUnit;
        updateBasketDisplay();
    }
};

// Function to delete an item from the basket
const deleteBasketItem = (index) => {
    basket.splice(index, 1); // Remove item from array
    updateBasketDisplay();
};


document.getElementById("addToBasket").addEventListener("click", addBasket);

closeProduct.addEventListener("click", () => {
    productModal.classList.add("hidden");
    productModal.classList.remove("flex");
});

document.getElementById("addToBasket").addEventListener("click", () => {
    productModal.classList.add("hidden");
    productModal.classList.remove("flex");
});

productModal.addEventListener("click", (event) => {
    if (event.target === productModal) {
        productModal.classList.add("hidden");
        productModal.classList.remove("flex");
    }
});


filterProducts("kampaniyalar")

function formatPrice(price) {
    const numericPrice = parseFloat(price);

    if (Number.isInteger(numericPrice)) {
      return `${numericPrice}.00 AZN`; 
    } else {
      return `${numericPrice} AZN`; 
    }
}

//Location buttons
const deliveryType = document.getElementById('deliveryType')

document.getElementById('albtn').addEventListener('click', function() {
    deliveryType.innerHTML = `
            <h2>AL-APAR</h2>
            <input class="w-full mb-2 border border-gray-300" type="text" placeholder="Restoran axtarışı">
            <div style="width: 370px; height: 350px; gap:20px;" class="overflow-y-auto flex flex-col">
                <div class="border-2 border-green-800 rounded-lg px-3 py-1">
                    <h2 class="font-bold text-green-800">Xırdalan</h2>
                    <p class="text-sm"><i class="fa-solid fa-location-dot text-green-800"></i> Hacı Zeynalabdin Tağıyev 5</p>
                    <p class="text-sm"><i class="fa-solid fa-clock text-green-800"></i> Bazar ertəsi - Bazar: 11:00 - 23:00 Son restoran içi sifariş: 22:30 Son al-apar sifarişi: 22:45</p>
                </div>
                <div class="border-2 border-green-800 rounded-lg px-3 py-1">
                    <h2 class="font-bold text-green-800">Crescent Mall</h2>
                    <p class="text-sm"><i class="fa-solid fa-location-dot text-green-800"></i> Hacı Zeynalabdin Tağıyev 5</p>
                    <p class="text-sm"><i class="fa-solid fa-clock text-green-800"></i> Bazar ertəsi - Bazar: 11:00 - 23:00 Son restoran içi sifariş: 22:30 Son al-apar sifarişi: 22:45</p>
                </div>
                <div class="border-2 border-green-800 rounded-lg px-3 py-1">
                    <h2 class="font-bold text-green-800">Elmlər</h2>
                    <p class="text-sm"><i class="fa-solid fa-location-dot text-green-800"></i> Hacı Zeynalabdin Tağıyev 5</p>
                    <p class="text-sm"><i class="fa-solid fa-clock text-green-800"></i> Bazar ertəsi - Bazar: 11:00 - 23:00 Son restoran içi sifariş: 22:30 Son al-apar sifarişi: 22:45</p>
                </div>
                <div class="border-2 border-green-800 rounded-lg px-3 py-1">
                    <h2 class="font-bold text-green-800">Sahil</h2>
                    <p class="text-sm"><i class="fa-solid fa-location-dot text-green-800"></i> Hacı Zeynalabdin Tağıyev 5</p>
                    <p class="text-sm"><i class="fa-solid fa-clock text-green-800"></i> Bazar ertəsi - Bazar: 11:00 - 23:00 Son restoran içi sifariş: 22:30 Son al-apar sifarişi: 22:45</p>
                </div>
                <div class="border-2 border-green-800 rounded-lg px-3 py-1">
                    <h2 class="font-bold text-green-800">Gənclik</h2>
                    <p class="text-sm"><i class="fa-solid fa-location-dot text-green-800"></i> Hacı Zeynalabdin Tağıyev 5</p>
                    <p class="text-sm"><i class="fa-solid fa-clock text-green-800"></i> Bazar ertəsi - Bazar: 11:00 - 23:00 Son restoran içi sifariş: 22:30 Son al-apar sifarişi: 22:45</p>
                </div>
                <div class="border-2 border-green-800 rounded-lg px-3 py-1">
                    <h2 class="font-bold text-green-800">Əcəmi</h2>
                    <p class="text-sm"><i class="fa-solid fa-location-dot text-green-800"></i> Hacı Zeynalabdin Tağıyev 5</p>
                    <p class="text-sm"><i class="fa-solid fa-clock text-green-800"></i> Bazar ertəsi - Bazar: 11:00 - 23:00 Son restoran içi sifariş: 22:30 Son al-apar sifarişi: 22:45</p>
                </div>
                <div class="border-2 border-green-800 rounded-lg px-3 py-1">
                    <h2 class="font-bold text-green-800">Park Bulvar Ticarət Mərkəzi</h2>
                    <p class="text-sm"><i class="fa-solid fa-location-dot text-green-800"></i> Hacı Zeynalabdin Tağıyev 5</p>
                    <p class="text-sm"><i class="fa-solid fa-clock text-green-800"></i> Bazar ertəsi - Bazar: 11:00 - 23:00 Son restoran içi sifariş: 22:30 Son al-apar sifarişi: 22:45</p>
                </div>
                <div class="border-2 border-green-800 rounded-lg px-3 py-1">
                    <h2 class="font-bold text-green-800">Xırdalan</h2>
                    <p class="text-sm"><i class="fa-solid fa-location-dot text-green-800"></i> Hacı Zeynalabdin Tağıyev 5</p>
                    <p class="text-sm"><i class="fa-solid fa-clock text-green-800"></i> Bazar ertəsi - Bazar: 11:00 - 23:00 Son restoran içi sifariş: 22:30 Son al-apar sifarişi: 22:45</p>
                </div>
                <div class="border-2 border-green-800 rounded-lg px-3 py-1">
                    <h2 class="font-bold text-green-800">Xırdalan</h2>
                    <p class="text-sm"><i class="fa-solid fa-location-dot text-green-800"></i> Hacı Zeynalabdin Tağıyev 5</p>
                    <p class="text-sm"><i class="fa-solid fa-clock text-green-800"></i> Bazar ertəsi - Bazar: 11:00 - 23:00 Son restoran içi sifariş: 22:30 Son al-apar sifarişi: 22:45</p>
                </div>
                <div class="border-2 border-green-800 rounded-lg px-3 py-1">
                    <h2 class="font-bold text-green-800">Xırdalan</h2>
                    <p class="text-sm"><i class="fa-solid fa-location-dot text-green-800"></i> Hacı Zeynalabdin Tağıyev 5</p>
                    <p class="text-sm"><i class="fa-solid fa-clock text-green-800"></i> Bazar ertəsi - Bazar: 11:00 - 23:00 Son restoran içi sifariş: 22:30 Son al-apar sifarişi: 22:45</p>
                </div>
            </div>
            <button style = "font-size: 20px;" class="py-2 px-2 items-center justify-center mt-4 text-xs m-auto w-full  text-black bg-[#CFEB0B] hover:bg-white rounded-full border border-black">
                Buradan sifariş et                     
            </button>  
    `
});

document.getElementById('catbtn').addEventListener('click', function() {
    deliveryType.innerHTML = `
            <h2  class="font-bold mt-4">ÇATDIRILMA ÜNVANINI DAXİL EDİN</h2>
            <input class="w-full border border-gray-500 py-2 px-2" type="text" placeholder="Çatdırılma ünvanı" />
            <h2>Yerini avtomatik müəyyən et</h2>
            <button style="margin-top: 300px; font-size: 20px;" class=" items-center justify-center py-1 px-2 text-xs m-auto w-full  font-medium text-black bg-[#CFEB0B] hover:bg-white rounded-full border border-black">
                Çatdırılma ünvanı                    
            </button> 
`
});
document.getElementById('albtn').click();

document.getElementById('closeLocation').addEventListener('click', function() {
    document.getElementById('locationModal').classList.remove('flex');
    document.getElementById('locationModal').classList.add('hidden');

}) 


// Kupon button
const kuponInp = document.getElementById('kuponInp');
const kuponBtn = document.getElementById('kuponBtn');

kuponInp.addEventListener('input', function () {
  if (kuponInp.value.trim() !== '') {
    kuponBtn.classList.remove('hidden');
    kuponBtn.classList.add('flex');
  } else {
    kuponBtn.classList.add('hidden');
    kuponBtn.classList.remove('flex');
  }
});


// Location modal button
document.getElementById('catdirilmaBtn').addEventListener('click', function() {
    document.getElementById('locationModal').classList.add('flex');
    document.getElementById('locationModal').classList.remove('hidden');

}) 

// Basket

document.getElementById("greenbasket").addEventListener("click", () => {
    document.getElementById('mobilesebet').classList.remove("hidden");
});

document.getElementById("closemobsebet").addEventListener("click", () => {
    document.getElementById('mobilesebet').classList.add("hidden");
});



document.addEventListener("DOMContentLoaded", function () {
    const basket = document.getElementById("fullbasket");
    const footer = document.querySelector("footer");

    function updateBasketPosition() {
        const basketHeight = basket.offsetHeight;
        const basketTop = basket.getBoundingClientRect().top + window.scrollY;
        const footerTop = footer.getBoundingClientRect().top + window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        if (scrollY + basketHeight + 250 >= footerTop) {
            basket.style.position = "absolute";
            basket.style.top = `${footerTop - basketHeight - 20}px`;
        } else {
            basket.style.position = "fixed";
            basket.style.top = "250px";
        }
    }

    window.addEventListener("scroll", updateBasketPosition);
    updateBasketPosition(); 
});

