import { $searchInput, searchData } from './search.js';

const $recentList = document.querySelector('#recentList');
let keywordArr = JSON.parse(localStorage.getItem('recentkeyword')) || [];

const saveRecentKeyword = () => {
    const newKeyword = $searchInput.value;
    const MAXIMUM_SIZE = 5;

    let repeatedIndex = keywordArr.indexOf(newKeyword);
    if (repeatedIndex !== -1) {
        keywordArr.splice(repeatedIndex, 1);
    }

    if (keywordArr.length >= MAXIMUM_SIZE) {
        keywordArr.pop();
    }
    keywordArr.unshift(newKeyword);
    localStorage.setItem('recentkeyword', JSON.stringify(keywordArr));

    loadRecentKeyword();
};

const delRecentKeyword = (e) => {
    let targetKeyword = e.target.dataset.keyword;
    keywordArr = keywordArr.filter((keyword) => keyword !== targetKeyword);
    localStorage.setItem('recentkeyword', JSON.stringify(keywordArr));

    loadRecentKeyword();
};

const loadRecentKeyword = () => {
    $recentList.textContent = '';
    for (const keyword of keywordArr) {
        let temp_html = `<li><a href="#" class="keyword_anchor" data-keyword="${keyword}">${keyword}</a><button type="button" class="del_btn" data-keyword="${keyword}" title="삭제">X</button></li>`;
        $recentList.insertAdjacentHTML('beforeend', temp_html);
    }

    let $delKeywardBtns = document.querySelectorAll('.del_btn');
    $delKeywardBtns.forEach((btn) => {
        btn.addEventListener('click', delRecentKeyword);
    });

    let $searchKeywordAnchors = document.querySelectorAll('.keyword_anchor');
    $searchKeywordAnchors.forEach((Anchor) => {
        Anchor.addEventListener('click', searchData);
    });
};

loadRecentKeyword();

export { loadRecentKeyword, saveRecentKeyword, delRecentKeyword, $searchInput, $recentList, keywordArr };
