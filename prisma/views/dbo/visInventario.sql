SELECT
  inv.idInventario,
  ite.nombre AS nombreItem,
  ite.descripcion,
  ite.imagen,
  und.nombre AS nombreUnidad,
  cat.nombre AS nombreCategoria,
  inv.stockActual,
  inv.stockMin,
  inv.stockMax
FROM
  [dbo].[Inventario] AS inv
  JOIN [dbo].[Item] AS ite ON ite.idItem = inv.idItem
  JOIN [dbo].[Unidades] AS und ON und.idUnidad = ite.idUnidad
  JOIN [dbo].[Categoria] AS cat ON cat.idCategoria = ite.idCategoria
WHERE
  inv.isDelete = 0;