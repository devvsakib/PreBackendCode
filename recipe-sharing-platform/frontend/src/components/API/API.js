import axios from 'axios';

const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php';

export const searchRecipes = async (query) => {
  const response = await axios.get(API_URL+'?s='+query);
  return response.data;
};
