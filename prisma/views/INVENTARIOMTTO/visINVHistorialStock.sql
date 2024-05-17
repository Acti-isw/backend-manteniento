SELECT
  his.idHistorialStock,
  itm.idItem,
  acc.idAccion,
  his.idEmpleado,
  usu.idUsuario,
  his.stockAnterior,
  his.stockNuevo,
  itm.nombre AS nombreItem,
  acc.nombre AS nombreAccion,
  usu.usuario AS nombreUsuario,
  his.motivo,
  his.fecha
FROM
  [INVENTARIOMTTO].[INVHistorialStock] AS his
  LEFT JOIN [INVENTARIOMTTO].[INVAccionesStock] AS acc ON his.idAccion = acc.idAccion
  LEFT JOIN [INVENTARIOMTTO].[INVUsuarios] AS usu ON his.idUsuario = usu.idUsuario
  LEFT JOIN [INVENTARIOMTTO].[INVItem] AS itm ON his.idItem = itm.idItem;