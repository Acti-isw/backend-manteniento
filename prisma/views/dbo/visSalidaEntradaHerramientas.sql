SELECT
  seh.idSalidaEntradaHerramientas,
  seh.createAT,
  seh.motivo,
  her.idHerramientas,
  her.nombre,
  her.codigoItson,
  her.imagen,
  her.descripcion,
  her.disponible,
  her.isDelete,
  cat.nombre AS nombreCategoria,
  cat.idCategoria,
  seh.idEmpleado,
  emp.Nombre + ' ' + emp.ApellidoPaterno + ' ' + emp.ApellidoMaterno AS nombreEmpleado,
  seh.isSalida,
  seh.idUsuario,
  usu.usuario
FROM
  [dbo].[Herramientas] AS her
  LEFT JOIN (
    SELECT
      idHerramientas,
      MAX(createAT) AS max_createAT
    FROM
      [dbo].[SalidaEntradaHerramientas]
    GROUP BY
      idHerramientas
  ) AS max_seh ON her.idHerramientas = max_seh.idHerramientas
  LEFT JOIN [dbo].[SalidaEntradaHerramientas] AS seh ON seh.idHerramientas = max_seh.idHerramientas
  AND seh.createAT = max_seh.max_createAT
  LEFT JOIN [dbo].Categoria AS cat ON cat.idCategoria = her.idCategoria
  LEFT JOIN [dbo].Usuarios AS usu ON usu.idUsuario = seh.idUsuario
  LEFT JOIN [dbo].Empleados AS emp ON emp.idEmpleado = seh.idEmpleado
WHERE
  her.isDelete = 0;