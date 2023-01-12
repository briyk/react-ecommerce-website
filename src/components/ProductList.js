import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'
import NoProducts from './NoProducts'
import {useProductsContext} from '../context/products_context'
import Loading from './Loading'

const ProductList = () => {
  const {productLoading}  = useProductsContext() ;
    const {filteredProducts:products, gridView} = useFilterContext() ;
    // console.log(products)

    if(productLoading){
        return <Loading/>
    } 
  if(!productLoading){
    if(products.length < 1){
      return <NoProducts/>
    }  
  }
  if(gridView === false){
    return <ListView products={products}/>
  }
  return <GridView products={products}>product list</GridView>
}

export default ProductList
