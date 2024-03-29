SELECT
  sei.idSalidaEntradaItem,
  sei.idItem,
  ite.nombre AS nombreItem,
  sei.idEmpleado
FROM
  [dbo].[SalidaEntradaItem] AS sei
  JOIN [dbo].[Item] AS ite ON ite.idItem = sei.idItem
WHERE
  ite.isDelete = 0;