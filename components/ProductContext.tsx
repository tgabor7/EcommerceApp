import React, { useContext, useState } from "react";
import { Product } from "./ProductItem";


export interface ProductValue {
    current?: Product
    setProduct?: (p : Product) => void
    show?: boolean
    setShow?: (b: boolean) => void
}

const ProductContext = React.createContext<ProductValue>({})

interface Props{
    children: any
}

export function useProduct(){
    return useContext(ProductContext)
}

export default (props : Props)=>{
    const [currentProduct, setCurrentProduct] = useState<Product>()
    const [showModal, setShowModal] = useState<boolean>()

    return (<>
        <ProductContext.Provider value={{current: currentProduct, setProduct: setCurrentProduct, show: showModal, setShow: setShowModal}}>
            {props.children}
        </ProductContext.Provider>
    </>)
}