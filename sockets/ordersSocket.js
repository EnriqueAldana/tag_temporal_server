module.exports = (io) => {
    const namespace = io.of('/orders/visitor');
    namespace.on('connection',(socket) =>{

        console.log('Un usuario se conecto a socket IO: /orders/visitor ');
        socket.on('position', (data) =>{
            console.log('Residente emitió : ' , data);
        
            namespace.emit(`position/${data.id_order}`,{id_order: data.id_order, id_product: data.id_product, starter_date: data.starter_date,lat: data.lat, lng: data.lng});

        });

        socket.on('visited', (data) =>{
            console.log('Visitante emitió : ' , data);
        
            namespace.emit(`visited/${data.id_order}`,{id_order: data.id_order, id_product: data.id_product, starter_date: data.starter_date});

        });
        socket.on('canceled', (data) =>{
            console.log('Residente emitió : ' , data);
        
            namespace.emit(`canceled/${data.id_order}`,{id_order: data.id_order, id_product: data.id_product, starter_date: data.starter_date});

        });
        socket.on('disconnect', (data) =>{
            console.log('Un usuario se desconectó del socket IO.');
        });
        
    });
}