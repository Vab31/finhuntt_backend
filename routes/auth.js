
import express from 'express';
const app= express();


app.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(200).send('User created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
  });

  app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).send('Invalid email or password');
            return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).send('Invalid email or password');
            return;
        }
        const token = jwt.sign({ email: user.email }, 'secretkey');
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

