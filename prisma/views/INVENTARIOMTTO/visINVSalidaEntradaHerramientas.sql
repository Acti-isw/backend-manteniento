SELECT
  seh.idSalidaEntradaHerramientas,
  her.nombre,
  seh.idEmpleado,
  seh.motivo,
  seh.isSalida,
  seh.createAT,
  seh.idUsuario
FROM
  [INVENTARIOMTTO].[INVHerramientas] AS her
  JOIN [INVENTARIOMTTO].[INVSalidaEntradaHerramientas] AS seh ON seh.idHerramientas = her.idHerramientas
WHERE
  her.isDelete = 0;