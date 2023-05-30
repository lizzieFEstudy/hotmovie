const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZjFhODNmODg5NjI3YjBjNzRmYjY1ZGM2ZjBiNmU2YSIsInN1YiI6IjY0NzU2NGY2ZGQyNTg5MDEyMDA1OWQ3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qYbO2zm8YucQo4jLrsGEtheiaYzCIhcxhyD8M9kAqhI',
    },
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=ko&page=1', options)
    .then((response) => response.json())
    .then((response) => loadData(response))
    .catch((err) => console.error(err));

let rows;
const $movieList = document.querySelector('#movieList');
const $searchInput = document.querySelector('#searchInput');
// const $searchBtn = document.querySelector('#searchBtn');

function loadData(response) {
    // const rows = response['results'];
    rows = response['results'];
    console.log(response);
    let i = 0;

    for (const row of rows) {
        // console.log(row);
        // console.log(row['id']);
        // console.log(row['title']);

        let id = row['id'];
        let title = row['title'];
        let overview = row['overview'];
        let poster_path = row['poster_path'];
        let poster_img = 'https://image.tmdb.org/t/p/w500/' + poster_path;
        let vote_average = row['vote_average'];

        let temp_html = `<li>
            <a href="#this" class="figure" onclick="alert('${id}')">
                <div class="thumb">
                    <span class="num">${++i}</span>
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
        // $movieList.append(temp_html);
        $movieList.insertAdjacentHTML('beforeend', temp_html);
    }
}

function searchData() {
    const val = $searchInput.value;
    // alert(val);
    //test4 Schindler's List

    let entries = Object.entries(rows);
    // console.log(rows);
    // console.log(entries);

    let filteredEntry = entries.filter(function (entry) {
        return entry[1]['title'] == val;
    });
    filteredIndex = filteredEntry[0][0];
    // console.log('필터', filteredEntry);
    // console.log('필터인덱스', filteredEntry[0][0]);
    console.log('필터인덱스', filteredEntry[0][1]);

    for (const entry of filteredEntry) {
        let id = entry[1]['id'];
        let title = entry[1]['title'];
        let overview = entry[1]['overview'];
        let poster_path = entry[1]['poster_path'];
        let poster_img = 'https://image.tmdb.org/t/p/w500/' + poster_path;
        let vote_average = entry[1]['vote_average'];

        let temp_html = `<li>
        <a href="#this" class="figure" onclick="alert('${id}')">
            <div class="thumb">
                <span class="num"></span>
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
        // $movieList.removeChild('li');
        $movieList.textContent = '';
        $movieList.insertAdjacentHTML('beforeend', temp_html);
    }
}
