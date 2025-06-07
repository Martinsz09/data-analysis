const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

router.get('/', homeController.getHome);
router.get('/create', homeController.getCreate);
router.post('/create', homeController.postCreate);
router.get('/view', homeController.getView);
router.get('/graphics', homeController.getGraphic);
router.get('/editgraphics/:id', homeController.getEditGraphic);
router.post('/editgraphics/:id', homeController.postEditGraphic);
router.get('/deletegraphics/:id', homeController.getDeleteGraphic);
router.post('/deletegraphics/:id', homeController.postDeleteGraphic);
module.exports = router;
