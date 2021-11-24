const product = window.location.search.split("?").join("");
console.log(product);

let productData = [];

const fetchProduct = async () => {
    await fetch("http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926")
        .then((res) => res.json())
        .then((promise) => {
            productData = promise
            console.log(productData);
        });
};



