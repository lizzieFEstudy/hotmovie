import { movies, initFetch, loadData } from './load.js';
import { loadRecentKeyword, saveRecentKeyword, delRecentKeyword, $recentList, keywordArr } from './recentKeyword.js';
import { searchData, resetInput, keyboardSearch } from './search.js';
import { initTheme } from './theme.js';

initFetch();
initTheme();
