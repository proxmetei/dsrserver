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
class AnimalController{
async edit(req, res, next){
    const {animal} = req.body;
    const {id, kind, breed, name, document, userId}= animal;
    const {data, name: doc_name, id: Docid} = document;
    const candidate = await Animal.findOne({where: {id}});
    if (!candidate) {
        return next(ApiError.badRequest('Питомец с таким id не существует'))
    }
    const createdAnimal = await Animal.update({ kind, breed, name,userId: userId},  { where: { id: id } });
    let guidd = uuid.v4()+"";
    let doc = await Document.findOne({where: {id: Docid}});
    if(!doc){
    const createdDocument = await Document.create({guid ,data: data,doc_name: doc_name, animalId: id});
    }
    else{
    const createdDoc = await Document.update({guid: guidd ,data: data,doc_name: doc_name, animalId: id},  { where: { id: Docid } });
    }
    const token = generateJwt(candidate.id, candidate.kind, candidate.breed);
    return res.json({token})

}
}
module.exports = new AnimalController();