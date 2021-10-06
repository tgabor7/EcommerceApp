import { useRef, useState } from "react"
import { Animated } from "react-native"

export default function usePage() : [number, any, any] {

    const [page, setPage] = useState(0)
    const anim = useRef(new Animated.Value(0)).current

    const transition = ()=>{
        Animated.timing(anim, {
            toValue: 1000,
            duration: 1000,
            useNativeDriver: false 
        }).start()
    }

    return [page, (n:any)=>{
        setPage(n)
    }, transition]
}