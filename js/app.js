let movies;
const $movieList = document.querySelector('#movieList');
const $searchInput = document.querySelector('#searchInput');
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjFhODNmODg5NjI3YjBjNzRmYjY1ZGM2ZjBiNmU2YSIsInN1YiI6IjY0NzU2NGY2ZGQyNTg5MDEyMDA1OWQ3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qYbO2zm8YucQo4jLrsGEtheiaYzCIhcxhyD8M9kAqhI',
    },
};
$searchInput.focus();

fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1', options)
    .then((response) => response.json())
    .then((response) => {
        movies = Object.entries(response['results']);
        loadData();
    })
    .catch((err) => console.error(err));

let loadData = () => {
    for (const movie of movies) {
        // console.log(movie);

        let { id, title, overview, poster_path, vote_average } = movie[1];
        let index = Number(movie[0]) + 1;
        let poster_img = 'https://image.tmdb.org/t/p/w500/' + poster_path;

        let temp_html = `<li>
            <a href="#this" class="figure" onclick="alert('${id}')">
                <div class="thumb">
                    <span class="num">${index}</span>
                    <img src="${poster_img}" alt="영화 포스터" />
                    <div class="cover">
                        <span>${overview}</span>
                    </div>
                </div>
                <div class="figcaption">
                    <strong>${title}</strong>
                    <span class="rating">⭐${vote_average}</span>
                </div>
            </a>
        </li>`;
        $movieList.insertAdjacentHTML('beforeend', temp_html);
    }
};

let searchData = () => {
    const query = $searchInput.value.toUpperCase();

    let filteredMovies = movies.filter((movie) => {
        return movie[1]['title'].toUpperCase().includes(query) || movie[1]['original_title'].toUpperCase().includes(query);
    });

    $movieList.textContent = '';
    for (const movie of filteredMovies) {
        let { id, title, overview, poster_path, vote_average } = movie[1];
        let index = Number(movie[0]) + 1;
        let poster_img = 'https://image.tmdb.org/t/p/w500/' + poster_path;

        let temp_html = `<li>
            <a href="#this" class="figure" onclick="alert('${id}')">
                <div class="thumb">
                    <span class="num">${index}</span>
                    <img src="${poster_img}" alt="영화 포스터" />
                    <div class="cover">
                        <span>${overview}</span>
                    </div>
                </div>
                <div class="figcaption">
                    <strong>${title}</strong>
                    <span class="rating">⭐${vote_average}</span>
                </div>
            </a>
        </li>`;
        $movieList.insertAdjacentHTML('beforeend', temp_html);
    }
};

let clearInput = () => {
    $searchInput.value = '';
    loadData();
};

let keyboardSearch = (e) => {
    if (e.keyCode == 13) searchData();
};
