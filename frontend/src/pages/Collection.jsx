import React, { useContext, useState,useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../component/Title';
import Productitem from '../component/Productitem';

const Collection = () => {

  const{products} = useContext(ShopContext);
  const [showFilter,setshowFilter] =useState(false);
  const [filterProducts,setfilterProducts]= useState([]);
  const[category,setcategory]= useState([]);
  const[subCategory,setsubCategory]= useState([]);

const ToggleCategory = (e)=>{
  if (category.includes(e.target.value)) {
    setcategory(prev=> prev.filter(item=>item !== e.target.value))
  }
  else{
    setcategory(prev=> [...prev,e.target.value])
  }
}


const togglesubcategory =(e)=>{
  
if (subCategory.includes(e.target.value)) {
  setsubCategory(prev=>prev.filter(item=>item !== e.target.value))
}else{
  setsubCategory(prev=> [...prev,e.target.value])
}


}

const applyfilter =()=>{
  let productsCopy = products.slice();



  if (category.length >0) {
    productsCopy = productsCopy.filter(item =>category.includes(item.category))
    
  }

  
  if (subCategory.length >0) {
    productsCopy = productsCopy.filter(item =>subCategory.includes(item.subCategory))
    
  }


  setfilterProducts(productsCopy)
}


  useEffect(() => {
    setfilterProducts(products)
  }, [])


  useEffect(()=>{
    applyfilter()
  },[category,subCategory])
 
  

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
        {/* ----------- Filter options-------- */}
<div className='min-w-60'>
<p onClick={()=>setshowFilter(!showFilter)}  className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
  <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' :'' }`} src={assets.dropdown_icon} alt="" />
</p>


{/* -----------------category Filter----------------- */}

<div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' :'hidden'} sm:block`}>
<p className='mb-3 text-sm font-medium'>CATEGORIES</p>

<div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
  <p className='flex gap-2'>
    <input className='w-3' type="checkbox"  value={'Men'} onChange={ToggleCategory} /> Men 
  </p>
  <p className='flex gap-2'>
    <input className='w-3' type="checkbox"  value={'Women'} onChange={ToggleCategory} /> Women 
  </p>
  <p className='flex gap-2'>
    <input className='w-3' type="checkbox"  value={'Kids'} onChange={ToggleCategory} /> Kids 
  </p>

</div>
</div>


{/* subcategory filter */}

<div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' :'hidden'} sm:block`}>
<p className='mb-3 text-sm font-medium'>TYPE</p>

<div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
  <p className='flex gap-2'>
    <input className='w-3' type="checkbox"  value={'Topwear'} onChange={togglesubcategory} />  Topwear
  </p>
  <p className='flex gap-2'>
    <input className='w-3' type="checkbox"  value={'Bottomwear'} onChange={togglesubcategory}/> Bottomwear 
  </p>
  <p className='flex gap-2'>
    <input className='w-3' type="checkbox"  value={'Winterwear'} onChange={togglesubcategory}/>  Winterwear
  </p>

</div>
</div>

</div>

{/* right side */}

<div className='flex-1'>
   <div className='flex justify-between text-base sm:text-2xl mb-4'>
    <Title text1={'ALL'} text2={'COLLECTIONS'} />

{/* PRODUCT SORT */}
<select className='border-2 birder-gray-300 text-sm px-2'>
  <option value="relavent"> Sort By Relavent</option>
  <option value="low-high">Sort By Low to High</option>
  <option value="high-low"> Sort By High to Low</option>
</select>



   </div>
{/* --------------------Map Products------------- */}

<div className='grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
{
  filterProducts.map((item,index)=>(
    <Productitem  key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
  ))
}
</div>



</div>

    </div>
  )
}

export default Collection
