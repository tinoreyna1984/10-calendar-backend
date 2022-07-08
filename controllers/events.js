const { response } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");

  res.status(200).json({
    ok: true,
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;

    const eventoGuardado = await evento.save();

    res.status(200).json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      ok: false,
      msg: "Error interno. Por favor, contacte con el administrador",
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;

  try {
    const evento = await Evento.findById(eventoId);
    const uid = req.uid;

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no encontrado con ID: " + eventoId,
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No autorizado",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    res.status(200).json({
      ok: true,
      evento: eventoActualizado,
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      ok: false,
      msg: "Error interno. Por favor, contacte con el administrador",
    });
  }
};

const eliminarEvento = async (req, res = response) => {

  const eventoId = req.params.id;

  try {
    const evento = await Evento.findById(eventoId);
    const uid = req.uid;

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no encontrado con ID: " + eventoId,
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No autorizado",
      });
    }

    await Evento.findByIdAndDelete(eventoId);

    res.status(200).json({
      ok: true,
      msg: "Registro eliminado",
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      ok: false,
      msg: "Error interno. Por favor, contacte con el administrador",
    });
  }

};

module.exports = { getEventos, crearEvento, actualizarEvento, eliminarEvento };
