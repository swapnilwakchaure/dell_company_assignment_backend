const express = require('express');
const product = require('../assets/product.json');
const { ProductModel } = require('../models/product');

const productRoute = express.Router();


// ---------------- GET PRODUCTS IN ONE GET ROUTE ---------------- //

productRoute.get('/', async (request, response) => {
    const page = parseInt(request.query._page) || 1;
    const limit = parseInt(request.query._limit) || 9;
    const skip = (page - 1) * limit;
    const query = request.query.q || '';

    try {
        let data;
        if (query) {
            data = await ProductModel.find({ name: query }).skip(skip).limit(limit);
        } else {
            data = await ProductModel.find().skip(skip).limit(limit);
        }
        response.send(data);
    } catch (error) {
        // console.log('error: ',error);
        response.send(error);
    }
});



// ---------------- INSERT ALL DATA IN ONE GO ---------------- //

/*
const insertData = async () => {
    try {
        const data = await ProductModel.insertMany(product);
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
}


insertData()
    .then((docs) => console.log(docs))
    .catch((error) => console.log(error));


*/

module.exports = { productRoute };