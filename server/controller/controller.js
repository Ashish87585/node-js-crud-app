var Userdb = require("../model/model");

//create and add new user
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty" });
  }

  //new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  user
    .save(user)
    .then((data) => {
    //   res.send(data);
    res.redirect('/')
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some Error occured" });
    });
};

//retrive and return all users/ retrive and single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    console.log(id)

    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not fIND user" });
        } else {
          res.send(data);
        }
      })
      .catch((e) => res.status(500).send({ message: "Error occured" }));
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message || "error occured retriving the data" });
      });
  }
};

//update the user
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "data to update can not be empty" });
  }

  const id = req.params.id;

  Userdb.findByIdAndUpdate(id, req.body)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "error occured retriving the data" });
    });
};

//Delete user
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Can not delete with id" });
      } else {
        res.send({ message: "Record deleted successfully" });
      }
    })
    .catch((e) => {
      message: e.message || "error occured find id";
    });
};
