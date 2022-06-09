const Category = require('../models/category');

module.exports = {

    create(req, res) {

        const category = req.body;

        Category.create(category, (err,id)=>{
            if(err){
                    return res.status(501).json({
                        success: false,
                        message: ' Hubo un error con el registro de la categoría.'
                    });
            }
            return res.status(201).json({
                success: true,
                message: 'La categoria se creo exitosamente',
                data: `${id}`  // id de la categoria en caracter
            });

        });
    }
}