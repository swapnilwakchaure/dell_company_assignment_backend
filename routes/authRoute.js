require('dotenv').config();
const express = require('express');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { AuthModel } = require('../models/authModel');


cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});


const authRoute = express.Router();


// ------------- UPLOAD IMAGE TO THE CLOUDINARY ------------- //
authRoute.post('/upload', async (request, response) => {
    const file = request.files.image;

    try {
        cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
            if (error) {
                response.send({
                    'error': `Cannot able to upload the image: ${error}`
                });
            } else {
                response.send({
                    'message': 'image successfully uploaded on cloudinary',
                    'data': result.url
                })
            }
        })
    } catch (error) {
        response.send({
            'error': `something went wrong, ${error}`
        });
    }
});


// ------------- UPLOAD IMAGE TO THE CLOUDINARY ------------- //
authRoute.post('/register', async (request, response) => {
    const { imgUrl, name, email, password } = request.body;

    try {
        const oldUser = await AuthModel.find({ email });
        if (oldUser.length > 0) {
            response.send({
                'message': `${oldUser[0].name} is already registered. Please log in`
            });
        } else {
            bcrypt.hash(password, 5, async (error, hash) => {
                if (error) {
                    response.send({
                        'message': `Cannot able to save password ${error}`
                    });
                } else {
                    const newUser = new AuthModel({ imgUrl, name, email, password: hash });
                    await newUser.save();
                    response.send({
                        'message': `${name} is successfully registered. Please log in`
                    });
                }
            })
        }
    } catch (error) {
        response.send({
            'message': `Cannot able to register the user ${error}`
        });
    }
});


// ------------- UPLOAD IMAGE TO THE CLOUDINARY ------------- //
authRoute.post('/login', async (request, response) => {
    const { email, password } = request.body;

    try {
        const user = await AuthModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (error, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, "auth", { expiresIn: 60 * 60 });
                    response.send({
                        'message': `${user[0].name} login successful`,
                        'data': user,
                        'token': token
                    });
                } else {
                    response.send({
                        'message': `${user[0].name} your password didn't match`,
                        'error': error
                    });
                }
            })
        } else {
            response.send({
                'message': 'Email not exist, Please register yourself'
            })
        }
    } catch (error) {
        response.send({
            'message': `Cannot able to login the user ${error}`
        });
    }
});



module.exports = { authRoute };