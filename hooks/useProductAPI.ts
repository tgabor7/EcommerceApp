import { useEffect, useState } from "react"
import axios from "axios"
import { Product } from "../components/ProductItem"

export default () : [Array<Product>, boolean]=>{
    const [data, setData] = useState<Array<Product>>([])
    const [loading, setLoading] = useState<boolean>(false)

    const url = "https://ecommerceappbackend1.herokuapp.com/api/get"

    useEffect(()=>{
        setLoading(true)
        axios.get<Product[]>("https://ecommerceappbackend1.herokuapp.com/api/get").then((d)=>{
            setData(d.data)
            setLoading(false)
        })
    },[])

    return [data, loading]
}