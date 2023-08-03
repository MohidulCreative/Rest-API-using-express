import mongoose from "mongoose";
import { APP_URL} from '../config'

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    size: {type: String, required: true},
    image: {type: String, required: true, get: (image) => {
        // http://localhost:5000/uploads\\1691067264515-705660614.png
        return `${APP_URL}/${image}`
    }}
}, { timestamps: true, toJSON: { getters: true }, id: false });

export default mongoose.model('Product', productSchema, 'products')
