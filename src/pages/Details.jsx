/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import StoreContext from "../Context/StoreContext";

function Details() {
  const [product, setProduct] = useState({});
  const [loadingState, setLoadingState] = useState(true);
  const { cart, setCart } = useContext(StoreContext);
  const history = useHistory();

  const fetchProduct = async () => {
    const productID = history.location.pathname.split("/")[2];
    const fetch_URL = `https://api.mercadolibre.com/items/${productID}`;
    const data = await fetch(fetch_URL);
    const jsonData = await data.json();
    setProduct(jsonData);
    setLoadingState(false);
  };

  const handleAddButton = () => {
    setCart([...cart, product]);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const { id, title, price, thumbnail } = product;

  return (
    <div>
      <Link to="/">Voltar</Link>
      {loadingState ? (
        <Loading />
      ) : (
        <div className="cartItemWrapper">
          <Link to={`/details/${id}`}>
            <p>{title}</p>
          </Link>
          <div className="cartContentWrap">
            <img src={thumbnail} alt="thumbnail" />
            <p>Valor: R$ {price.toFixed(2)}</p>
            <button onClick={handleAddButton}>Adicionar ao carrinho</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
