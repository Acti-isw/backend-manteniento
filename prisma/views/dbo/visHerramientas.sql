SELECT
  her.idHerramientas,
  ite.nombre,
  her.codigoItson,
  her.disponible
FROM
  [dbo].[Herramientas] AS her
  JOIN [dbo].[Item] AS ite ON ite.idItem = her.idItem
WHERE
  her.isDelete = 0;