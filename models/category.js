const db = require('../config/config');
const { id_developer } = require('../config/env');

const Category = {};

Category.getAll = (result) => {
    const sql =`
    SELECT 
        CONVERT(id, char) AS id,
        name,
        description
    FROM
        categories
    ORDER BY
        id
    `;  

    db.query(
      sql,
      (err, res) => {
        if (err){
            console.log('Error:', err)
            result(err,null);
        }else{
            console.log('Todas las categorias', res);
            result(null, res);
        }
    } 
    )

}



Category.create = (category, result) =>{
    const sql= `
    INSERT INTO
    categories(
        name,
        description,
        created_at,
        updated_at
      )
      VALUES (?,?,?,?)
    `;
    db.query(
        sql,
        [
            category.name,
            category.description,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err){
                console.log('Error:', err)
                result(err,null);
            }else{
                console.log('Id de la nueva categoria', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}
module.exports = Category;