import mongoose from "mongoose";
import Data from "../models/data.js";

const get_all_datas = (req, res, next) => {
  Data.find()
    .select("name value date _id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        datas: docs.map((doc) => {
          return {
            name: doc.name,
            _id: doc._id,
            value: {
              amps: doc.value.amps,
              voltage: doc.value.voltage,
              torque: doc.value.torque,
            },
            date: doc.date,
            request: {
              type: "GET",
              url: `http://localhost:3000/datas/${doc._id}`,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

const get_data_by_id = (req, res, next) => {
  const id = req.params.dataId;
  if (id === "special") {
    res.status(200).json({
      message: "You passed SPECIAL",
    });
  } else {
    res.status(200).json({
      message: `You passed ID = ${id}`,
    });
  }
};

const post_new_data = (req, res, next) => {
  const data = new Data({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    value: {
      amps: req.body.value.amps,
      voltage: req.body.value.voltage,
      torque: req.body.value.torque,
    },
    date: req.body.date,
    //date vamo ako bude trebalo
  });
  data
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "New entry created!!!",
        createdData: {
          name: result.name,
          value: {
            amps: result.value.amps,
            voltage: result.value.voltage,
            torque: result.value.torque,
          },
          date: result.date,
          request: {
            type: "GET",
            url: `http://localhost:3000/datas/${result._id}`,
            all_data_url: "http://localhost:3000/datas",
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const patch_data = (req, res, next) => {
  res.status(200).json({
    message: "It works PATCH",
  });
};

const delete_data = (req, res, next) => {
  res.status(200).json({
    message: "It works DELETE",
  });
};

export default {get_all_datas, get_data_by_id,post_new_data,patch_data,delete_data}