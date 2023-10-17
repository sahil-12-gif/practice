const express = require('express')
const User = require('../models/user')
const Task = require('../models/task')
// const auth = require('../middleware/auth')
const router = new express.Router()
router.post('/tasks', async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();

        // Get the user ID from the request body or any other source (e.g., authentication)
        const userId = req.body.user;

        // Update the User model to include the new task's ID
        await User.findByIdAndUpdate(
            userId,
            { $push: { tasks: newTask._id } },
            { new: true }
        );

        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/users/:id/populate', async (req, res) => {
    const userId = req.params.id;
    console.log(userId, ' User Id')
    try {
        const user = await User.findById(userId).populate('tasks');
        console.log(user, ' User')
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/users', async (req, res) => {
    try {
        console.log(req.body, ' req.body')
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports = router