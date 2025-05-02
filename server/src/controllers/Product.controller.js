import Product from "../models/Product.model.js"

/* obtener todos los productos */
export const getProducts = async(req,res) =>{
    try {
        const products = await Product.find()
        if(products.length === 0){
            return res.status(200).json({state: 'not found', data: products})
        }
        return res.status(200).json({state: 'ok', data: products})
    } catch (error) {
        console.log("Ocurrió un problema: " + error)
        return res.status(500).json(error)
    }
}


/* agregar producto */

export const addProduct = async(req,res) =>{
    try {
        const newProduct  = new Product(req.body)
        if(!newProduct){
            return res.status(404).json({state: "error", message:"Campos incompletos"});
        }
        await newProduct.save();
        return res.status(201).json({state: "ok", data: newProduct})
    } catch (error) {
        console.log("Ocurrió un problema: " + error)
        return res.status(500).json(error)
    }
}


/* eliminar producto */

export const deleteProduct = async(req,res) =>{
    try {
       const deleteP = await Product.findByIdAndDelete(req.params.productId)
       if(!deleteP){
        return res.status(404).json({state: "err", message: "El producto no se encuentra en la DB"})
       }
        return res.status(201).json({state: "ok", message: "Producto eliminado"})
    } catch (error) {
        console.log("Ocurrió un problema: " + error)
        return res.status(500).json(error)
    }
}