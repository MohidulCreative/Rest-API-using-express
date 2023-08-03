import Joi from 'joi';
import { User, RefeshToken } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';
import { REFRESH_TOKEN } from '../../config';

const registerController = {
   async register(req, res, next){
   
        //  validated the request.
        // authorise the request.
        // check if the user is in the database already
        // prepare model
        // store in database
        // generate jwt token
        // send response 


        // validation
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            repeat_password: Joi.ref('password')
        })
        
        const { error } = registerSchema.validate(req.body);

        if(error){
            return next(error)
        }


        // check if the user is in the database already
        try{
            const exist = await User.exists({email: req.body.email})
            if(exist){
                return next(CustomErrorHandler.alreadyExist("This email is already taken."))
            }

        }catch(err){
            return next(err)
        }

        // Hash password 
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        // prepare the model

        const user = new User({
            name,
            email,
            password: hashedPassword
        })

        let access_token;
        let refresh_token;
        try{
            const result = await user.save();
            // token 
            access_token = JwtService.sign({ _id: result._id, role:result.role });
            refresh_token = JwtService.sign({ _id: result._id, role:result.role }, '1y', REFRESH_TOKEN);
            // database whitelist
            await RefeshToken.create({ token: refresh_token })

        }catch(err){
            return next(err)
        }


        res.json({ access_token, refresh_token })
    }
}

export default registerController;