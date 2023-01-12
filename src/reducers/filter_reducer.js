import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    //filters load max price by loop for products and get price 
    let maxPrice = action.payload.map(p => p.price);
    //use seperator to seperate array items and get highest
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      allProducts: [...action.payload],
      //we use ... to copy value because we will use it at filtered too
      filteredProducts: [...action.payload],
      //load max to change state
      filters: { ...state.filters, maxPrice: maxPrice, price: maxPrice },
    }
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      gridView: true
    }
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      gridView: false
    }
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload
    }
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filteredProducts } = state;
    let tempProducts = [...filteredProducts];

    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.price - b.price
      })
    }
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.price - a.price
      })
    }
    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
    }
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name)
      })
    }

    return {
      ...state,
      filteredProducts: tempProducts
    }
  }


  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return {
      ...state,
      filters: { ...state.filters, [name]: value }
    }
  }

  if (action.type === FILTER_PRODUCTS) {
      //get all products
      const {allProducts} = state 
      const {text,category,company,color,shipping,price} = state.filters

      let tempProducts = [...allProducts]

      //================filtering products

      //filter search
    if(text){
      tempProducts = tempProducts.filter(  item => {
        return item.name.toLowerCase().startsWith(text)
      })
    }
    //filter Category
      if(category !== 'all'){
        tempProducts = tempProducts.filter( item =>{
          return item.category === category
        } )
      }
      //filter company
      if(company !== 'all'){
        tempProducts = tempProducts.filter( item =>{
          return item.company === company
        } )
      }
      //filter Colors
      if(color !== 'all'){
          tempProducts = tempProducts.filter( item =>{
              return item.colors.find( c => c === color )
          } )
      }
      //filter Price
      tempProducts = tempProducts.filter( item => item.price <= price )
      
        //filter Shipping
        if(shipping ){
          tempProducts = tempProducts.filter( item =>{
              return item.shipping  === true
          })
        }

    return {
      ...state , filteredProducts :tempProducts
    }
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        category: "all",
        company: "all",
        color: "all",
        price: state.filters.maxPrice,
        shipping: false,
      }
    }
  }



  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
