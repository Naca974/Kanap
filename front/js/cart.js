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
