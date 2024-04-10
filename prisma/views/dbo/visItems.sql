SELECT
  ite.idItem,
  ite.nombre AS nombreItem,
  ite.descripcion,
  ite.imagen,
  und.nombre AS nombreUnidad,
  cat.nombre AS nombreCategoria,
  ite.isDelete
FROM
  dbo.Item AS ite
  JOIN dbo.Categoria AS cat ON cat.idCategoria = ite.idCategoria
  JOIN dbo.Unidades AS und ON und.idUnidad = ite.idUnidad
WHERE
  (ite.isDelete = 0);