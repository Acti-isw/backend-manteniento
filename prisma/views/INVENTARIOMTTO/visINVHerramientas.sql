SELECT
  her.idHerramientas,
  her.nombre,
  her.codigoItson,
  her.disponible,
  her.descripcion,
  her.imagen,
  cat.nombre AS nombreCategoria,
  her.createAT,
  her.updateAT,
  her.isDelete,
  her.idUsuario
FROM
  [INVENTARIOMTTO].[INVHerramientas] AS her
  JOIN [INVENTARIOMTTO].[INVCategoria] AS cat ON cat.idCategoria = her.idCategoria
WHERE
  her.isDelete = 0;