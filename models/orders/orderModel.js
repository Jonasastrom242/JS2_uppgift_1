const Order = require('./orderSchema');



exports.getOrder = (req, res) => {
    Order.exists({ userId: req.userData.id }, (err, result) => {
        if(err) {
            return res.status(400).json({
                statusCode: 400,
            status: false,
            message: 'Bad request',
            err //skickar med errormeddelande
            })
        }

        if(!Order) {
            return res.status(404).json({
                statusCode: 404,
                status: false,
                message: 'This order does not exist',
            })
        }
        // Order.findOne({ _id: req.params.id }) //om man vill söka efter namn etc
        
        Order.find({ userId: req.userData.id }) 
        .then(data => res.status(200).json(data))
        .catch(err => {
            res.status(500).json({
                statusCode: 500,
                status: false, 
                message: err.message || 'Internal server error'
            })
        })
    })
} 


exports.createOrder = (req, res) => {

    Order.exists({ _id : req.body._id }, (err, result) => { //callbackfunktion, om error skickas fel till err
        
        if(err) {
            return res.status(500).json(err) //skickar tillbaka status 500 och hoppar ur funktionen
        }

        if(result) { //om resultat finns(true) körs return och funktionen hoppas ur
            // Order.findOneAndUpdate({ _id: req.params.id }, {$push: {purchase : req.body}, new : true})
            
            // return
            
        }
        // const NewOrder = new Order({
        //     NewOrder = 

        // }) //använd om vi vill manipulera objektet innan det ska sparas på db
        
        // NewOrder.save()
        
        Order.create({ //sparar  produkten på databasen direkt
            userId:   req.userData.id,
            purchase: req.body.purchase
            // purchase: {product: req.body.product, quantity: req.body.quantity}

            // purchase: [{$push: {product: req.body.product}}]
        }) 
        .then(data => { //ovanstående tar tid. .then används för att den ska vänta på att det blir klart innan .then körs
            res.status(201).json({ //201 = created
                statusCode: 201,
                status: true,
                message: 'Order created successfully',
                data //data = den produkt som skapts
            })
        })
        .catch(err => {
            res.status(500).json({ //500 = serverfel
                statusCode: 500,
                status: false, 
                message: 'Failed to create order',
                err
            })
        })
    })
}

exports.updateOrder = (req, res) => {

    Order.exists({ _id: req.params.id }, (err, result) => {
        
        if(err) {
            return res.status(400).json({
                statusCode: 400,
            status: false,
            message: 'Bad request',
            })
        }

        if(!result) {
            return res.status(404).json({
                statusCode: 404, 
                status: false,
                message: 'This Order does not exist'
            })
        }
        Order.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true}) // BÖR filtreras på _id och inte userId . allt i bodyn uppdateras via patch, new: true gör så att vi får den nya uppdaterade versionen i vår find
        .then(data => { // väntar tills det är klart och uppdateringen skickas tillbaka som data
            res.status(200).json({
                statusCode: 200,
                status: true,
                message: 'Order updated successfully',
                data
            })
        })
        .catch(err => {
            if(err.code === 11000) {
                return res.status(400).json({
                    statusCode: 400,
                    status: false,
                    message: 'An order with that name already exists',
                    err
                })
            }

            res.status(500).json({
                statusCode: 500,
                status: false,
                message: 'Failed to update Order',
                err
            })
        })
    })


}


exports.deleteOrder = (req, res) => {

    Order.exists({ _id: req.params.id }, (err, result) => {
        
        if(err) {
            return res.status(400).json({
                statusCode: 400,
            status: false,
            message: 'Bad request',
            
            })
        }

        if(!result) {
            return res.status(404).json({
                statusCode: 404,
                status: false,
                message: 'This order does not exist',
            })
        }
        
        Order.deleteOne({ _id: req.params.id }) //jämför _id med skickat id
            .then(() => {
                res.status(201).json({ //201 = created
                    statusCode: 201,
                    status: true,
                    message: 'Order deleted successfully',
                })
            })
            .catch(err => {
                res.status(500).json({
                    statusCode: 500,
                    status: false,
                    message: 'Failed to delete order',
                    err
                
                })
            })
    })
}