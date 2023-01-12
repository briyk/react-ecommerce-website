import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filteredProducts: [],
  allProducts: [],
  gridView: true,
  sort: "price-lowest",
  filters: {
    text: "",
    category: "all",
    company: "all",
    color: "all",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  //i can't pass hook to reducer functions becuase hooks need to passed to component or other hook
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  //handle view
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  //load products once component did mount
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  //sort handling
  const updateSort = (e) => {
    // const name = e.target.name ;
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  //sort products once page loaded
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  //handler filter
  const updateFilter = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    //this for category because its button and i cant update state from value because button
    if(name === 'category'){
      value = e.target.textContent 
    }
    if(name === 'color'){
      value = e.target.dataset.color ;
    }
    if(name=== 'price'){
      value= Number(value)
    }
    if(name=== 'shipping'){
      value= e.target.checked
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  const clearFilter = () => {
    dispatch({type: CLEAR_FILTERS})
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilter,
        clearFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
