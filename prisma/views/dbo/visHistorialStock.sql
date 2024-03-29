SELECT
  his.idHistorialStock,
  itm.idItem,
  itm.nombre AS item,
  his.stockNuevo,
  his.stockAnterior,
  acc.nombre AS accion,
  usu.usuario
FROM
  dbo.HistorialStock AS his
  LEFT JOIN dbo.AccionesStock AS acc ON his.idAccion = acc.idAccion
  LEFT JOIN dbo.Usuarios AS usu ON his.idUsuario = usu.idUsuario
  LEFT JOIN dbo.Item AS itm ON his.idItem = itm.idItem;