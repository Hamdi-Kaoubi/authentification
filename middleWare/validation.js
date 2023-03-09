const {body,validationResult}=require('express-validator')
exports.loginValidator=[
    body('email','please add a valid email').isEmail(),
    body('password','password must be at least 6 characters').isLength({min:6})
]
exports.registerValidator=[
    body('email','please add a valid email').isEmail(),
    body('password','password must be at least 6 characters').isLength({min:6})
]

exports.validation=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}