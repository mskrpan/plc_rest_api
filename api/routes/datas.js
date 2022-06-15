import express from "express";
import dataController from "../controllers/datas.js"

const router = express.Router();

router.get("/", dataController.get_all_datas);
//ID dio koji još ne znam hoću koristit
router.get("/:dataId", dataController.get_data_by_id); 

router.post("/", dataController.post_new_data);

router.patch('/', dataController.patch_data);

router.delete('/', dataController.delete_data); 

export default router;
