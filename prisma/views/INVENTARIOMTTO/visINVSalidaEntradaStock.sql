SELECT
  ses.*,
  usu.usuario
FROM
  [INVENTARIOMTTO].[INVSalidaEntradaStock] AS ses
  LEFT JOIN [INVENTARIOMTTO].[INVUsuarios] AS usu ON ses.idUsuario = usu.idUsuario;