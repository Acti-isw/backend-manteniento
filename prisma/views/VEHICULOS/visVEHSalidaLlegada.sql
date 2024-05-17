SELECT
  RL.idSolicitud,
  FORMAT(RL.fecha, 'yyyy-MM-dd') AS fechaSalida,
  FORMAT(L.fecha, 'yyyy-MM-dd') AS fechaLlegada,
  CONVERT(VARCHAR(5), RL.fecha, 108) AS horaSalida,
  CONVERT(VARCHAR(5), L.fecha, 108) AS horaLlegada,
  RL.nombreSolicitante,
  RL.departamento,
  RL.isLocal,
  RL.destino,
  RL.chofer,
  V.Nombre AS vehiculo,
  RL.placa,
  RL.licencia,
  RL.kilometraje AS kilometrajeSalida,
  L.kilometraje AS kilometrajeLlegada,
  RL.tanque AS tanqueSalida,
  L.tanque AS tanqueLlegada,
  RL.nombreVigilante AS nombreVigilanteSalida,
  L.nombreVigilante AS nombreVigilanteLlegada,
  RL.firmaVigilante AS firmaVigilanteSalida,
  RL.firmaSolicitante AS firmaSolicitanteSalida,
  L.firmaVigilante AS firmaVigilanteLlegada,
  L.firmaSolicitante AS firmaSolicitanteLlegada,
  RL.observaciones AS observacionesSalida,
  L.observaciones AS observacionesLlegada
FROM
  [ALMACEN_GENERAL].[VEHICULOS].[VEHRegistroSalidaLlegada] AS RL
  JOIN [VEHICULOS].[VEHRegistroSalidaLlegada] AS L ON RL.idSolicitud = L.idSolicitud
  LEFT JOIN [VEHICULOS].[VEHSolicitudApartados] AS SA ON RL.idSolicitud = SA.idSolicitud
  LEFT JOIN VEHICULOS.VEHVehiculos AS V ON SA.idVehiculo = V.idVehiculo
WHERE
  RL.isSalida = 1
  AND L.isSalida = 0;