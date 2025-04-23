import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext();



const ShopContextProvider = (props) => {
    const currency = '$';

    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [search, setSearch] = useState('');
    const [showSearch, setshowSearch] = useState(false);
    const [cartItems, setcartItems] = useState({});
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const addtoCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        let cardData = JSON.parse(JSON.stringify(cartItems));


        if (cardData[itemId]) {
            if (cardData[itemId][size]) {
                cardData[itemId][size] += 1;


            }
            else {
                cardData[itemId][size] = 1;
            }
        }
        else {
            cardData[itemId] = {};
            cardData[itemId][size] = 1;
        }
        setcartItems(cardData);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cardData = JSON.parse(JSON.stringify(cartItems));

        cardData[itemId][size] = quantity;
        setcartItems(cardData);

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let iteminfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += iteminfo.price * cartItems[items][item]

                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)

            }else{
                toast.error(response.data.message)
            }
        } catch (error) {

            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])


    const value = {
        products, currency, delivery_fee,
        search, setSearch, setshowSearch, showSearch,
        cartItems, addtoCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate, backendUrl
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}



export default ShopContextProvider;