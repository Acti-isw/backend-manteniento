SELECT
  sei.idSalidaEntradaItem,
  hs.idItem,
  i.nombre AS nombreItem,
  hs.motivo,
  sei.idEmpleado AS empleado,
  u.nombreCompleto AS nombreUsuario,
  hs.stockAnterior AS stockInicial,
  hs.stockNuevo AS stockActual,
  sei.isSalida,
  sei.createAT
FROM
  SalidaEntradaItem AS sei
  JOIN HistorialStock AS hs ON sei.idSalidaEntradaItem = hs.idSalidaEntradaItem
  JOIN Item AS i ON hs.idItem = i.idItem
  JOIN Usuarios AS u ON sei.idUsuario = u.idUsuario;