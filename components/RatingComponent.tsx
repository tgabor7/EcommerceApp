import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

interface Props {
    style: any
    rating: number
    key: any
}

export default class RatingComponent extends React.PureComponent<Props, {stars: Array<any>}> {
    constructor(props: Props){
        super(props)
        this.state = {
            stars: []
        }
    }
    componentDidMount(){
        let tmp = []
        for(let i = 0;i<5;i++){
            tmp.push(<FontAwesomeIcon style={(i < Math.floor(this.props.rating)) ? styles.star : styles.emptyStar} icon={faStar} size={24}></FontAwesomeIcon>)
        }
        this.setState({stars: tmp})
    }

    render(){
        return (<><View style={this.props.style}>
            <View style={styles.container}>
                <Text style={styles.number}>{this.props.rating}</Text>
                {this.state.stars}
            </View>
        </View></>)
    }
}



const styles = StyleSheet.create({
    container:{
        flexDirection: 'row'
    },
    star:{
        color: '#222',
        padding: 5
    },
    emptyStar:{
        color: '#ddd',
        padding: 5
    },
    number: {
        fontSize: 24,
        marginRight: 20,
        marginTop: 'auto',
        marginBottom: 'auto'
    }
})