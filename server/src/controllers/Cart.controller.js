import Cart from "../models/Cart.model.js";

/* obtener el carrito */

export const getCarts = async (req,res) =>{
    try {
        const carts = await Cart.find({userId: req.params.userId});
        if(carts.length === 0){
            return res.status(404).json({state:'error', message:"No hay carrito asociado al usuario", data: []})
        }
        return res.status(200).json({state: 'ok', data: carts})
    } catch (error) {
        console.log("Ocurrió un problema: " + error)
        return res.status(500).json(error)
    }
}


/* agregar al carrito */

export const addCart = async (req,res) =>{
    const {items, userId} = req.body;
    if(!items){
        return res.status(404).json({state:'error', message:"Complete todos los campos"})  
    }
    try {
        const newCart = new Cart({
            userId: userId,
            items:items.map((item)=>({
                productId:item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                img:item.img,
            })),
            totalPrice: items.reduce((sum, item)=> sum + (item.price * item.quantity), 0),
        })
        await newCart.save()
        return res.status(200).json({state: 'ok', data: newCart})
    } catch (error) {
        console.log("Ocurrió un problema: " + error)
        return res.status(500).json(error)
    }
}