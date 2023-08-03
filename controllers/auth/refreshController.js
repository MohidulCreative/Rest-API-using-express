import Joi from 'joi';
import refreshToken from '../../models/refreshToken';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import JwtService from '../../services/JwtService';
import { REFRESH_TOKEN } from '../../config';
import { User, RefeshToken } from '../../models';


const refreshController = {
  async  refresh (req, res, next) {
          // validation
          const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        })

        const { error } = refreshSchema.validate(req.body);

        if(error) {
            return next()
        }

        // database
        let refershtoken;
        try{
            refershtoken = await refreshToken.findOne({ token: req.body.refresh_token });
            if(!refershtoken) {
                return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
            }


            let userId;
            try{
                const { _id } = await JwtService.verify(refershtoken.token, REFRESH_TOKEN);
                userId = _id;

            } catch(err){
                return next(CustomErrorHandler.unAuthorized("Invalid refresh token"));
            }


            const user = await User.findOne({ _id: userId });

            if(!user){
                return next(CustomErrorHandler.unAuthorized("user is not found"));
            }

            // tokens
            const access_token = JwtService.sign({ _id: user._id, role: user.role });
            const refresh_token = JwtService.sign({ _id: user._id, role: user.role }, '1y', REFRESH_TOKEN);
            // database whitelist
            await RefeshToken.create({ token: refresh_token })

            res.json({ access_token, refresh_token });

        } catch(err){
            return next( new Error('Something went wrong ' + err.message ))
        }


    }
};

export default refreshController;