const wynikiList = document.getElementById("wynikiList");
const wyniki = JSON.parse(localStorage.getItem("wyniki")) || [];

wynikiList.innerHTML = wyniki
  .map(wynik => {
    return `<li class="wynik">${wynik.name} - ${wynik.wynik}</li>`;
  })
  .join("");
