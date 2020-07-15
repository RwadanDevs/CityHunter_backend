import express from 'express';
import allow from '../../../middleware/roleAuthorisation';
import userController from '../../../controllers/userController';
import validator from '../../../middleware/validators';
import { authorizationCheck,VerifyToken } from '../../../middleware/authorization';

const route = express.Router();

route.post('/auth/token/:token', VerifyToken, userController.SocialAuth)

route.post('/auth/user',userController.SocialAuth)

route.patch( 
        '/auth/update/:userId', 
        authorizationCheck, 
        allow('Super Administrator'), 
        validator.RoleUpdateValidator,
        validator.verifyId, 
        userController.updateUser,
    )

route.post('/locations', validator.LocattionsValidations, userController.locations)

export default route;
