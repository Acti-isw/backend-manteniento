SELECT
  sei.idSalidaEntradaItem,
  sei.idItem,
  ite.nombre AS nombreItem,
  sei.motivo,
  sei.stockAnterior,
  sei.stockActual,
  sei.idEmpleado,
  sei.idUsuario,
  sei.createAT,
  sei.isSalida
FROM
  [dbo].[SalidaEntradaItem] AS sei
  LEFT JOIN [dbo].[Item] AS ite ON ite.idItem = sei.idItem
  LEFT JOIN Usuarios AS usu ON sei.idUsuario = usu.idUsuario
WHERE
  ite.isDelete = 0;