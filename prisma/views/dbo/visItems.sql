SELECT
  ite.idItem,
  ite.nombre,
  ite.descripcion,
  ite.imagen,
  ite.idCategoria,
  ite.idUnidad,
  und.nombre AS nombreUnidad,
  cat.nombre AS nombreCategoria,
  ite.createAT,
  ite.updateAT,
  ite.isDelete
FROM
  [dbo].[Item] AS ite
  JOIN [dbo].[Categoria] AS cat ON cat.idCategoria = ite.idCategoria
  JOIN [dbo].[Unidades] AS und ON und.idUnidad = ite.idUnidad;