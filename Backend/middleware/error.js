const ErrorHander = require("../utils/errorhander");

module.exports =  (err, req, res, next)=>
{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Wrong Mongodob ID Error ( Cast Error)

    if (err.name === "CastError")
    {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHander(message,400);

    }

    //Mongoose Duplicate Key Error

    if(err.code === 11000)
    {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHander(message,400);
         
    }

    //Wrong JWT error

    if(err.code === "JsonWebTokenError")
{
    const message = `JSON Web Token is invalid, Try again`;
    err = new ErrorHander(message,400);
     
}

//JWT expire ERROR
if(err.code === "TokenExpireError")
{
    const message = `JSON web Token is Expired, Try again`
    err = new ErrorHander(message,400);
     
}


    res.status(err.statusCode).json
    (
        {
            success:false,
            message : err.message
        }
    );
};
