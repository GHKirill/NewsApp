import axios, { isCancel, AxiosError } from 'axios';
const KEY = 'l8KIk4PAFV2Lgtto4JKKNaM7Q53Z5QMa';
const div = document.querySelector('.news')
fetchPopularNews()
// Фетч популярних
export async function fetchPopularNews() {
  const response = await axios.get(
    `https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=${KEY}`
  );

  const popularNews = await response.data.results;
  const markup = popularNews
    .map((article) => {
        const meta = 'media-metadata'
      return `<h2>${article.title}</h2>
        <p>${article.abstract}</p>
        <img src="${
          article.media[0][meta][0].url ? article.media[0][meta][0].url : 'qwe'
        }"/>
        <a href="${article.url}">read more</a>`;
    })
    .join('');
  div.insertAdjacentHTML('beforeend', markup);
}
//Фетч по категориям
export async function fetchNewsByCategory(category) {
  const response = await axios.get(
    `https://api.nytimes.com/svc/news/v3/content/nyt/${category}.json?api-key=${KEY}`
  );

  const newsByCategory = await response.data.results;
  const markup = newsByCategory
    .map((article) => {
      
      return `<h2>${article.title}</h2>`;
    })
    .join('');
  div.insertAdjacentHTML('beforeend', markup);
}

//Фетч по поисковому запросу 
export async function fetchNewsBySearch(search) {
  const response = await axios.get(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&api-key=${KEY}`
  );

  const newsBySearch = await response.data.response.docs;
  console.log(newsBySearch)
  const markup = newsBySearch
    .map((article) => {
      
      return `<h2>${article.abstract}</h2>`;
    })
    .join('');
  div.insertAdjacentHTML('beforeend', markup);
}
//ghjd