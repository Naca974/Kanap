// Get what's in the key in localStorage + convert JSON into JS object.
let productLocalStorage = JSON.parse(localStorage.getItem("produit"));

// Create article
const createArticle = (item) => {
  // Create div in article
  const section = document.getElementById("cart__items");
  const article = document.createElement("article");
  const divImg = document.createElement("div");
  const img = document.createElement("img");
  const divContent = document.createElement("div");
  const divContentDesc = document.createElement("div");
  const productName = document.createElement("h2");
  const productColor = document.createElement("p");
  const productPrice = document.createElement("p");
  const divContentSettings = document.createElement("div");
  const divContentSettingsQuantity = document.createElement("div");
  const productQuantity = document.createElement("p");
  const inputQuantity = document.createElement("input");
  const divContentSettingsDelete = document.createElement("div");
  const deleteItem = document.createElement("p");

  // add TextNode on div in article
  const productNameText = document.createTextNode(item.productName);
  const productColorText = document.createTextNode(item.productColor);
  const productPriceText = document.createTextNode(item.productPrice + " € ");
  const productQuantityText = document.createTextNode(" Qté :  ");
  const deleteItemText = document.createTextNode(" Supprimer ");

  // Bind to html with classes
  article.classList.add("cart__item");
  divImg.classList.add("cart__item__img");
  divContent.classList.add("cart__item__content");
  divContentDesc.classList.add("cart__item__content__description");
  divContentSettings.classList.add("cart__item__content__settings");
  divContentSettingsQuantity.classList.add(
    "cart__item__content__settings__quantity"
  );
  inputQuantity.classList.add("itemQuantity");
  divContentSettingsDelete.classList.add(
    "cart__item__content__settings__delete"
  );
  deleteItem.classList.add("deleteItem");

  // Set attribute on each div
  article.setAttribute("data-id", item.productId);
  article.setAttribute("data-color", item.productColor);
  img.setAttribute("src", item.productImg);
  img.setAttribute("alt", item.productImgAlt);
  inputQuantity.setAttribute("type", "number");
  inputQuantity.setAttribute("name", "itemQuantity");
  inputQuantity.setAttribute("min", "1");
  inputQuantity.setAttribute("max", "100");
  inputQuantity.setAttribute("value", item.productQuantity);

  // Add to DOM
  section.appendChild(article);
  article.appendChild(divImg);
  article.appendChild(divContent);
  divImg.appendChild(img);
  divContent.appendChild(divContentDesc);
  divContent.appendChild(divContentSettings);
  divContentSettings.appendChild(divContentSettingsQuantity);
  divContentSettings.appendChild(divContentSettingsDelete);
  divContentSettingsQuantity.appendChild(productQuantity);
  divContentSettingsQuantity.appendChild(inputQuantity);
  divContentSettingsDelete.appendChild(deleteItem);
  deleteItem.appendChild(deleteItemText);
  divContentDesc.appendChild(productName);
  divContentDesc.appendChild(productColor);
  divContentDesc.appendChild(productPrice);
  productQuantity.appendChild(productQuantityText);
  productName.appendChild(productNameText);
  productColor.appendChild(productColorText);
  productPrice.appendChild(productPriceText);

  // Change button on cart Article
  inputQuantity.addEventListener("change", (MouseEvent) => {
    MouseEvent.preventDefault();
    updateArticle(item);
    countTotal();
  });

  // Delete button on cart Article
  deleteItem.addEventListener("click", (MouseEvent) => {
    MouseEvent.preventDefault();
    deleteArticle(item, article);
    countTotal();
  });
};

// Change quantity before order
const updateArticle = (item) => {
  let quantityListen = document.querySelectorAll(".itemQuantity");
  let index = productLocalStorage.findIndex(
    (x) =>
      x.productId === item.productId && x.productColor === item.productColor
  );
  quantityValue = quantityListen[index].value;
  productLocalStorage[index].productQuantity = quantityValue;
  localStorage.setItem("produit", JSON.stringify(productLocalStorage));
};

// Delete a product before order
const deleteArticle = (item, article) => {
  let index = productLocalStorage.findIndex(
    (x) => x.productId === item.productId
  );
  productLocalStorage.splice(index, 1);
  localStorage.setItem("produit", JSON.stringify(productLocalStorage));
  article.remove();
};

// Total calculation
const countTotal = () => {
  let totalQuantity = 0;
  let totalPrice = 0;

  if (productLocalStorage) {
    productLocalStorage.forEach((element) => {
      totalQuantity += parseInt(element.productQuantity);
      totalPrice +=
        parseInt(element.productPrice) * parseInt(element.productQuantity);
    });
  }

  document.querySelector("#totalQuantity").textContent = totalQuantity;
  document.querySelector("#totalPrice").textContent = totalPrice;
};

// Launch the functions + read through array
productLocalStorage.forEach((element) => {
  createArticle(element);
  countTotal();
});

//Form with Regex
function getForm() {
  // Add Regex
  let form = document.querySelector(".cart__order__form");

  //Create new Regex
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  // Updates firstName
  form.firstName.addEventListener("change", function () {
    firstNameChecker(this);
  });

  // Updates lastName
  form.lastName.addEventListener("change", function () {
    lastNameChecker(this);
  });

  // Updates address
  form.address.addEventListener("change", function () {
    addressChecker(this);
  });

  // Updates city
  form.city.addEventListener("change", function () {
    cityChecker(this);
  });

  // Updates Email
  form.email.addEventListener("change", function () {
    emailChecker(this);
  });

  //Validate firstName
  const firstNameChecker = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //Validate lastName
  const lastNameChecker = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //Validate address
  const addressChecker = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //Validate city
  const cityChecker = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //Validate Email
  const emailChecker = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
    }
  };
}
getForm();

//Send client info to localStorage
function postForm() {
  const orderBtn = document.getElementById("order");

  //Read through cart
  orderBtn.addEventListener("click", (event) => {
    //getting client's infos
    let inputName = document.getElementById("firstName");
    let inputLastName = document.getElementById("lastName");
    let inputAdress = document.getElementById("address");
    let inputCity = document.getElementById("city");
    let inputMail = document.getElementById("email");

    //create array from localStorage
    let productsId = [];
    for (let i = 0; i < productLocalStorage.length; i++) {
      productsId.push(productLocalStorage[i].idProduit);
    }

    const order = {
      contact: {
        firstName: inputName.value,
        lastName: inputLastName.value,
        address: inputAdress.value,
        city: inputCity.value,
        email: inputMail.value,
      },
      products: productsId,
    };

    // Convert js > json
    const options = {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.clear();

        document.location.href =
          "../html/confirmation.html/?orderId=" + data.orderId;
      });
  });
}
postForm();
