const WilderModel = require("../models/Wilders");

module.exports = {
  create: async (req, res, next) => {
    // WilderModel.init().then(() => {
    //   const wilder = new WilderModel(req.body);
    //   wilder
    //     .save()
    //     .then((result) => {
    //       res.status(200).json({ success: true, result: result });
    //     })
    //     .catch((err) => {
    //       //   res.status(404).json({ success: false, result: err });
    //       next(err);
    //     });
    // });
    await WilderModel.init();
    const wilder = new WilderModel(req.body);
    const result = await wilder.save();
    res.json({ success: true, result });
  },
  read: async (req, res) => {
    // const wilders = await WilderModel.find();
    // if (!wilders) return res.status(204).json({ message: "No wilders found." });

    // try {
    //   res.status(200).json(wilders);
    // } catch (err) {
    //   res.status(404).json({ message: err.message });
    // }
    const result = await WilderModel.find();
    res.json({ success: true, result });
  },
  readOne: async (req, res) => {
    const { id } = req.params;

    try {
      const GetOneWilder = await WilderModel.findById(id);

      res.status(200).json(GetOneWilder);
    } catch (err) {
      console.log(err);
      if (err.path === "_id") {
        return res.status(404).send({
          success: false,
          message: "user not found",
        });
      } else res.status(500).send("Error retrieving wilder on database");
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;

    try {
      await WilderModel.findByIdAndDelete(id);

      res.status(200).json({ message: "Successfully deleted. " });
    } catch (err) {
      console.log(err);
      if (err.path === "_id") {
        return res.status(404).send({
          success: false,
          message: "user not found",
        });
      } else res.status(500).send("Error retrieving wilder on database");
    }
  },
  update: async (req, res) => {
    try {
      const result = await WilderModel.findByIdAndUpdate(
        { _id: req.params.id },
        { ...req.body },
        { new: true }
      );

      res.status(201).json(result);
    } catch (err) {
      console.log(err);
      if (err.path === "_id") {
        return res.status(404).send({
          success: false,
          message: "user not found",
        });
      } else res.status(500).send("Error retrieving wilder on database");
    }
  },
};
