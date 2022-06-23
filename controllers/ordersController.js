const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');

module.exports = {
    findByStatus(req,res){
        const status= req.params.status;
        Order.findByStatus(status,(err,data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: ' Hubo un error al listar las ordenes.',
                    error: err
                });
            }
            for(const d of data){
                d.address= JSON.parse(d.address);
                d.resident= JSON.parse(d.resident);
                d.visitor= JSON.parse(d.visitor);
                d.products= JSON.parse(d.products);
            }
            
            return res.status(201).json(data);

        });
    },
    findByVisitorAndStatus(req,res){
        const id_visitor = req.params.id_visitor;
        const status= req.params.status;

        Order.findByVisitorAndStatus(id_visitor,status,(err,data) => {
            if(err){
                return res.status(501).json({
                    success: false,
                    message: ' Hubo un error al listar las ordenes.',
                    error: err
                });
            }
            for(const d of data){
                d.address= JSON.parse(d.address);
                d.visitor= JSON.parse(d.visitor);
                d.resident= JSON.parse(d.resident);
                d.products= JSON.parse(d.products);
            }
            
            return res.status(201).json(data);

        });
    },
    create(req, res) {

        const order = req.body;

        Order.create(order,async  (err,id)=>{
            if(err){
                    return res.status(501).json({
                        success: false,
                        message: ' Hubo un error con el registro de la orden.',
                        error: err
                    });
            }
            // To Do 
            // Validar que si viene productos nullos no truene
            for(const product of order.products){
                await OrderHasProducts.create(id,product.id,product.quantity,product.started_date,product.ended_date,(err,id_data)=>{
                    if(err){
                        return res.status(501).json({
                            success: false,
                            message: ' Hubo un error con la creación de los productos en la orden.',
                            error: err
                        });
                }
                });
            }
            return res.status(201).json({
                success: true,
                message: 'La orden se creo exitosamente',
                data: `${id}`  // id de la orden en caracter
            });

        });
    },
    getAll(req,res) {
        Category.getAll((err,data) =>{
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
    updateStatus(req,res){
        const order = req.body;
        Order.updateStatus(order.id,order.status,(err,id_order)=>{
            if(err){
                return res.status(501).json({
                    success: false,
                    message: ' Hubo un error al actualizar el estatus de la orden.',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'La orden se actualizó exitosamente',
                data: `${id_order}`  // id de la orden en caracter
            });
        });
        
        
    }
}