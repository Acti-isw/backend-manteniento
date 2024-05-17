SELECT
  usu.idUsuario,
  usu.nombreCompleto,
  usu.usuario,
  usu.password,
  rol.nombre
FROM
  [INVENTARIOMTTO].[INVUsuarios] AS usu
  JOIN [INVENTARIOMTTO].[INVRole] AS rol ON rol.idRole = usu.idRole
WHERE
  usu.isDelete = 0;