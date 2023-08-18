searchForm.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
});
trendingPreviewBtn.addEventListener('click', () => {
    location.hash = '#trends';
});
arrowBtn.addEventListener('click', () => {
   history.back();
   //location.hash = '#home=';
    
})

window.addEventListener('DOMContentLoaded',navigator,false);
window.addEventListener('hashchange',navigator,false);

function navigator() {
    console.log({location})
    if(location.hash.startsWith('#trends')){
        trendPage()
    }else if(location.hash.startsWith('#search=')){
        searchPage()
    }else if(location.hash.startsWith('#category=')){
       categoriesPage()
    }else if(location.hash.startsWith('#movie=')){
        moviePage()
    }else {
        
        homePage();
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0
}
// last section translate , show translate only in the homepage function anothers one is hidden
function homePage(){
    console.log('home');
    translate.classList.remove('inactive')
    headersSectionId.classList.remove('header-container--long');
    headersSectionId.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerTitleCategoriView.classList.add('inactive');
    searchForm.classList.remove('inactive');

    sectionTrendingPreview.classList.remove('inactive');
    sectionCategoriesPreview.classList.remove('inactive');
    sectionGenericListPreview.classList.add('inactive');
    sectionMovieDetailPreview.classList.add('inactive');
    

    getTrendingMoviePreview();
    getCategoriesMoviePreview() ;
}
function moviePage(){
    console.log('movie')
    translate.classList.add('inactive')
    headersSectionId.classList.add('header-container--long');
    //headersSectionId.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerTitleCategoriView.classList.add('inactive');
    searchForm.classList.add('inactive');

    sectionTrendingPreview.classList.add('inactive');
    sectionCategoriesPreview.classList.add('inactive');
    sectionGenericListPreview.classList.add('inactive');
    sectionMovieDetailPreview.classList.remove('inactive');

    const [_,movieId] = location.hash.split('=');
    getMovieById(movieId);
}

function categoriesPage(){
    console.log('category')
    translate.classList.add('inactive')
    headersSectionId.classList.remove('header-container--long');
    headersSectionId.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerTitleCategoriView.classList.remove('inactive');
    searchForm.classList.add('inactive');

    sectionTrendingPreview.classList.add('inactive');
    sectionCategoriesPreview.classList.add('inactive');
    sectionGenericListPreview.classList.remove('inactive');
    sectionMovieDetailPreview.classList.add('inactive');

    const [_, categoriesId] = location.hash.split('=') ;
    const [categoryId,categoryName] = categoriesId.split('-')
  
    headerTitleCategoriView.innerHTML = categoryName;

    getMoviesCategories(categoryId)

}
function searchPage(){
    console.log('search')
    translate.classList.add('inactive')
    headersSectionId.classList.remove('header-container--long');
    headersSectionId.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerTitleCategoriView.classList.add('inactive');
    searchForm.classList.remove('inactive');

    sectionTrendingPreview.classList.add('inactive');
    sectionCategoriesPreview.classList.add('inactive');
    sectionGenericListPreview.classList.remove('inactive');
    sectionMovieDetailPreview.classList.add('inactive');

    const [_, query] = location.hash.split('=') ;
    getMoviesBySearch(query);
    

}
function trendPage(){
    console.log('trend')
    translate.classList.add('inactive')
    headersSectionId.classList.remove('header-container--long');
    headersSectionId.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerTitleCategoriView.classList.remove('inactive');
    searchForm.classList.add('inactive');

    sectionTrendingPreview.classList.add('inactive');
    sectionCategoriesPreview.classList.add('inactive');
    sectionGenericListPreview.classList.remove('inactive');
    sectionMovieDetailPreview.classList.add('inactive');

    headerTitleCategoriView.innerHTML = 'Tendencias';

    getTrendingMovies();
}