const User = require('../models/User');

const jwt = require('jsonwebtoken');

// inscription d´un nouvel utilisateur 
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;

    try{
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur créé avec succées' });
    
} catch (error){
    res.status(400).json({ message: error.message });
} 
};
// connexion a un utilisateur existant

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try{
        const user = await User.findOne({ username });

        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: 'Mauvais mot de passe' });
        // generation d´un token JWT 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '60d' });

        res.json({ token });

    } catch (error){
        res.status(500).json({ message: error.message });
    }
};

