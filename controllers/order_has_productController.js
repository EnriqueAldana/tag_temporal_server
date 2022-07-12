
const OrderHasProducts = require('../models/order_has_products');

module.exports = {
    updateStatus(req,res){
        const orderProduct = req.body;
        
        orderProduct.address= JSON.parse(orderProduct.address);
        orderProduct.resident= JSON.parse(orderProduct.resident);
        orderProduct.visitor= JSON.parse(orderProduct.visitor);
        orderProduct.product= JSON.parse(orderProduct.product);
    
        OrderHasProducts.updateStatus(orderProduct.id_order,orderProduct.product.id,orderProduct.product.started_date,orderProduct.status_product,(err,id_order)=>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: ' Hubo un error al actualizar el estatus del order product.',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'El tagTemporal se actualizó exitosamente',
                data: orderProduct.id_order  // id de la orden en caracter
            });
        });
        
        
    },
    updateLatLng(req,res){
        const orderProduct = req.body;
        orderProduct.address= JSON.parse(orderProduct.address);
        orderProduct.resident= JSON.parse(orderProduct.resident);
        orderProduct.visitor= JSON.parse(orderProduct.visitor);
        orderProduct.product= JSON.parse(orderProduct.product);
       
     
        OrderHasProducts.updateGPSLatLng(orderProduct.id_order,orderProduct.product.id,orderProduct.product.started_date,orderProduct.lat,orderProduct.lng,(err,id_order)=> {
      
            if(err){
                return res.status(501).json({
                    success: false,
                    message: ' Hubo un error al actualizar sus coordenadas en  order product.',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'El tagTemporal actualizó sus coordenadas exitosamente',
                data: orderProduct.id_order  // id de la orden en caracter
            });
        });
        
        
    },
    getOrderHasproduct(req,res){
        const idOrder = req.params.idOrder;
        const idProduct = req.params.idProduct;
        const startDate= req.params.startDate;
       
        OrderHasProducts.getOrderProduct(idOrder,idProduct,startDate,(err,data)=> {
      
            if(err){
                return res.status(501).json({
                    success: false,
                    message: ' Hubo un error al listar las categorías.',
                    error: err
                });
            }
            return res.status(201).json(data );
        });
        
        
    },

}