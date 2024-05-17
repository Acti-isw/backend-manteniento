SELECT
  sei.idSalidaEntradaItem,
  sei.idItem,
  ite.nombre AS nombreItem,
  sei.stockAnterior,
  sei.stockActual,
  sei.idUsuario,
  sei.createAT
FROM
  [INVENTARIOMTTO].[INVSalidaEntradaItem] AS sei
  LEFT JOIN [INVENTARIOMTTO].[INVItem] AS ite ON ite.idItem = sei.idItem
  LEFT JOIN [INVENTARIOMTTO].[INVUsuarios] AS usu ON sei.idUsuario = usu.idUsuario
WHERE
  ite.isDelete = 0;