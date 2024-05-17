SELECT
  sa.idSolicitud,
  rh.Nombres + ' ' + rh.Apellidos AS nombreSolicitante,
  MAX(rsl.destino) AS destino,
  MAX(rsl.chofer) AS chofer,
  MAX(rsl.placa) AS placa,
  v.Nombre AS vehiculo,
  sa.Fecha AS fechaRegistro,
  sa.FechaSalida AS fechaSalida,
  sa.FechaRegreso AS fechaLlegada,
  es.NombreEstadoSolicitud AS estadoSolicitud,
  CASE
    WHEN COUNT(rsl.idSolicitud) = 0 THEN 'Pendiente'
    ELSE MAX(rsl.estado)
  END AS estado
FROM
  VEHICULOS.VEHSolicitudApartados AS sa
  LEFT JOIN VEHICULOS.VEHRegistroSalidaLlegada AS rsl ON sa.idSolicitud = rsl.idSolicitud
  JOIN VEHICULOS.VEHEstadosSolicitud AS es ON es.idEstadoSolicitud = sa.idEstadoSolicitud
  AND NombreEstadoSolicitud = 'Aceptada'
  LEFT JOIN VEHICULOS.VEHVehiculos AS v ON sa.idVehiculo = v.idVehiculo
  LEFT JOIN RECURSOSHUMANOS.RHEmpleados AS rh ON sa.idEmpleado = rh.idEmpleado
GROUP BY
  sa.idSolicitud,
  v.Nombre,
  sa.Fecha,
  sa.FechaSalida,
  sa.FechaRegreso,
  es.NombreEstadoSolicitud,
  rh.Nombres,
  rh.Apellidos;