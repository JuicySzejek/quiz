const imie = document.getElementById("imie");
const zapiszwynikprzycisk = document.getElementById("zapiszwynikprzycisk");
const wynikost = document.getElementById("wynikost");
const najOstatniwynik = localStorage.getItem("najOstatniwynik");

const wyniki = JSON.parse(localStorage.getItem("wyniki")) || [];

const najw_wynikS = 5;

wynikost.innerText = najOstatniwynik;

imie.addEventListener("keyup", () => {
  zapiszwynikprzycisk.disabled = !imie.value;
});

zapiszwynik = e => {
  e.preventDefault();

  const wynik = {
    wynik: document.getElementById("wynikost").innerHTML,
    name: imie.value
  };
  wyniki.push(wynik);
  wyniki.sort((a, b) => b.wynik - a.wynik);
  wyniki.splice(5);

  localStorage.setItem("wyniki", JSON.stringify(wyniki));
  window.location.assign("wyniki.html");
};
