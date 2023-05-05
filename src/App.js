import './App.css';
import Recipe from './Recipe';
import React, { useEffect, useState } from "react";

const App = () => {

  const APP_ID = 'c18a187a';
  const APP_KEY = 'd03536db3b83fbb05ff8a9e9bc87456f';
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    // console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    // console.log(search);
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch(e.target.value);
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
         title={recipe.recipe.label}
         calories={recipe.recipe.calories}
         image={recipe.recipe.image}
         ingredients={recipe.recipe.ingredients}
        />
      ))};
      </div>
    </div>
  );
}

export default App;
