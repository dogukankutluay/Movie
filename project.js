const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const firstCardody = document.querySelectorAll(".card-body")[0];
const cardody2 = document.querySelectorAll(".card-body")[1];
const clearAllFilms = document.getElementById("clear-films");

const ui = new UI();
const storage = new Storage();



addEventListeners();

function addEventListeners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", loadWebWriteFilms);
    cardody2.addEventListener("click", filmsDel);
    clearAllFilms.addEventListener("click", deleteStorageAndUO);

}
function filmsDel(e) {
    if (e.target.id === "delete-film") {
        let films = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
        console.log(films);
        e.target.parentElement.parentElement.remove();
        storage.deleteFilmFromStorage(films);
        showAlert("success", "Film silindi", firstCardody);
    }
}
function removeElementsByClass(className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}
function deleteStorageAndUO() {
    if (localStorage.getItem("films") === null) {
        showAlert("danger", "Silinecek Film Yok", firstCardody);
    }
    else {
        removeElementsByClass("films-to");
        localStorage.removeItem("films");
        showAlert("success", "Bütün Filmler Silindi", firstCardody);

    }
}
function loadWebWriteFilms() {
    let films = storage.getFilmFromStorage();
    films.forEach(values => {
        ui.addFilmToUI(values);
    });
}
function clearForm() {
    titleElement.value = "";
    directorElement.value = "";
    urlElement.value = "";
}
function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;
    if (title === "" || director === "" || url === "") {
        showAlert("danger", "Bütün Alanları Doldrunuz", firstCardody);
    }
    else {
        const newFilm = new Film(title, director, url);
        ui.addFilmToUI(newFilm);
        storage.addFilmStorage(newFilm);
        showAlert("success", "Film Eklendi.", firstCardody);
        clearForm();
    }
    e.preventDefault();
}
function showAlert(type, mesaage, classs) {
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = `${mesaage}`;
    classs.appendChild(div);
    setTimeout(() => {
        div.remove();
    }, 2000);
}





/// tek bug tüm filmleri temizleyi iki kere success döndürmesi