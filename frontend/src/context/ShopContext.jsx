import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";


export const ShopContext = createContext();



const ShopContextProvider = (props) => {
   const  currency ='$';

    const delivery_fee =10;

    const [search,setSearch] = useState('');
    const[ showSearch,setshowSearch] = useState(false);
    const [ cartItems ,setcartItems] = useState({});

    const addtoCart= async(itemId,size)=>{
        let cardData = JSON.parse(JSON.stringify(cartItems));


        if (cardData[itemId]) {
            if (cardData[itemId][size]) {
cardData[itemId][size] += 1;
                

            }
            else{
                cardData[itemId][size]=1;
            }
        }
        else{
            cardData[itemId]={};
            cardData[itemId][size]= 1;
        }
setcartItems(cardData);
    }

    useEffect(()=>{
 console.log(cartItems)
    },[cartItems])


    const value = {
        products, currency,delivery_fee,
        search,setSearch,setshowSearch,showSearch,
        cartItems,addtoCart
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}



export default ShopContextProvider;