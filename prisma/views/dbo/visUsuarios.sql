SELECT
  usu.idUsuario,
  usu.nombreCompleto,
  usu.usuario,
  usu.password,
  rol.nombre
FROM
  [dbo].[Usuarios] AS usu
  JOIN [dbo].[Role] AS rol ON rol.idRole = usu.idRole
WHERE
  usu.isDelete = 0;