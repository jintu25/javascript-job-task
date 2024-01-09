const openShopping = document.querySelector(".icon-cart");
const iconCartSpan = document.querySelector(".iconCartSpan");
const closeShopping = document.querySelector(".shoppingClose");
const body = document.querySelector('body')
const listProductHTML = document.querySelector(".listProduct");
const totalItem = document.querySelector(".totalItem");

const totalPriceHTML = document.querySelector(".totalPrice");
// add to cart show data.
const listCartHTML = document.querySelector(".listCart");

let listProduct = []
let carts = []

openShopping.addEventListener('click', () => {
  body.classList.add('active')
})
closeShopping.addEventListener('click', () => {
  body.classList.remove('active')
})

        // all food products store 
const listProducts = [
  {
    id: 1,
    image:
      "https://www.themediterraneandish.com/wp-content/uploads/2023/04/Mediterranean-Salad_8.jpg",
    name: "salaad",
    price: 120,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci dolorum deleniti officia voluptatibus eveniet non.",
  },
  {
    id: 2,
    image:
      "https://tastesbetterfromscratch.com/wp-content/uploads/2023/03/Chicken-Parmesan-1.jpg",
    name: "Chicken",
    price: 150,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci dolorum deleniti officia voluptatibus eveniet non.",
  },
  {
    id: 3,
    image:
      "https://pinchofnom.com/wp-content/uploads/2020/10/Chilli-Chicken-Masala-07-copy.jpg",
    name: "chicken masala",
    price: 200,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci dolorum deleniti officia voluptatibus eveniet non.",
  },
];

const addDataToHTML = () => {
  listProductHTML.innerHTML = '';

  if (listProducts.length > 0) {
    listProducts.forEach(product => {
      let newDiv = document.createElement("div");
      newDiv.classList.add('item');
      newDiv.dataset.id = product.id;
      newDiv.innerHTML = `
        <div class="card">
          <img class="w-full h-64" src=${product.image} />
          <div class="py-6 px-2">
            <h2 class="text-lg font-semibold text-serif">${product.name}</h2>
            <p class="font-bold text-orange-500 text-xl">${product.price}</p>
            <p>${product.description}</p>
            <button class="addCart flex w-full bg-red-500 px-4 py-2 rounded-lg justify-center my-3 text-white font-semibold text-lg">Add To Cart</button>
            <button class="w-full bg-white border border-red-500 text-black px-4 py-2 rounded-lg justify-center font-semibold text-lg">Customized</button>
          </div>
        </div>
      `;

      // Add event listener to the "Add to Cart" button
      const addToCartButton = newDiv.querySelector(".addCart");
      addToCartButton.addEventListener('click', () => {
        addToCart(newDiv.dataset.id);
      });

      listProductHTML.appendChild(newDiv);

      // Enable the "Add to Cart" button initially
      enableAddToCartButton(newDiv.dataset.id);
    });
  }
};

const addToCart = productId => {
  let productPositionInCart = carts.findIndex(value => value.productId == productId);
  if (carts.length <= 0 || productPositionInCart < 0) {
    carts.push({
      productId: productId,
      quantity: 1
    });
  } else {
    carts[productPositionInCart].quantity += 1;
  }
  addCartToHTML();
  // Disable the corresponding "Add to Cart" button after adding to cart
  disableAddToCartButton(productId);
};

const addCartToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  let totalPrice = 0; // Initialize totalPrice
  if (carts.length > 0) {
    carts.forEach((cart) => {
      totalQuantity += cart.quantity;

      let newDiv = document.createElement("div");
      newDiv.dataset.id = cart.productId;
      newDiv.classList.add("item");
      let positionProduct = listProducts.findIndex(
        (value) => value.id == cart.productId
      );
      let info = listProducts[positionProduct];

      const itemPrice = info.price * cart.quantity;
      totalPrice += itemPrice; // Add the item's price to totalPrice

      newDiv.innerHTML = `
      <div class=" border border-slate-50 m-4 rounded-lg gap-4">
        <div class="grid grid-cols-3 justify-evenly p-2 items-center relative">
          <div>
            <img class="w-full lg:w-20" src=${info.image} />
          </div>
          <div>
            <h2 class="text-[17px] text-lg font-semibold font-serif">${info.name}</h2>
            <p class="text-lg font-bold font-sans">${itemPrice}</p> <!-- Display the item's total price -->
          </div>
          <div class="flex bg-white justify-between items-center">
            <button class="minus"> - </button>
            <h3 class="text-xl text-black">${cart.quantity}</h3>
            <button class="plus "> + </button>
            </div>
            <button class="delete absolute top-0 right-0 text-red-500 bg-white duration-300 w-8 h-8 rounded-full p-2 flex items-center justify-center font-semibold text-xl"><i class=" fa fa-trash"></i></button>
        </div>
      </div>
      `;
      // Add event listener to the "Delete" button
      const deleteButton = newDiv.querySelector(".delete");
      deleteButton.addEventListener("click", () => {
        // Call the function to handle deletion
        deleteCartItem(cart.productId);
      });

      listCartHTML.appendChild(newDiv);
      // Disable the corresponding "Add to Cart" button for items in the cart
      disableAddToCartButton(cart.productId);
    });
  }
  iconCartSpan.innerText = totalQuantity;
  totalItem.innerText = totalQuantity;
  console.log(totalPrice)
  totalPriceHTML.innerText = totalPrice;
  // totalPrice.innerText = totalPrice; // Display the totalPrice
};

const deleteCartItem = (productId) => {
  const index = carts.findIndex((cart) => cart.productId === productId);
  if (index !== -1) {
    carts.splice(index, 1);
    // Enable the corresponding "Add to Cart" button
    enableAddToCartButton(productId);
    // Update the cart display
    addCartToHTML();
  }
};

const disableAddToCartButton = (productId) => {
  const addToCartButton = document.querySelector(`[data-id="${productId}"] .addCart`);
  if (addToCartButton) {
    addToCartButton.disabled = true;
    addToCartButton.style.backgroundColor = 'black';
  }
};

const enableAddToCartButton = (productId) => {
  const addToCartButton = document.querySelector(`[data-id="${productId}"] .addCart`);
  if (addToCartButton) {
    addToCartButton.disabled = false;
    addToCartButton.style.backgroundColor = 'orange';
  }
};
listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  let parentItem = positionClick.closest(".item");

  if (parentItem) {
    let productId = parentItem.dataset.id;

    // Check if the clicked element has the "plus" or "minus" class
    if (positionClick.classList.contains("plus")) {
      changeQuantity(productId, "plus");
    } else if (positionClick.classList.contains("minus")) {
      changeQuantity(productId, "minus");
    }
  }
});

const changeQuantity = (productId, type) => {
  let positionItemCart = carts.findIndex(
    (value) => value.productId == productId
  );
  if (positionItemCart >= 0) {
    switch (type) {
      case "plus":
        carts[positionItemCart].quantity += 1;
        break;
      default:
        let valueChange = carts[positionItemCart].quantity - 1;
        if (valueChange > 0) {
          carts[positionItemCart].quantity = valueChange;
        } else {
          carts.splice(positionItemCart, 1);
          // Enable the corresponding "Add to Cart" button
          enableAddToCartButton(productId);
        }
        break;
    }
  }
  addCartToHTML();
};
// Call addDataToHTML to initialize your product list
addDataToHTML();

