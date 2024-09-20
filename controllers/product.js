
import product from "../models/product-model.js";

// Add New Product (Admin only)
export const addProduct = async (req , res ) => {
    try{
        const { title , description , quantity , price , category , image , user} = req.body;
        
        
        const productData = product({title , description , quantity , price , category , image , user });

        await productData.save();
        return res.status(200).json({ message: "data saved succesfully", success: true , productData});



    }
    catch(error){
        res.status(500).json(error.message);
    }
}


export const getproduct = async (req, res) => {
    try {
        const getProducts = await product.find()
        return res.status(200).json({ success : true , getProducts});   
    }
    catch(error){
        return res.status(500).json(error.message);
    }
}

export const getProductById = async (req , res) => {
    try{
        const getProductId = req.params.id;
        const productData = await product.findById(getProductId);
        if (!productData) {
            return res.status(404).json({ message: "product not found" });

        }
        return res.status(200).json({ success: true, productData , message :"got product data"});   
    }
    catch(error){
            res.status(500).json(error.message);
    }
}


export const deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      
      const deletedproduct = await product.findByIdAndDelete(productId);
  
      if (!deletedproduct) {
        return res.status(404).json({ message: 'product not found' });
      }
  
      res.status(200).json({ message: 'product deleted successfully', deletedproduct });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product', error });
    }
  };


  export const getProductByUserId = async (req , res) => {
    try{
        const productData = await product.find().populate("user");
        return  res.status(200).json({ success: true, productData , message :"got product data"});
    }
    catch(error){
        res.status(500).json(error.message);
    }
  };



  // Update Stock (Admin only)
export const updateStock = async (req, res) => {
  try {
      const { stockQuantity } = req.body;
      const updatedProduct = await product.findByIdAndUpdate(req.params.id, { stockQuantity }, { new: true });
      res.json(updatedProduct);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};