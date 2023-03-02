const apiKey = `9e147685e4c03951918def65d3dbc6a6`;
const baseUrl = `https://api.themoviedb.org/3/`;
const imageUrl = `https://image.tmdb.org/t/p/w500`;

const loading = document.querySelector(".loading");
const loader = document.createElement("span");
loader.classList.add("loader");
loading.appendChild(loader);

const row = document.querySelector(".row")

async function asyncFunction() {

    const search = document.querySelector("#search").value;

    let url;

    if (search) {
        url = `${baseUrl}search/movie?api_key=${apiKey}&query=${search}`
    } else {
        url = `${baseUrl}discover/movie?api_key=${apiKey}`
    }
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error ("Not found 404")
        }
        const data = await response.json();

        const allMovie = data.results.map((movie) => {
            return `
            <div class="col-lg-4 col-md-6">
                <div class="card" style="width: 100%;">
                    <img src="${imageUrl}${movie.backdrop_path}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.overview}</p>
                    <span>${movie.release_date}</span>
                    </div>
                </div>
            </div>
            `
        });
        row.innerHTML = allMovie.join("");

    } catch (error) {
        console.error(error.message);
    } finally {
        const loader = document.querySelector(".loader");
        if (loader) {
            loading.remove()
        }
    }
}

const searchFind = document.querySelector("#search");

searchFind.addEventListener("input", ()=>{

    asyncFunction();

})

setTimeout(() => {
    asyncFunction();
}, 2000);