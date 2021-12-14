let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");

const fetchProduct = async (id) => {
  await fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    // get the object converted in JSON
    .then((data) => {
      console.log(data);
      display(data);
      addToCart(data);
    });
};

//
const display = (data) => {
  // GET THE TEMPLATE
  let template = document.querySelector(".template");
  let contenuTemplate = template.content;
  // clones the content
  let copyOfTemplateContent = document.importNode(contenuTemplate, true);

  // ACCES TEMPLATE CONTENT AND INJECT DATA
  copyOfTemplateContent.getElementById("title").textContent = data.name;
  copyOfTemplateContent.getElementById("price").textContent = data.price;
  copyOfTemplateContent.getElementById("description").textContent =
    data.description;
  // Get the img + alt
  copyOfTemplateContent.querySelector(".item__img").lastElementChild.src =
    data.imageUrl;
  copyOfTemplateContent.querySelector(".item__img").lastElementChild.alt =
    data.name;

  // create colors scrolldown options
  data.colors.forEach((element) => {
    // Create <option></option> value
    let option = document.createElement("option");
    option.value = element;
    option.textContent = element;
    copyOfTemplateContent.getElementById("colors").append(option);
  });

  // set where to load these data in html
  document.querySelector(".item").append(copyOfTemplateContent);
};

fetchProduct(id);
// "http://localhost:3000/api/products/" + id

const addToCart = (item) => {
  const btn_sendToCart = document.getElementById("addToCart");
  const quantityPicked = document.getElementById("quantity");
  const colorPicked = document.getElementById("colors");

  //Create event with colors/values chosen between 1-100.
  btn_sendToCart.addEventListener("click", (event) => {
    if (quantityPicked.value > 0 && quantityPicked.value <= 100) {
      //Get colorChoice
      let colorChoice = colorPicked.value;

      //Get quantityChoice
      let quantityChoice = quantityPicked.value;

      //Get the options from the item
      let productOptions = {
        productId: id,
        productColor: colorChoice,
        productQuantity: Number(quantityChoice),
        productName: item.name,
        productPrice: item.price,
        productDescription: item.description,
        productImg: item.imageUrl,
        productImgAlt: item.altTxt,
      };

      //Init localStorage
      let productLocalStorage = JSON.parse(localStorage.getItem("produit"));

      //Confirm Pop-Up
      const popupConfirmation = () => {
        if (
          window.confirm(`Votre commande de ${quantityChoice} ${item.name} ${colorChoice} est ajoutée au panier
Pour consulter votre panier, cliquez sur OK`)
        ) {
          window.location.href = "cart.html";
        }
      };

      //Import in the localStorage
      //If cart already have 1 item
      if (productLocalStorage) {
        const resultFind = productLocalStorage.find(
          (element) =>
            element.productId === id && element.productColor === colorChoice
        );
        //If the ordered product is already in cart
        if (resultFind) {
          let newQuantity =
            parseInt(productOptions.productQuantity) +
            parseInt(resultFind.productQuantity);
          resultFind.productQuantity = newQuantity;
          localStorage.setItem("produit", JSON.stringify(productLocalStorage));
          console.table(productLocalStorage);
          popupConfirmation();
          //If the ordered product isn't in the cart
        } else {
          productLocalStorage.push(productOptions);
          localStorage.setItem("produit", JSON.stringify(productLocalStorage));
          console.table(productLocalStorage);
          popupConfirmation();
        }
        //If the cart is empty
      } else {
        productLocalStorage = [];
        productLocalStorage.push(productOptions);
        localStorage.setItem("produit", JSON.stringify(productLocalStorage));
        console.table(productLocalStorage);
        popupConfirmation();
      }
    } else {
      // Error Pop-Up
      window.alert("Veuillez choisir au moins 1 article et/ou une couleur.");
    }
  });
};
