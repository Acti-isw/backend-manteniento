SELECT
  A.idPaqueteCapacitacion,
  A.idTipoCapacitacion,
  A.NombrePaqueteCap,
  A.Descripcion,
  A.ELIMINADO,
  A.IDUSUARIO,
  A.FECHAHORACAMBIO,
  A.IDEQUIPO,
  A.XDEFAULT,
  B.NombreTipoCapacitacion
FROM
  RECURSOSHUMANOS.RHPaquetesCapacitacion AS A
  JOIN RECURSOSHUMANOS.RHTiposCapacitacion AS B ON A.idTipoCapacitacion = B.idTipoCapacitacion;