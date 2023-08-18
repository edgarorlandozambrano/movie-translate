const api = axios.create({
    baseURL : 'https://api.themoviedb.org/3/',
    Headers: {
        'Content-Type' : 'application/json; charset=utf-8',
    },
    params: {
        'api_key': API_KEY
    }
})
//translate
async function translateFunction(){
    const results = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/languages');

    results
    .then(response => response.text())
 
}

translateFunction()

function googleTranslateElementInit(){
    new google.translate.TranslateElement(
        {pageLanguage: 'en'},
        'google_translate_element'
    );
}
googleTranslateElementInit();
//helpers
function createMovie(movies,container) {
    container.innerHTML = '';
    movies.forEach(movie => {
        
        const getTredingDiv = document.createElement('div')
        getTredingDiv.classList.add('movie-container');
        getTredingDiv.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        })

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            'src',
            'https://image.tmdb.org/t/p/w300' + movie.poster_path
        );

        getTredingDiv.appendChild(movieImg);
        container.appendChild(getTredingDiv);
    });

}

function createCategories(categories,container) {
    container.innerHTML = '';
   

    categories.forEach(category => {
       
        const getCategoriesDiv = document.createElement('div')
        getCategoriesDiv.classList.add('category-container')

        const h3 = document.createElement('h3');
        h3.classList.add('category-title');
        h3.setAttribute('id','id' + category.id);
        h3.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        })
        const h3Title = document.createTextNode(category.name);
        
        h3.appendChild(h3Title)
        getCategoriesDiv.appendChild(h3);
        container.appendChild(getCategoriesDiv);

    })

}
 // llamados a la API

async function getTrendingMoviePreview() {
    const {data} = await api('trending/movie/day');
    const movies = data.results;
    console.log('movies',movies);
    createMovie(movies,trendingPreviewMovieList);
};

async function getCategoriesMoviePreview() {
    const {data} = await api('genre/movie/list');
    const categories = data.genres;
    createCategories(categories, categoriesPreviewList);
};

async function getMoviesCategories(id) {
    
        const {data} = await api('discover/movie',{
            params: {
                with_genres : id
            }
        });
        const movies = data.results;
        createMovie( movies,genericListContainer)
    
    };

async function getMoviesBySearch(query) {
    
        const {data} = await api('search/movie',{
            params: {
                query,
            },
        });
        const movies = data.results;
        createMovie( movies,genericListContainer)
    
    };    
async function getTrendingMovies(){
    const {data} = await api('trending/movie/day');
    const movies = data.results;

    createMovie(movies,genericListContainer)
};
async function getMovieById(id){
    const {data: movie} = await api('movie/' + id);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    console.log(movieImgUrl)
    headersSectionId.style.background = `
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 19.27%,
        rgba(0, 0, 0, 0) 29.17%
      ),
      url(${movieImgUrl})
    `;
  
    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;
    
    createCategories(movie.genres, movieDetailCategoriesList );

    getRelatedMoviesId(id);
};

async function getRelatedMoviesId(id) {
    const {data} = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;

    createMovie(relatedMovies, relatedMoviesContainer)
}

