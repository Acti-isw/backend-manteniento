SELECT
  ssl.idSolicitud,
  ssl.isSalida,
  a.nombre AS accesorio,
  ssl.seEncuentra
FROM
  [VEHICULOS].[VEHAccesoriosSalidaLlegada] AS ssl
  JOIN [VEHICULOS].[VEHAccesorios] AS a ON ssl.idAccesorio = a.idAccesorio;