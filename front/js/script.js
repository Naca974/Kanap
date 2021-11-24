// http://localhost:3000/api/products/


fetch("http://localhost:3000/api/products/")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
       data.forEach(element => {
        // creation de structure
        
const items = document.querySelector(".items");
const a = document.createElement("a");
const article = document.createElement("article");
const img = document.createElement("img");
const h3 = document.createElement("h3");
const paragraphe = document.createElement("p");


h3.classList.add("productName");
paragraphe.classList.add("productDescription");

           // Renseign les Balises HTML
           a.href= "product.html?id=" + element._id;
           img.src= element.imageUrl;
           img.alt= element.name;
           h3.innerText= element.name;
           paragraphe.innerText= element.description;

           // Bind to HTML
           a.appendChild(article);
           article.appendChild(img);
           article.appendChild(h3);
           article.appendChild(paragraphe);

           // ajout de section
           items.appendChild(a);
        });
    }
        );
    

