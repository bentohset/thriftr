import { View, Text ,Button, SafeAreaView, TouchableOpacity, Image, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useEffect , useRef, useState } from 'react'
import { auth, firebase, db } from '../firebase';
import useAuth from "../hooks/useAuth";
import { signOut, getAuth } from 'firebase/auth';
import { Icon } from '@rneui/themed';
import Swiper from 'react-native-deck-swiper';
import { doc, collection, onSnapshot, updateDoc, setDoc, addDoc } from "firebase/firestore";

const DUMMY_DATA = [
    {
        clothingName:"Shirt with stripes",
        size: "XL",
        price: 5,
        condition:"unused",
        photoURL:"https://github.com/twbs.png",
        id: 1,
    },
    {
        clothingName:"Buttoned Shirt",
        size: "S",
        price: 12,
        condition:"used",
        photoURL:"https://github.com/npm.png?size=200",
        id: 2,
    },
    {
        clothingName:"Shirt Oversized-fit",
        size: "L",
        price: 10,
        condition:"Worn",
        photoURL:"https://github.com/github.png?size=40",
        id:3,
    }
];

const HomeScreen = () => {
    const navigation = useNavigation();
    const {user, logout} = useAuth();
    const swipeRef = useRef(null);
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        let unsub;

        const fetchCards = async () => {
            unsub = onSnapshot(collection(db,"clothes"),snapshot=>{
                setProfiles(
                    snapshot.docs.map(doc => ({
                        id:doc.id,
                        ...doc.data(),
                    }))
                    )
            })
        }

        fetchCards();
        return unsub;
    },[])

    return (
        <SafeAreaView className="flex-1">
            {/* Header */}
            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Text className="font-bold text-3xl">
                    Discover
                </Text>
            </View>

            {/* Cards */}
            <View className="items-center">
                <Swiper
                    ref={swipeRef}
                    cards={profiles}
                    stackSize={5}
                    cardIndex={0}
                    animateCardOpacity
                    disableBottomSwipe
                    containerStyle={{backgroundColor:"transparent"}}
                    onSwipedLeft={()=>{
                        console.log('Swipe PASS')
                    }}
                    onSwipedRight={()=>{
                        console.log('Swipe LIKE')
                    }}
                    onSwipedTop={()=>{
                        console.log('Swipe CART')
                    }}
                    overlayLabels={{
                        left:{
                            title: "NOPE",
                            style:{
                                label:{
                                    textAlign:"right",
                                    color:"red",
                                }
                            }
                        },
                        right:{
                            title:"LIKE",
                            style:{
                                label:{
                                    color:"#4DEd30"
                                }
                            }
                        },
                        top:{
                            title:"CART",
                            style:{
                                label:{
                                    color:"yellow",
                                    alignSelf: 'flex-end',
                                }
                            }
                        }
                    }}
                    renderCard={(card)=> card ? (
                        <View key={card.id} className="relative bg-white rounded-xl" style={styles.card}>
                            <Image className="absolute top-0 aspect-square w-full rounded-t-xl" source={{uri: card.photoURL}}/>
                            
                            <View
                                style={styles.cardShadow}
                                className="flex-1 absolute flex-row bottom-0 bg-white w-full 
                                    justify-between items-start px-6 py-4 rounded-b-xl"
                            >
                                <View className="justify-center">
                                    <Text className="text-xl font-bold">{card.clothing}</Text>
                                    <Text className="text-zinc-400 text-lg">Size: {card.size}</Text>
                                    <Text className="text-zinc-400 text-lg">Condition: {card.condition}</Text>
                                    <Text className="text-zinc-400 mb-5 text-lg">Tags to put dogtags with labels</Text>
                                </View>
                                <Text className="text-2xl font-bold">${card.price}</Text>
                            </View>
                            
                        </View>
                    ) : (
                        <View className="relative bg-white h-3/4 rounded-xl justify-center items-center" style={styles.card}>
                            <Text className="font-fold pb-5">No more listings</Text>
                            
                        </View>
                    )}
                />
            </View>

            <View className="flex-1 flex-row justify-evenly w-full absolute bottom-5">
                <TouchableOpacity 
                    onPress={()=> swipeRef.current.swipeLeft()}
                    className="items-center justify-center rounded-full w-16 h-16 bg-red-200"
                >
                    <Icon name="cross" type="entypo" color="red"/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> swipeRef.current.swipeTop()}
                    className="items-center justify-center rounded-full w-16 h-16 bg-yellow-200"
                >
                    <Icon name="shopping-bag" type="feather" color="brown"/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> swipeRef.current.swipeRight()}
                    className="items-center justify-center rounded-full w-16 h-16 bg-green-200"
                >
                    <Icon name="heart" type="antdesign" color="green"/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


export default HomeScreen

// can only create shadow with styles (tailwind dont have)
const styles = StyleSheet.create({
    card:{
        height: "65%",
    },
    cardShadow:{
        shadowColor: "#000",
        shadowOffset:{
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    }
})