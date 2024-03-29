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
  HistorialStock AS his
  LEFT JOIN AccionesStock AS acc ON his.idAccion = acc.idAccion
  LEFT JOIN Usuarios AS usu ON his.idUsuario = usu.idUsuario
  LEFT JOIN Item AS itm ON his.idItem = itm.idItem;