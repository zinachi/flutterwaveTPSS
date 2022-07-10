const mongoose = require('mongoose');

const connectDatabase = async () => {
  const MONGODB_URI = process.env.DB_URI;
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // await mongoose.connect(LOCAL_DB);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDatabase;