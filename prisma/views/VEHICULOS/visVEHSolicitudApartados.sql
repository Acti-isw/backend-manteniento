SELECT
  a.idSolicitud,
  a.idVehiculo,
  a.idEstadoSolicitud,
  a.NumeroPasajeros,
  a.idEmpleado,
  a.idChofer,
  a.SolicitarChofer,
  a.Responsable,
  VEHICULOS.fnVEHNombreResponsable(a.Responsable) AS NombreResponsable,
  a.idDestino,
  a.Justificacion,
  a.Observaciones,
  a.Fecha,
  a.FechaSalida,
  a.FechaRegreso,
  a.idUsuarioApartado,
  a.IDUSUARIO,
  a.FECHAHORACAMBIO,
  b.Nombre AS NombreVehiculo,
  i.NombreEstadoSolicitud,
  c.NombreTipoVehiculo,
  b.idTipoVehiculo,
  e.Nombres AS NombresChofer,
  e.Apellidos AS ApellidosChofer,
  g.Nombres AS NombresEmpleado,
  g.Apellidos AS ApellidosEmpleado,
  g.Nombres + ' ' + g.Apellidos AS NombreEmpleado,
  e.Nombres + ' ' + e.Apellidos AS NombreChofer,
  VEHICULOS.fn_VEHCostoTotal(a.idSolicitud) AS CostoTotal,
  (
    CASE
      a.idDestino
      WHEN 0 THEN a.OtroDestino
      ELSE h.NombreDestino
    END
  ) AS NombreDestino,
  a.CalificacionApartado
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