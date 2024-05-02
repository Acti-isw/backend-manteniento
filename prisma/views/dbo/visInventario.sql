SELECT
  inv.idInventario,
  ite.idItem,
  cat.idCategoria,
  und.idUnidad,
  ite.nombre,
  ite.descripcion,
  ite.imagen,
  ite.active,
  und.nombre AS nombreUnidad,
  cat.nombre AS nombreCategoria,
  inv.stockActual,
  inv.stockMin,
  inv.stockMax,
  inv.createAT
FROM
  [dbo].[item] AS ite
  LEFT JOIN [dbo].[Inventario] AS inv ON ite.idItem = inv.idItem
  LEFT JOIN [dbo].[Unidades] AS und ON und.idUnidad = ite.idUnidad
  LEFT JOIN [dbo].[Categoria] AS cat ON cat.idCategoria = ite.idCategoria
WHERE
  ite.isDelete = 1
  AND ite.active = 1;