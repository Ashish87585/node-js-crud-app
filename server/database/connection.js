const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //mongodb conection string
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`mongodb connected ${con.connection.host}`)
  } catch (e) {
      console.log(e)
      process.exit(1)
  }
};

module.exports = connectDB
