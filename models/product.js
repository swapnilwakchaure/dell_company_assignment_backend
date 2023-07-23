const mongoose = require('mongoose');


const specsSchema = mongoose.Schema({
    processor: String,
    os: String,
    video_card: String,
    memory: String,
    display: String,
    keyboard: String,
})


const productSchema = mongoose.Schema({
    id: Number,
    name: String,
    service_tag: String,
    model: String,
    price: Number,
    img1: String,
    img2: String,
    img3: String,
    img4: String,
    img5: String,
    configuration: String,
    specifications: specsSchema,
    performance: [{ type: String }]
}, {
    versionKey: false
});




const ProductModel = mongoose.model('product', productSchema);



module.exports = { ProductModel };