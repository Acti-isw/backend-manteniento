SELECT
  ite.idItem,
  ite.nombre,
  ite.descripcion,
  ite.imagen,
  ite.idCategoria,
  ite.idUnidad,
  ite.active,
  und.nombre AS nombreUnidad,
  cat.nombre AS nombreCategoria,
  ite.createAT,
  ite.updateAT,
  ite.isDelete
FROM
  [INVENTARIOMTTO].[INVItem] AS ite
  JOIN [INVENTARIOMTTO].[INVCategoria] AS cat ON cat.idCategoria = ite.idCategoria
  JOIN [INVENTARIOMTTO].[INVUnidades] AS und ON und.idUnidad = ite.idUnidad
WHERE
  ite.isDelete = 0;