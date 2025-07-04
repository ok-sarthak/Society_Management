import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    console.log('⚡ Route /demo hit — creating user...');
    const demoData = {
      name: 'Suvajit Demo',
      flatNumber: 'C-303',
      role: 'admin'
    };
    const newUser = new User(demoData);
    const savedUser = await newUser.save();
    console.log('✅ User saved:', savedUser);
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('❌ Error creating user:', err);
    res.status(400).json({ error: err.message });
  }
};