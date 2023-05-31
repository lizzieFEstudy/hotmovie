const $movieList = document.querySelector('#movieList');
const $searchInput = document.querySelector('#searchInput');
const $themeText = document.querySelector('#themeBtn b');
const $recentList = document.querySelector('#recentList');
let movies;
let keywordArr = JSON.parse(localStorage.getItem('recentkeyword')) || [];
const theme = localStorage.getItem('theme');
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
        loadData(movies);
    })
    .catch((err) => console.error(err));

let loadData = (movies) => {
    $movieList.textContent = '';
    for (const movie of movies) {
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

let searchData = (searchKeyword) => {
    const query = ((!searchKeyword ? saveRecentKeyword() : searchKeyword) || $searchInput.value).toUpperCase();
    if (query == '') return alert('영화 제목을 입력해주세요');

    let filteredMovies = movies.filter((movie) => {
        return movie[1]['title'].toUpperCase().includes(query) || movie[1]['original_title'].toUpperCase().includes(query);
    });
    if (!filteredMovies.length) return alert('해당하는 영화가 없습니다');

    loadData(filteredMovies);
};

let clearInput = () => {
    $searchInput.value = '';
    loadData(movies);
};

let keyboardSearch = (e) => {
    if (e.keyCode == 13) searchData();
};

// 다크 모드
if (theme) {
    $themeText.innerHTML = theme === 'dark' ? 'ON' : 'OFF';
    document.documentElement.setAttribute('data-theme', theme);
}
let toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    $themeText.innerHTML = newTheme === 'dark' ? 'ON' : 'OFF';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
};

// 최근 검색어
let loadRecentKeyword = () => {
    $recentList.textContent = '';
    for (keyword of keywordArr) {
        let temp_html = `<li><a href="#" onclick="searchData('${keyword}')">${keyword}</a><button type="button" class="del_btn" onclick="delRecentKeyword('${keyword}')" title="삭제">X</button></li>`;
        $recentList.insertAdjacentHTML('beforeend', temp_html);
    }
};
loadRecentKeyword();

let saveRecentKeyword = () => {
    const newKeyword = $searchInput.value;
    const MAXIMUM_SIZE = 5;

    if (keywordArr.length >= MAXIMUM_SIZE) {
        keywordArr.pop();
    }
    keywordArr.unshift(newKeyword);
    localStorage.setItem('recentkeyword', JSON.stringify(keywordArr));

    loadRecentKeyword();
};

let delRecentKeyword = (target) => {
    keywordArr = keywordArr.filter((keyword) => keyword !== target);
    localStorage.setItem('recentkeyword', JSON.stringify(keywordArr));

    loadRecentKeyword();
};
