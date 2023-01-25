const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { getMongoDb } = require('./utils');

const apiSchema = require('./models/api');

const app = express();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 4000;

app.get('/', function (req, res) {
    res.send('Hello World');
});

//get Data
app.get('/get_data', async function (req, res) {
    try {
        const queryResp = await apiSchema.find().sort({ updatedOn: -1 });
        res.status(200);
        res.send({ statusCode: 200, msg: 'Successfully Get', data: queryResp });

    } catch (err) {
        res.status(500);
        res.send({ statusCode: 500, msg: 'Internal server error' });
    }
});

//Add Data
app.post('/add_data', async function (req, res) {
    try {
        const itemName = req.body.itemName;
        const dateOfService = req.body.dateOfService;
        const ownerName = req.body.ownerName;
        const venderName = req.body.venderName;
        const createdOn = new Date(Date.now());
        console.log(
            'itemName', itemName,
            'dateofService', dateOfService,
            'ownerName', ownerName,
            'vendorName', venderName
        );

        if (!itemName || !dateOfService || !ownerName || !venderName) {
            return res.status(400).json({ statusCode: 400, msg: 'Bad Request' });
        }

        const queryResp = await apiSchema.create({
            itemName,
            dateOfService,
            ownerName,
            venderName,
            createdOn
        });

        res.send({
            statusCode: 200, msg: 'Successfully Added'
        });

    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ statusCode: 500, msg: 'Internal server error' });
    }
});

//edit data
app.put('/update_data', async function (req, res) {
    try {
        const id = req.body.id;
        const itemName = req.body.itemName;
        const dateOfService = req.body.dateOfService;
        const ownerName = req.body.ownerName;
        const venderName = req.body.venderName;
        const createdOn = new Date(Date.now());

        if (!itemName || !dateOfService || !ownerName || !venderName) {
            return res.status(400).json({ statusCode: 400, msg: 'Bad Request' });
        }

        const queryResp = await apiSchema.updateOne(
            { _id: id },
            {
                $set: {
                    itemName,
                    dateOfService,
                    ownerName,
                    venderName,
                    createdOn
                }
            });

        res.send({
            statusCode: 200, msg: 'Successfully Updated'
        });

    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ statusCode: 500, msg: 'Internal server error' });
    }
});

//delete data
app.delete('/delete_data', async function (req, res) {
    try {
        const id = req.body.id;

        console.log(id);
        if (!id) {
            return res.status(400).json({ statusCode: 400, msg: 'Bad Request' });
        }

        const queryResp = await apiSchema.deleteOne({ _id: id });

        res.send({
            statusCode: 200, msg: 'Successfully Deleted'
        });

    } catch (err) {
        console.log(err);
        res.status(500);
        res.send({ statusCode: 500, msg: 'Internal server error' });
    }
});


mongoose
    .connect(getMongoDb(), { useNewUrlParser: true })
    .then(() =>
        app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`);
        })
    )
    .catch((err) => {
        console.log(err);
    });


    // mongodb+srv://aditi5480:<password>@cluster0.ztj26ve.mongodb.net/test