const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config()


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //Execution de l'algorythme de hashage, "saler" le mdp 10 fois
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })  //Recuperation du hash du mdp qu'on va enregistrer dans un nouvel user, ensuite enregistré dans la base de donnée
      .catch(error => res.status(500).json({ error }));
  };
  //Fonction asynchrone signup qui va crypter le mdp, prend le mdp crypté et créé un nouveau user avec ce mdp crypté. Dans le bloc then, on créé un nouvel utilisateur qui sera enregistré dans la base de données. bcrypt sait quand deux hash différents ont été produits à partir du même string d'origine


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
            //si l'utilisateur n'existe pas
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }

            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                    //si le mot de passe est incorrect
                    return res.status(401).json({ error: 'Mot de passe incorrect !' }); 
                    }
                    const tokenSecret = process.env.TOKEN;
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            tokenSecret,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error })); 
        })
        .catch(error => res.status(500).json({ error }));
};

