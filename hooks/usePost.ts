import axios from "axios"
import { useCallback, useState } from "react"
import { Product } from "../components/ProductItem"

export default (url: any): any => {
    const [error, setError] = useState<boolean>(true)

    const callAPI = (headers : any, payload : any) => {
        return axios.post<Product, { data: string }>(url, payload, {
            headers: headers
        })
    }

    return [error, callAPI]
}