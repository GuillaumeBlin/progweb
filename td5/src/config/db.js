import { connect, disconnect } from 'mongoose';

process.loadEnvFile()
      
async function connectDB() {
    try {
        console.log("Opening connection");
        const conn = await connect(process.env.MONGO_URI + '/' + process.env.DB_NAME, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch(err) { 
        disconnect();
        console.error(err);
        process.exit(1);
    }
}

export default connectDB