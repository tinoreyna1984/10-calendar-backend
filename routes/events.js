/**
 * Eventos: deben estar previamente validados
 *
 */

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const isDate = require("../helpers/isDate");

// Validar token previamente
router.use(validarJWT);

// Rutas

router.get("/", getEventos);

router.post(
  "/",
  [
    // validaciones a través de middleware (express-validator)
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de fin es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

router.put("/:id", actualizarEvento);

router.delete("/:id", eliminarEvento);

module.exports = router;
