const express = require('express');
const router = express.Router();
const Item = require('../models/item');

router.post('/items/create', async (req, res) => {
    try {
        const { picture1,picture2,picture3, name, description } = req.body;
        const newItem = await Item.create({
            picture1,
            picture2,
            picture3,
            name,
            description
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/items/', async (req, res) => {
    try {
        const items = await Item.find();
        console.log(items)
        res.json({ success: true, data: items });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, error: 'Item not found' });
        }
        res.json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.put('/items/:id', async (req, res) => {
    try {
        const { picture1,picture2,picture3, name, description } = req.body;
        const updatedItem = await Item.findByIdAndUpdate(req.params.id,
            {
                picture1,
                picture2,
                picture3,
                name,
                description,
                updatedAt: new Date()
            },
            { new: true }
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ success: false, error: 'Item not found' });
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
