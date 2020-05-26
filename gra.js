const pytanie = document.getElementById("pytanie");
const wybory = Array.from(document.getElementsByClassName("tekstwybor"));
const pasekpostepu = document.getElementById("pasekpostepu");
const wynikText = document.getElementById("wynik");
const pasekpelny = document.getElementById("pasekpelny");
const laduj = document.getElementById("laduj");
const gra = document.getElementById("gra");
let obecnePytanie = {};
let zaakceptOdpowiedzi = false;
let wynik = 0;
let pytanieLicznik = 0;
let dostepnePytaniadr = [];

let pytania = [];

zaladowanepytaniaa = (zaladowanepytania) => {
  pytania = zaladowanepytania.wynikdwa.map(zaladowanepytanie => {
    const formatPytanie = {
      pytanie: zaladowanepytanie.pytanie
    };

    const odpowiedzwybory = [...zaladowanepytanie.zle_odpowiedzi];
    formatPytanie.odpowiedz = Math.floor(Math.random() * 3) + 1;
    odpowiedzwybory.splice(
      formatPytanie.odpowiedz - 1,
      0,
      zaladowanepytanie.dobrze_odpowiedz
    );

    odpowiedzwybory.forEach((wybor, index) => {
      formatPytanie["wybor" + (index + 1)] = wybor;
    });

    return formatPytanie;
  });

  startGra();
};

const dobrze_BONUS = 10;
const najw_pytania = 3;

startGra = () => {
  pytanieLicznik = 0;
  wynik = 0;
  dostepnePytaniadr = [...pytania];
  nowePytanie();
  gra.classList.remove("hidden");
  laduj.classList.add("hidden");
};

nowePytanie = () => {
  if (dostepnePytaniadr.length === 0 || pytanieLicznik >= najw_pytania) {
    localStorage.setItem("najOstatniwynik", wynik);
    return window.location.assign("koniec.html");
  }
  pytanieLicznik++;
  pasekpostepu.innerText = `Pytanie ${pytanieLicznik}/${najw_pytania}`;
  pasekpelny.style.width = `${(pytanieLicznik / najw_pytania) * 100}%`;

  const pytanieIndex = Math.floor(Math.random() * dostepnePytaniadr.length);
  obecnePytanie = dostepnePytaniadr[pytanieIndex];
  pytanie.innerText = obecnePytanie.pytanie;

  wybory.forEach(wybor => {
    const number = wybor.dataset["number"];
    wybor.innerText = obecnePytanie["wybor" + number];
  });

  dostepnePytaniadr.splice(pytanieIndex, 1);
  zaakceptOdpowiedzi = true;
};

wybory.forEach(wybor => {
  wybor.addEventListener("click", e => {
    if (!zaakceptOdpowiedzi) return;

    zaakceptOdpowiedzi = false;
    const zaznaczWybor = e.target;
    const zaznaczOdpowiedz = zaznaczWybor.dataset["number"];

    const dodajklase =
      zaznaczOdpowiedz == obecnePytanie.odpowiedz ? "dobrze" : "zle";

    if (dodajklase === "dobrze") {
      dodajwynik(dobrze_BONUS);
    }

    zaznaczWybor.parentElement.classList.add(dodajklase);

    setTimeout(() => {
      zaznaczWybor.parentElement.classList.remove(dodajklase);
      nowePytanie();
    }, 1000);
  });
});

dodajwynik = num => {
  wynik += num;
  wynikText.innerText = wynik;
};

zaladowanepytaniaa(zaladowanepytania);