///delete storeag
class Storage {
    constructor() {
    }
    addFilmStorage(newFilm) {
        let films = this.getFilmFromStorage();
        films.push(newFilm);
        localStorage.setItem("films", JSON.stringify(films));


    }
    getFilmFromStorage() {
        let films;
        if (localStorage.getItem("films") === null) {
            films = [];
        }
        else {
            films = JSON.parse(localStorage.getItem("films"));
        }
        return films;
    }
    deleteFilmFromStorage(deletefilm) {
        let films = this.getFilmFromStorage();
        films.forEach((film, index) => {
            if (film.title === deletefilm) {
                films.splice(index, 1);
            }
        });
        localStorage.setItem("films", JSON.stringify(films));
    }
}

