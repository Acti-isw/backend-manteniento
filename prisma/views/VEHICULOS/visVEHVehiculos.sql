SELECT
  a.idVehiculo,
  a.Nombre,
  a.Descripcion,
  a.Placas,
  a.Modelo,
  a.Marca,
  a.Kilometraje,
  a.IdEstadoVehiculo,
  B.NombreEstado,
  a.IDUSUARIO,
  a.ELIMINADO,
  CASE
    WHEN a.ELIMINADO = 1 THEN 'Si'
    ELSE 'No'
  END AS DesELIMINADO,
  a.FECHAHORACAMBIO,
  a.MaximoPasajeros,
  a.idTipoVehiculo,
  VEHICULOS.VEHTiposVehiculos.NecesitaChofer
FROM
  VEHICULOS.VEHVehiculos AS a
  JOIN VEHICULOS.VEHEstadosVehiculos AS B ON a.IdEstadoVehiculo = B.idEstadoVehiculo
  JOIN VEHICULOS.VEHTiposVehiculos ON a.idTipoVehiculo = VEHICULOS.VEHTiposVehiculos.idTipoVehiculo;