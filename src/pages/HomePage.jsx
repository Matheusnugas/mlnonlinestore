import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import StoreContext from "../Context/StoreContext";
import "./HomePage.css";

function HomePage() {
  const { categories } = useContext(StoreContext);
  const [query, setQuery] = useState("");
  const [searchedItems, setSearchResults] = useState([]);

  const fetchByQuery = async (inputValue) => {
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=$${inputValue}`;
    const data = await fetch(URL);
    const jsonData = await data.json();
    setSearchResults(jsonData.results);
  };

  const fetchByCatId = async (id) => {
    const URL = `https://api.mercadolibre.com/sites/MLB/search?category=${id}`;
    const data = await fetch(URL);
    const jsonData = await data.json();
    setSearchResults(jsonData.results);
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleClick = (inputValue) => {
    fetchByQuery(inputValue);
  };

  const handleRadioClick = ({ target }) => {
    fetchByCatId(target.value);
  };

  return (
    <div className="homeWrapper">
      <header>
        <div className="formContainer">
          <p>Digite sua pesquisa ou escolha uma categoria</p>
          <div className="searchbar">
            <input type="text" value={query} onChange={handleSearchChange} />
            <button onClick={() => handleClick(query)}>Pesquisar</button>
          </div>
          <Link to="/cart">
            <button className="shoppingCartBtn">Shopping Cart</button>
          </Link>
        </div>
        <div>
          <ul>
            <p className="categoryTitle">Categorias: </p>
            {categories.map((category, index) => {
              return (
                <li key={index}>
                  <label>
                    {category.name}
                    <input
                      type="radio"
                      value={category.id}
                      name="category"
                      onClick={handleRadioClick}
                    />
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </header>
      <div className="cardSection">
        {searchedItems
          ? searchedItems.map((result, index, item) => (
              <ProductCard
                key={index}
                price={result.price}
                name={result.title}
                image={result.thumbnail}
                element={result}
                productID={result.id}
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default HomePage;
