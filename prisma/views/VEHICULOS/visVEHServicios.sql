SELECT
  VEHICULOS.VEHServicios.*,
  VEHICULOS.VEHTiposServicios.NombreTipoServicio
FROM
  VEHICULOS.VEHServicios
  JOIN VEHICULOS.VEHTiposServicios ON VEHICULOS.VEHServicios.idTipoServicio = VEHICULOS.VEHTiposServicios.idTipoServicio;