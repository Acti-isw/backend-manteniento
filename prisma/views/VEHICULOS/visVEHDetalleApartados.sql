SELECT
  a.idSolicitud,
  k.IdCosto,
  k.Costo,
  l.NombreCosto
FROM
  VEHICULOS.VEHChoferes AS d
  JOIN RECURSOSHUMANOS.RHEmpleados AS e ON d.idEmpleado = e.idEmpleado
  RIGHT JOIN VEHICULOS.VEHSolicitudApartados AS a
  JOIN VEHICULOS.VEHVehiculos AS b ON a.idVehiculo = b.idVehiculo
  JOIN VEHICULOS.VEHEstadosSolicitud AS i ON a.idEstadoSolicitud = i.idEstadoSolicitud
  JOIN VEHICULOS.VEHTiposVehiculos AS c ON b.idTipoVehiculo = c.idTipoVehiculo
  JOIN VEHICULOS.VEHDestinos AS h ON a.idDestino = h.idDestino
  LEFT JOIN SISTEMA.SYSUsuarioEmpleado AS f
  JOIN RECURSOSHUMANOS.RHEmpleados AS g ON f.idEmpleado = g.idEmpleado;