function main() {
  let id = new URLSearchParams(window.location.search).get("orderId");
  const idNumber = document.getElementById("orderId");
  idNumber.innerText = id;
  localStorage.clear();
}
main();
