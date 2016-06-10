const douban_base_url='https://api.douban.com/v2';
const wilddog_base_url='https://cfa.wilddogio.com'
const d = new Date();
const current_month= d.getFullYear()+ ((d.getMonth()+1)>10?(d.getMonth()+1).toString():'0'+(d.getMonth()+1).toString());
const services={
  book_search:`${douban_base_url}/book/search`,
  book_search_id:`${douban_base_url}/book/search`,
  music_search:`${douban_base_url}/music/search`,
  music_search_id:`${douban_base_url}/music/search`,
  movie_search:`${douban_base_url}/movie/search`,
  movie_search:`${douban_base_url}/movie/search`,
  wilddog_cfa_playinfo:`${wilddog_base_url}/playinfo`,
  wilddog_cfa_current_month_playinfo:`${wilddog_base_url}/playinfo/${current_month}.json`
}

export default services;
