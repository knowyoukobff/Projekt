import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  Button,
} from 'react-native';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: null,
        }

    }

    async componentDidMount () {
        await fetch('https://danepubliczne.imgw.pl/api/data/synop')
        .then((response) => response.json()).then((responseJson) => {
        this.setState({
            isLoading: false,
            dataSource: responseJson,
            })
        })
        .catch((error) => {
            console.log(error)
        });

    }

    render() {


    if(this.state.isLoading) {
        return(
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        )

    } else {

        let city = this.state.dataSource.map((val, key) => {
                 return <Text style={styles.item}>{val.stacja} {"\n\n"} {val.temperatura} &deg;C Suma opadów: {val.suma_opadu}{"\n"} Ciśnienie: {val.cisnienie} hPA {"\n"} Godzina pomiaru: {val.godzina_pomiaru}:00 </Text>
        });

       return (
       <View>
       <Text style={styles.header}>POGODYNKA</Text>
        <ScrollView>
            {city}
       </ScrollView>
       </View>

       );
        };
       }
    }


const styles = StyleSheet.create({

    item: {
        flex: 1,
        alignSelf: 'stretch',
        margin: 10,
        backgroundColor: '#FFFADF',
        borderBottomColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
        color: 'black',
        padding: 20,
    },
    header: {
      fontFamily: "Fantasy",
      fontWeight: 'bold',
      fontSize: 40,
      textAlign: 'center',
      padding: 20,
      backgroundColor: '#f4511e',
      color: 'black',
    }
});
