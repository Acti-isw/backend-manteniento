SELECT
  idTipoServicio,
  NombreTipoServicio,
  Descripcion,
  [DEFAULT],
  ELIMINADO,
  IDUSUARIO,
  FECHAHORACAMBIO,
  DESISTEMA
FROM
  VEHICULOS.VEHTiposServicios
WHERE
  (ELIMINADO = 0);