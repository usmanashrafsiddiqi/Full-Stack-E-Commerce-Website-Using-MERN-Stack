import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'



//funtion for add product

const addProduct = async (req, res) => {

   try {
      const { name, description, price, category, subCategory, sizes, bestseller } = req.body





      /////////getting images from req.files///// saving files in vaiables

      const image1 = req.files.image1 && req.files.image1[0]
      const image2 = req.files.image2 && req.files.image2[0]
      const image3 = req.files.image3 && req.files.image3[0]
      const image4 = req.files.image4 && req.files.image4[0]



/////creating array to store the images ,if only one image we have for a product then only that image should be uploaded  ////////////////////////
      const images = [image1, image2, image3, image4].filter((item) => item !== undefined)
   

      //uploading these images to the cloudnary so that we get the URL to store thta in database


      let imagesUrl = await Promise.all(
         images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path, { resouce_type: "image" });
            return result.secure_url
          
         })
      )
      console.log(imagesUrl)
     

      //saving to Database////
      
      const productData = {
         name,
         description,
         category,
         price: Number(price),
         subCategory,
         bestseller: bestseller === "true" ? true : false,
         sizes: JSON.parse(sizes),
         image: imagesUrl,
         date: Date.now()
      }

      console.log(productData);
      const product = new productModel(productData);
      await product.save()

      res.json({ success: true, message: "Product Added" })

   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }

}


//funtion for list product

const listProducts = async (req, res) => {


   try {
      const products= await productModel.find({});
      res.json({success:true,products})
   } catch (error) {
      console.log(error)
      res.json({ success: false, message: error.message })
   }
}


//funtion for remove  product

const removeProduct = async (req, res) => {

try {
   await productModel.findByIdAndDelete(req.body.id)
   res.json({success:true,message:"product removed"})
   
} catch (error) {
   console.log(error)
   res.json({ success: false, message: error.message })
}


}


//funtion for single product info

const singleProduct = async (req, res) => {

 try {

   const {productId }= req.body
   const product = await productModel.findById(productId)
   res.json({success:true,product})
   
 } catch (error) {
   console.log(error)
   res.json({ success: false, message: error.message })
 }

}


export { listProducts, addProduct, singleProduct, removeProduct }