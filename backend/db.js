const mongoose = require('mongoose');

const mongoURI =
  'mongodb+srv://rohitpathak1017_db_user:rohit6387@cluster0.xxmpiul.mongodb.net/GoFood?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB successfully!');
    const fetch_data = await mongoose.connection.db.collection('items');
    const food_items = await fetch_data.find({}).toArray(async function(err, data){
      const foodCategory = await mongoose.connection.db.collection('categories');
      foodCategory.find({}).toArray(function(err, catData){
        if(err) console.log(err);
        else{   
          global.food_items = data;
          global.food_category = catData;
        }
      });
    }); 
    
    // console.log(food_items);
    const fetch_category = await mongoose.connection.db.collection('categories');
    const food_category = await fetch_category.find({}).toArray();
    
    // console.log(food_category);
    global.food_items = food_items;
    global.food_category = food_category; 
    // console.log(global.food_items);
    // console.log(global.food_category);
    const fetch_items = await mongoose.connection.db.collection('items');
    const items = await fetch_items.find({}).toArray();
    // console.log(items);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

 