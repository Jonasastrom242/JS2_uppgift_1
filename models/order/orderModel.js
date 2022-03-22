const Order = require('./orderSchema');

exports.getProducts = async (req, res) => {
    try { //försöker hämta data 
        const data = await Product.find() //ger en array tillbaka 
        res.status(200).json(data)
    }
    catch (err) { //om det inte går att hämta data
        res.status(500).json({
            statusCode: 500,
            status: false,
            message: 'Something went wrong when fetching the products',
            err //skickar med errormeddelande
        })
    }
}

exports.getProductById = (req, res) => {
    Product.exists({ _id: req.params.id }, (err, result) => {
        if(err) {
            return res.status(400).json({
                statusCode: 400,
            status: false,
            message: 'Bad request',
            err //skickar med errormeddelande
            })
        }

        if(!Product) {
            return res.status(404).json({
                statusCode: 404,
                status: false,
                message: 'This product does not exist',
            })
        }
        // Product.findOne({ _id: req.params.id }) //om man vill söka efter namn etc
        Product.findById(req.params.id)
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


exports.createProduct = (req, res) => {

    Product.exists({ name: req.body.name }, (err, result) => { //callbackfunktion, om error skickas fel till err
        
        if(err) {
            return res.status(500).json(err) //skickar tillbaka status 500 och hoppar ur funktionen
        }

        if(result) { //om resultat finns(true) körs return och funktionen hoppas ur
            return res.status(400).json({ //400 =
                statusCode: 400,
                status: false,
                message: 'A product by that name already exists, please update product instead'
            })

        }
        // const NewProduct = new Product({}) //använd om vi vill manipulera objektet innan det ska sparas på db
        // NewProduct.save()
        Product.create({ //sparar  produkten på databasen direkt
            name:   req.body.name,
            short:  req.body.short,
            desc:   req.body.desc,
            price:  req.body.price,
            image:  req.body.image
        }) 
        .then(data => { //ovanstående tar tid. .then används för att den ska vänta på att det blir klart innan .then körs
            res.status(201).json({ //201 = created
                statusCode: 201,
                status: true,
                message: 'Product created successfully',
                data //data = den produkt som skapts
            })
        })
        .catch(err => {
            res.status(500).json({ //500 = serverfel
                statusCode: 500,
                status: false, 
                message: 'Failed to create product',
                err
            })
        })
    })
}

exports.updateProduct = (req, res) => {

    Product.exists({ _id: req.params.id }, (err, result) => {
        
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
                message: 'This product does not exist'
            })
        }
        Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true}) //allt i bodyn uppdateras via patch, new: true gör så att vi får den nya uppdaterade versionen i vår find
        .then(data => { // väntar tills det är klart och uppdateringen skickas tillbaka som data
            res.status(200).json({
                statusCode: 200,
                status: true,
                message: 'Product updated successfully',
                data
            })
        })
        .catch(err => {
            if(err.code === 11000) {
                return res.status(400).json({
                    statusCode: 400,
                    status: false,
                    message: 'A product with that name already exists',
                    err
                })
            }

            res.status(500).json({
                statusCode: 500,
                status: false,
                message: 'Failed to update product',
                err
            })
        })
    })


}


exports.deleteProduct = (req, res) => {

    Product.exists({ _id: req.params.id }, (err, result) => {
        
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
                message: 'This product does not exist',
            })
        }
        
        Product.deleteOne({ _id: req.params.id }) //jämför _id med skickat id
            .then(() => {
                res.status(201).json({ //201 = created
                    statusCode: 201,
                    status: true,
                    message: 'Product deleted successfully',
                })
            })
            .catch(err => {
                res.status(500).json({
                    statusCode: 500,
                    status: false,
                    message: 'Failed to delete product',
                    err
                
                })
            })
    })
}