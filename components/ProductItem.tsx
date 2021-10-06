import React, { useEffect } from "react"
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import AvailableComponent from "./AvailableComponent"
import RatingComponent from "./RatingComponent"

export interface Product{
    name: String
    price: number
    description?: String
    rating: number
    available: boolean
    key: any
}
interface Props {
    product: Product
    index: any
    handleClick: any
}

const MAX_DESCRIPTION_LENGTH = 200

class ProductItem extends React.PureComponent<Props> {
    
    constructor(props: Props){
        super(props)
    }

    componentDidMount(){
        
    }

    render(){
        return (<>
            <View style={styles.card}>
                <TouchableOpacity onPress={this.props.handleClick}>
                <Text style={styles.name}>{this.props.product.name}</Text>
                
                {/* <RatingComponent style={styles.rating} rating={this.props.product.rating} key={this.props.key}></RatingComponent> */}
                <Text style={styles.description}>{
                    this.props.product.description ? (this.props.product.description.length < MAX_DESCRIPTION_LENGTH ? this.props.product.description : this.props.product.description.slice(0,MAX_DESCRIPTION_LENGTH) + '...') : 'No description available.'
                }</Text>
                <View style={styles.image}>
                    <AvailableComponent available={this.props.product.available} style={styles.available}></AvailableComponent>
                </View>
                </TouchableOpacity>
                <Text style={styles.price}>{this.props.product.price + '$'}</Text>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.addText}>Add to cart</Text>
                </TouchableOpacity>
            </View>
        </>)
    }
}
export default ProductItem


const styles = StyleSheet.create({
    description:{
        fontSize: 16,
        padding: 10
    },
    available:{
        marginTop: '10%',
        marginBottom: 'auto',
        marginRight: 'auto'
    },
    card:{
        width: Platform.OS === 'web' ? 500 : '90%',
        backgroundColor: '#eee',
        margin: '5%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 10
    },
    price:{
        fontSize: 24,
        marginTop: 'auto',
        marginLeft: 'auto',
        padding: 10
    },
    name: {
        fontSize: 32,
        color: '#000',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    rating:{
        marginRight: 'auto',
        marginBottom: 'auto',
        marginLeft: 50
    },
    button: {
        margin: 5,
        backgroundColor: '#303',
        marginLeft: 'auto',
        borderRadius: 5

    },
    addText: {
        color: '#fff',
        padding: 5,
        fontSize: 24,
    },
    image: {
        width: '100%',
        height: 400,
        backgroundColor: '#0f0',
        margin: 'auto'
    }
})