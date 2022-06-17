import axios from "axios";
import { useEffect, useState } from "react";
import { base_Url } from "../../Constants/base_Url";
import { GlobalContext } from "../GlobalContext/GlobalContext";

const GlobalState = (props) => {
  const [total, setTotal] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shoppingList, setShoppingList] = useState(undefined);
  const [cart, setCart] = useState([]);

  window.localStorage.setItem("cart", JSON.stringify(cart));

  const headers = {
    headers: { Authorization: localStorage.getItem("token") },
  };
  const getShoppingList = () => {
    axios
      .get("http://localhost:3003/shopping/list", headers)
      .then((res) => {
        setShoppingList(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err.response.data);
        setIsLoaded(true);
      });
  };
  const getTotal = () => {
    axios
      .get(base_Url + "/shopping/total", headers)
      .then((res) => {
        setTotal(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err.response.data);
        setIsLoaded(true);
      });
  };

  useEffect(() => {
    getTotal();
  }, [shoppingList]);

  useEffect(() => {
    getShoppingList();
  }, [total]);

  return (
    <GlobalContext.Provider
      value={{
        total,
        shoppingList,
        isLoaded,
        cart,
        setCart,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
export default GlobalState;