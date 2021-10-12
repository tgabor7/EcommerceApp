import { useEffect, useState } from "react"
import axios from "axios"
import { Product } from "../components/ProductItem"

export default () : [Array<Product>, boolean, ()=>void]=>{
    const [data, setData] = useState<Array<Product>>([])
    const [loading, setLoading] = useState<boolean>(false)

    const url = "https://ecommerceappbackend1.herokuapp.com/api/get"

    const reload = ()=>{
        setLoading(true)
        axios.get<Product[]>(url).then((d)=>{
            setData(d.data)
            setLoading(false)
        })
    }

    useEffect(()=>{
        setLoading(true)
        axios.get<Product[]>(url).then((d)=>{
            setData(d.data)
            setLoading(false)
        })
    },[])

    return [data, loading, reload]
}