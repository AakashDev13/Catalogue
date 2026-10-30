const express = require('express');


const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.static('./public'));

let items = [
    { id: 1, name: 'Veg Thali', price: 90 },
    { id: 2, name: 'Paneer Roll', price: 70 }
];

let nextId = 3;


// app.get('/', (req, res) => {
//     res.send('catalogue is alive');
// })


app.get('/items', (req, res) => {
    res.json(items);
})

app.get('/items/:id', (req, res) => {

    const item = items.find(
        i => i.id === Number(req.params.id)
    );

    if(!item) {
        return res.status(404).json({
            error : 'not found'
        });
    }

    res.json(item);

})

app.post('/items', (req, res) => {

    const {name , price} = req.body;
    
    if(!name) {
        return res.status(422).json({
            name : 'name required'
        })
    }

    const item = {
        id : nextId++,
        name,
        price : Number(price) || 0
    }

    items.push(item);

   res.status(202).json(item)


})



app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
})