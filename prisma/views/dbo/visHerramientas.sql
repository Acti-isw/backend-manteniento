SELECT
  her.idHerramientas,
  her.nombre,
  her.descripcion,
  her.imagen,
  her.idCategoria,
  her.codigoItson,
  her.disponible,
  cat.nombre AS nombreCategoria,
  her.createAT,
  her.updateAT,
  her.isDelete
FROM
  [dbo].Herramientas AS her
  JOIN [dbo].[Categoria] AS cat ON cat.idCategoria = her.idCategoria
WHERE
  her.isDelete = 0;