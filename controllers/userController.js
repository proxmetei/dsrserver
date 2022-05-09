const {User,Animal,Document} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class UserController{
    async registration(req, res){
         const {user, animals} = req.body;
         const {email,login, phone, name, password} = user;
         const hashPassword = await bcrypt.hash(password, 5);
         const candidate = await User.findOne({where: {email}}) || await User.findOne({where: {login}})
         if (candidate) {
             return next(ApiError.badRequest('Пользователь с таким email уже существует'))
         }
         const createdUser = await User.create({email,login,phone,name, password: hashPassword});
         let createdAnimals = [];
   
         animals.forEach(async (element) =>  {
            console.log(element.url);
            
            //  const {kind, breed, name, img} = element;
            //  const {data , doc_name} = img;
            //  let guid = uuid.v4()+"";
            //  let createdAnimal = await Animal.create({name, breed, kind, userId: createdUser.id});
            // const createdDocument = await Document.create({guid ,data,doc_name, animalId: createdAnimal.id});
            //  createdAnimals.push(createdAnimal);
         });
         const token = generateJwt(createdUser.id, createdUser.login, createdUser.role);
         return res.json({token})
 
    }
    async login(req, res){
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token})
    }
    async check(req, res){
        const query = req.query;
        res.json(query);
    }
}
module.exports = new UserController();