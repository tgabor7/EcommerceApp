import React, { useContext, useState } from "react";
import { Product } from "./ProductItem";


export interface ProductRecord {
    product: Product
    amount: number
}

export interface ProductValue {
    current?: ProductRecord
    setProduct?: (p : ProductRecord) => void

    searchTerm?: string
    setSearchTerm?: (s : string )=> void
}

const ProductContext = React.createContext<ProductValue>({})

interface Props{
    children: any
}

export function useProduct(){
    return useContext(ProductContext)
}

export default (props : Props)=>{
    const [currentProduct, setCurrentProduct] = useState<ProductRecord>()
    const [searchTerm, setSearchTerm] = useState<string>()

    return (<>
        <ProductContext.Provider value={{current: currentProduct, setProduct: setCurrentProduct, searchTerm: searchTerm, setSearchTerm: setSearchTerm}}>
            {props.children}
        </ProductContext.Provider>
    </>)
}