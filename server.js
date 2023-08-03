import express from 'express';
import { APP_PORT, DB_URL } from './config';
const app = express();
import routes from './routers'
import errorHandler from "./middlewares/erorHandler";
const mongoose = require("mongoose");
import path from 'path';


global.appRoot = path.resolve(__dirname);
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use('/api', routes)
app.use('/uploads', express.static('uploads'))
 
// Database conncetion
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(DB_URL);
    console.log("database connected");
}



app.use(errorHandler)
app.listen(APP_PORT, () => {
    console.log(`listening on port ${APP_PORT}.`);
})