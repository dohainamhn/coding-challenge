import mongoose from 'mongoose';
import { overrideConfigs } from '../../environments';
export default class MongoDb {
  private mongoUrl = overrideConfigs.mongoConnectString;
  mongoDBConnected = false;
  connect = async () => {
    try {
      if (!this.mongoDBConnected) {
        await mongoose.connect(this.mongoUrl);
        this.mongoDBConnected = true;
        console.log('DB connected');
      }
    } catch (error) {
      console.log(`DB connection failed with error ${error}`);
    }
  };
  stop = async () => {
    if (this.mongoDBConnected) {
      await mongoose.connection.close();
      this.mongoDBConnected = false;
      console.log('DB connected');
    }
  };
}
