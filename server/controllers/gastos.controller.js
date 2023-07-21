const Gasto = require('../models/gastos');
const express = require('express');
const router = express.Router();
const gastosController = {};
router.get('/', (req, res) => {

    res.json({ status: 'API works' });
})
gastosController.getGastos = async (req, res) => {
    const gastos = await Gasto.find();
    res.json(gastos);
}

gastosController.createGastos = async (req, res) => {
    const gasto = new Gasto(req.body);
    console.log(gasto);
    await gasto.save();
    res.json('status: Gasto guardado');
}

gastosController.getGasto = async (req, res) => {
    console.log(req.params.id);
    const gasto = await Gasto.findById(req.params.id);
    res.json(gasto);
}
gastosController.editGasto = async (req, res) => {
    const { id } = req.params;
    const gasto = {
        tipo: req.body.tipo,
        ruc: req.body.ruc,
        empresa: req.body.empresa,
        monto: req.body.monto
    };
    await Gasto.findByIdAndUpdate(id, { $set: gasto }, { new: true });
    res.json('status: Gasto actualizado');
}

gastosController.deleteGasto = async (req, res) => {
    await Gasto.findByIdAndRemove(req.params.id);
    res.json('status: Gasto borrado');
}
gastosController.getGastosByTipo = async (req, res) => {
    try {
        const tipo = req.params.tipo;
        const gastos = await Gasto.find({ tipo: tipo });
        res.json(gastos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = gastosController;


