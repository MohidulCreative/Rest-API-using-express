import Joi from 'joi';
import { User, RefeshToken } from '../../models';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import bcrypt from 'bcrypt';
import JwtService from '../../services/JwtService';
import { REFRESH_TOKEN } from '../../config';

const loginController = {

    async login(req, res, next){
        // validation
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        })

        const { error } = loginSchema.validate(req.body);

        if(error) {
            return next()
        }

        try{
            const user = await User.findOne({ email: req.body.email });
            if(!user) {
                return next(CustomErrorHandler.wrongCredentials());
            }

            // compare the password
            const match = bcrypt.compare(req.body.password, user.password);
            if(!match){
                return next(CustomErrorHandler.wrongCredentials());
            }

            // token
            const access_token = JwtService.sign({ _id: user._id, role: user.role });
            const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_TOKEN);
            // database whitelist
            await RefeshToken.create({ token: refresh_token })

            res.json({ access_token, refresh_token });

        }catch(err){
            return next(err);
        }

    },


    async logout(req, res, next) {

        // validation
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        })

        const { error } = refreshSchema.validate(req.body);

        if(error) {
            return next()
        }
 

        try{
            await RefeshToken.deleteOne({ token: req.body.refresh_token });

        } catch(err) {
            return next(new Error('Something went wrong in the database'));
        }
        
        res.json('logout successful')
    }

}


export default loginController;