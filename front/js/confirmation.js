// let urlParams = new URLSearchParams(window.location.search);
// let orderId = urlParams.get("orderId");

function main() {
  const idNode = document.getElementById("orderId");
  idNode.innerText = localStorage.getItem("orderId");
  localStorage.clear();
}
main();
