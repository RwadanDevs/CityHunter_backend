import jwt from 'jsonwebtoken';
import Util from '../helpers/util';
import userService from '../services/userService';

const util = new Util();
 
export default class User {

    static async SocialAuth(req,res){
        let status,message,data;
        const { email,isVerified,googleId,facebookId } = req.body;
        const userByEmail = await userService.findByEmail({ email })
        let firstname,lastname;

        if(!userByEmail){
            firstname = req.body.firstname
            lastname = req.body.lastname;
            const newUser = {
                firstname,
                lastname,
                email,
                role:"requester",
                isVerified,
                googleId,
                facebookId,
            }

            const userInfo = await userService.createuser(newUser)
            status = 201
            message = "Welcome to City Hunter"
            data = {
                id:userInfo.dataValues.id,
                email,
                role: userInfo.dataValues.role,
            }
        }else{
            status = 200
            message = "Welcome Back to City Hunter"
            data = {
                id:userByEmail.dataValues.id,
                email,
                role: userByEmail.dataValues.role,
            }
            firstname = userByEmail.dataValues.firstname
            lastname = userByEmail.dataValues.lastname;
        }

        const token = jwt.sign(data,process.env.JWT_KEY,{ expiresIn: '7d' });

        util.setSuccess(status,message,{ token,...data,fullName:`${firstname} ${lastname}` })
        return util.send(res)
    }

    static async updateUser(req,res){
        const { role } = req.body;
        const { userId } = req.params;

        await userService.updateAtt({ role }, { id : userId });
        
        util.setSuccess(200, "User's role updated successfully");
        return util.send(res);
    }
}
