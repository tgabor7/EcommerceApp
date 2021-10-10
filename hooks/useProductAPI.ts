import { useEffect, useState } from "react"
import axios from "axios"
import { Product } from "../components/ProductItem"

export default () : [Array<Product>, boolean]=>{
    const [data, setData] = useState<Array<Product>>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(()=>{
        setLoading(true)
        axios.get<Product[]>("http://192.168.1.7:3000/api/get").then((d)=>{
            setData(d.data)
            setLoading(false)
        })
    },[])

    return [data, loading]
}