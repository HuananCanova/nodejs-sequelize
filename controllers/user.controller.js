const db = require('../models');
const User = db.users;
const Op = db.sequelize.Op;

exports.create = (req, res) => {
    //verifica o body da request
    if(!req.body.email && !req.body.password){
        res.status(400).send({
            message: "Content cant be null"
        });
        return;
    }

    const user = {
        email: req.body.email,
        password: req.body.password
    };


    User.create(user)
    .then(data =>{
        res.send(data);
    })
    .catch(err =>{
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Tutorial."
        });
    });

};

exports.findAll = (req, res) =>{
    const email = req.query.email;
    var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
    User.findAll({ where: condition})
    .then(data =>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message: "erro ao buscar users"
        });
    });
};

exports.findOne = (req, res) =>{
    const id = req.params.id;
    User.findByPK(id)
    .then(data=>{
        if(data){
            res.send(data);
        } else {
            res.status(400).send({
                message:`não foi possível encontrar user with id = ${id}`
            });
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: "Erro ao buscar user de id = " + id
        });
    });
};


exports.update = (req, res) =>{
    const id = req.param.id;
    User.update(req.body, {
        where: { id:id }
    })
    .then(num=>{
        if (num == 1) {
            res.send({
                message: "User atualizado com sucesso."
            });
        } else {
            res.send({
                message: `Não foi possível atualizar o user id = ${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
          message: "erro ao atualizar user com id = " + id
        });
      });
};

exports.delete = (req, res) =>{
    const id = req.params.id;

    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
};


exports.deleteAll = (req, res) =>{
    User.destroy({
        where: {},
        truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} User were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all users."
        });
      });
};
