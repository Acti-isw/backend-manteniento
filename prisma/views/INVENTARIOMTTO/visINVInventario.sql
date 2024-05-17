SELECT
  inv.idInventario,
  ite.idItem,
  cat.idCategoria,
  und.idUnidad,
  ite.nombre,
  ite.descripcion,
  ite.imagen,
  und.nombre AS nombreUnidad,
  cat.nombre AS nombreCategoria,
  inv.stockActual,
  inv.stockMin,
  inv.stockMax,
  inv.createAT AS fecha
FROM
  [INVENTARIOMTTO].[INVItem] AS ite
  JOIN [INVENTARIOMTTO].[INVInventario] AS inv ON ite.idItem = inv.idItem
  JOIN [INVENTARIOMTTO].[INVUnidades] AS und ON und.idUnidad = ite.idUnidad
  JOIN [INVENTARIOMTTO].[INVCategoria] AS cat ON cat.idCategoria = ite.idCategoria
WHERE
  ite.isDelete = 0
  AND ite.active = 1;