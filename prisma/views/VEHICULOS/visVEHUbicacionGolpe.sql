SELECT
  ug.idSolicitud,
  c.isSalida,
  ug.x,
  ug.y,
  ug.width,
  ug.height
FROM
  VEHICULOS.VEHUbicacionGolpe AS ug
  JOIN VEHICULOS.VEHCarroceria AS c ON ug.idCarroceria = c.idCarroceria;