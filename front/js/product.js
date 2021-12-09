let urlParams = new URLSearchParams(window.location.search);
console.log(window.location.search);
console.log(urlParams);
let id = urlParams.get('id');
console.log(id);


const fetchProduct = async (id) => {
    await fetch(`http://localhost:3000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            display(data);
        });
};


const display = (data) => {
    // GET THE TEMPLATE
    let template = document.querySelector(".template")
    console.log(template);
    let contenuTemplate = template.content;
    console.log(contenuTemplate);
    let copyOfTemplateContent = document.importNode(contenuTemplate, true); /// clones the content
    console.log(copyOfTemplateContent);


    // ACCES TEMPLATE CONTENT AND INJECT DATA

    copyOfTemplateContent.getElementById("title").textContent = data.name;
    copyOfTemplateContent.getElementById("price").textContent = data.price;
    copyOfTemplateContent.getElementById("description").textContent = data.description;

    copyOfTemplateContent.querySelector(".item__img").lastElementChild.src = data.imageUrl;
    copyOfTemplateContent.querySelector(".item__img").lastElementChild.alt = data.name;


    data.colors.forEach(element => {
        // recuprer la balise option et inserer la value dans la boucle
        let option = document.createElement("option");
        option.value = element;
        option.textContent = element;
        copyOfTemplateContent.getElementById("colors").append(option);
    });

    // set where to load these data

    document.querySelector(".item").append(copyOfTemplateContent);
}

fetchProduct(id);
// "http://localhost:3000/api/products/" + id



// Add event listerner on btn
// kNOW HOW TO USE localStorage.getItem() and localStorage.setItem()
// step check if

// if (JSON.parse(localStorage.getItem("card"))) {
//     let card = [];
// card.push(product)
// localStorage.setItem("card",JSON.stringify(card))
// } else { /// card exist
//     //
// }

const addToCart = async () => { 
    // Get ID's from product.html
const btn_addToCart = document.getElementById("addToCart");
const quantityPicked = document.getElementById("quantity");
const colorPicked = document.getElementById("colors");
const kanapName = document.getElementById("title").value;
const kanapPrice = document.getElementById("price").value;


// Get the value of colors/quantity input.
let colorChoice = colorPicked.value;
let quantityChoice = quantityPicked.value;

// Get options from the item to add to the cart.
btn_addToCart.addEventListener("click", (event) => {
        if (quantityPicked.value > 0 && quantityPicked.value <= 100) {
            let productOptions = {
                productId: id,
                productName: kanapName,
                productColor: colorChoice,
                productQuantity: quantityChoice,
                productPrice: kanapPrice,
                
            }
        }
});
}