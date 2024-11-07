// app.js
import { ref, push, onValue, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { database } from './firebase-config.js';

// HTML елементи
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const movieResults = document.getElementById('movieResults');

const movieTitleInput = document.getElementById('movieTitle');
const movieYearInput = document.getElementById('movieYear');
const moviePosterInput = document.getElementById('moviePoster');
const addMovieButton = document.getElementById('addMovieButton');
const movieListContainer = document.getElementById('movieList');

// Створення посилання на колекцію фільмів у базі даних Firebase
const moviesRef = ref(database, 'movies');

// Пошук фільму за назвою серед даних в Firebase
searchButton.addEventListener('click', () => {
    const movieName = searchInput.value.trim();
    if (movieName) {
        searchMovieInDatabase(movieName);
    } else {
        alert("Будь ласка, введіть назву фільму.");
    }
});

// Пошук фільму в Firebase
function searchMovieInDatabase(movieName) {
    const movieQuery = query(moviesRef, orderByChild("title"), equalTo(movieName));
    onValue(movieQuery, (snapshot) => {
        movieResults.innerHTML = ''; // Очистити попередні результати
        const data = snapshot.val();
        if (data) {
            for (const key in data) {
                const movie = data[key];
                const movieElement = document.createElement('div');
                movieElement.innerHTML = `
                    <h3>${movie.title} (${movie.year})</h3>
                    <img src="${movie.poster}" alt="${movie.title} Poster">
                    <p>${movie.year}</p>
                `;
                movieResults.appendChild(movieElement);
            }
        } else {
            movieResults.innerHTML = "Фільм не знайдено.";
        }
    });
}

// Додавання нового фільму в базу даних Firebase
addMovieButton.addEventListener('click', () => {
    const title = movieTitleInput.value.trim();
    const year = movieYearInput.value.trim();
    const poster = moviePosterInput.value.trim();

    if (title && year && poster) {
        const newMovie = {
            title,
            year,
            poster
        };
        push(moviesRef, newMovie).then(() => {
            movieTitleInput.value = "";
            movieYearInput.value = "";
            moviePosterInput.value = "";
            alert("Фільм додано до бази.");
        }).catch(error => {
            console.error("Помилка при додаванні фільму:", error);
        });
    } else {
        alert("Будь ласка, заповніть усі поля.");
    }
});

// Виведення списку фільмів з Firebase
onValue(moviesRef, (snapshot) => {
    movieListContainer.innerHTML = "";
    const data = snapshot.val();
    if (data) {
        for (const key in data) {
            const movie = data[key];
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
                <h4>${movie.title} (${movie.year})</h4>
                <img src="${movie.poster}" alt="${movie.title} Poster" width="100">
            `;
            movieListContainer.appendChild(movieElement);
        }
    }
});
