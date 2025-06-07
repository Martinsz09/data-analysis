const Create = require("../models/createModel");

exports.getHome = (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("home/home", {
    user: req.session.user,
  });
};

exports.getCreate = (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("home/create", {
    create: {},
  });
};

exports.postCreate = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  const { title, type, labels, values, datasetLabel } = req.body;
  const labelArray = labels.split(",").map((item) => item.trim());
  const valueArray = values.split(",").map((val) => parseFloat(val));
  if (!valueArray.every(val => typeof val === "number" && !isNaN(val))) {
   return res.render("home/create", {
      create: req.body,
      errorMessage: "Apenas números válidos são permitidos.",
    });
}
  const create = new Create({
    title,
    type,
    labels: labelArray,
    values: valueArray,
    datasetLabel,
    userId: req.session.user._id,
  });
  await create.save();
  res.redirect("/home/view");
};

exports.getView = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  const graphic = await Create.find({ userId: req.session.user._id });
  res.render("home/view", {
    graphic,
    user: req.session.user,
  });
};

exports.getGraphic = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  const create = await Create.find({ userId: req.session.user._id });
  res.render("home/graphic", {
    create,
  });
};

exports.getEditGraphic = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  const create = await Create.findOne({
    _id: req.params.id,
    userId: req.session.user._id,
  });
  res.render("home/edit", {
    create,
  });
};

exports.postEditGraphic = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  const { title, type, labels, values, datasetLabel } = req.body;


  const labelArray = labels.split(",").map((item) => item.trim());
  const valueArray = values.split(",").map((val) => parseFloat(val));


  if (!valueArray.every(val => typeof val === "number" && !isNaN(val))) {

    return res.render("home/edit", {
      create: {
        ...req.body,
        labels: labelArray, 
        values: values.split(",").map(val => val.trim()), 
      },
      errorMessage: "Apenas números válidos são permitidos.",
    });
  }


  await Create.findOneAndUpdate(
    { _id: req.params.id, userId: req.session.user._id },
    {
      title,
      type,
      labels: labelArray,
      values: valueArray,
      datasetLabel,
    }
  );

  res.redirect("/home/view");
};


exports.getDeleteGraphic = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  const create = await Create.findOne({
    _id: req.params.id,
    userId: req.session.user._id,
  });
  res.render("home/delete", {
    create,
  });
};

exports.postDeleteGraphic = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  await Create.findOneAndDelete({
    _id: req.params.id,
    userId: req.session.user._id,
  });
  res.redirect("/home/graphics");
};
