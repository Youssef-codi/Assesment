const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({
	origin: 'http://localhost:3000'
  }));
  
mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://Youssef:youssef@cluster-usef.v97ceiy.mongodb.net/test', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// Models
const Todo = require('./models/Todo');
const Person = require('./models/Person');

const todoRoutes = require('./routes/TodoRoute');
const personRoutes = require('./routes/PersonRoute');

app.use('/api/todos', todoRoutes);
app.use('/api/persons', personRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
