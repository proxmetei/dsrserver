 class UserController{
login(req ,res){
    res.status(200).json({
        login:true
    })
}
register(req, res){
    res.status(200).json({
        register:true
    })
}
}
module.exports = new UserController();