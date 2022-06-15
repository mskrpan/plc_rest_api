import mongoose from "mongoose";
import Data from "../models/data.js";

export const save_data_to_DB = (name, value) =>{
    const date = new Date();
    const currentDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    console.log(currentDate)
     const data = new Data({
        _id: new mongoose.Types.ObjectId(),
        name: name,
        value: value,
        date: currentDate,
        //date vamo ako bude trebalo
      });
      data.save();
}