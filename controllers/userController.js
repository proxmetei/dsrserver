const {User,Animal,Document} = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const fs = require('fs');
const { Sequelize } = require('../db');
const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}
class UserController{
    async registration(req, res, next){
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
            
             const {kind, breed, name, document} = element;
             const {data, doc_name} = document;
             let guid = uuid.v4()+"";
             let createdAnimal = await Animal.create({name, breed, kind, userId: createdUser.id});
            const createdDocument = await Document.create({guid ,data: data,doc_name: doc_name, animalId: createdAnimal.id});
            //  createdAnimals.push(createdAnimal);
         });
         const token = generateJwt(createdUser.id, createdUser.login, createdUser.role);
         return res.json({token})
 
    }
    async edit(req, res, next){
        console.log(1);
        const {user, animals} = req.body;
        const {email,login, phone, name} = user;
        console.log(user);
        const candidate = await User.findOne({where: {email}})
        if (!candidate) {
            return next(ApiError.badRequest('Пользователь с таким email не существует'))
        }
        const createdUser = await User.update({login,phone,name},  { where: { id: candidate.id } });
        let createdAnimals = [];
        let ids=[]
        animals.forEach(async (element)=>{
            const {id, kind, breed, name, document} = element;
            ids.push(id);
        })
        await Animal.destroy({where:{id: { [Sequelize.Op.notIn]: ids}}});
        animals.forEach(async (element) =>  {
           
            const {id, kind, breed, name, document} = element;
            const {data, doc_name} = document;
            let guid = uuid.v4()+"";
            if(!id){
            let createdAnimal = await Animal.create({name, breed, kind, userId: candidate.id});
            await Document.destroy({where:{animalId: createdAnimal.id}});
           const createdDocument = await Document.create({guid ,data: data,doc_name: doc_name, animalId: createdAnimal.id});
            }
           //  createdAnimals.push(createdAnimal);
        });
        const token = generateJwt(candidate.id, candidate.login, candidate.role);
        return res.json({token})

   }
    async login(req, res, next){
        const {login, password} = req.body;
        console.log(1);
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
    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.login, req.user.role);
        return res.json({token});
    }
        async userInfo(req, res, next){
        const {login} = req.body;
        console.log(login);
        const user = await User.findOne({where: {login}});
        const animals = await Animal.findAll({where: {userId: user.id}});
        let animals1 = [];
         for(let elem of animals){
            const document = await Document.findOne({where: {animalId: elem.id}});
            elem.dataValues.document=document;
        }
        console.log(animals1);
        user.dataValues.animals= animals;
        return res.json({user});
    }
}
module.exports = new UserController();