SELECT
  seh.idSalidaEntradaHerramientas,
  ite.nombre,
  seh.idEmpleado
FROM
  [dbo].[Herramientas] AS her
  JOIN [dbo].[SalidaEntradaHerramientas] AS seh ON seh.idHerramientas = her.idHerramientas
  JOIN [dbo].[Item] AS ite ON ite.idItem = her.idItem
WHERE
  her.isDelete = 0;
