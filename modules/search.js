import { saveRecentKeyword } from './recentKeyword.js';
import { movies, loadData } from './load.js';

const $searchInput = document.querySelector('#searchInput');
const $searchBtn = document.querySelector('#searchBtn');
const $resetBtn = document.querySelector('#resetBtn');
$searchInput.focus();

const searchData = (e) => {
    let targetKeyword = e ? e.target.dataset.keyword : null;
    const query = ((!targetKeyword ? saveRecentKeyword() : targetKeyword) || $searchInput.value).toUpperCase();
    if (query == '') return alert('영화 제목을 입력해주세요');

    let filteredMovies = movies.filter((movie) => {
        return movie[1]['title'].toUpperCase().includes(query) || movie[1]['original_title'].toUpperCase().includes(query);
    });
    if (!filteredMovies.length) return alert('해당하는 영화가 없습니다');

    loadData(filteredMovies);
};

const resetInput = () => {
    $searchInput.value = '';
    loadData(movies);
};

const keyboardSearch = (e) => {
    if (e.keyCode == 13) searchData();
};

$searchBtn.addEventListener('click', searchData);
$resetBtn.addEventListener('click', resetInput);
$searchInput.addEventListener('keydown', keyboardSearch);

export { searchData, resetInput, keyboardSearch, $searchInput };
