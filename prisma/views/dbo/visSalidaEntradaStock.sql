SELECT
  ses.*,
  usu.usuario
FROM
  dbo.SalidaEntradaStock AS ses
  LEFT JOIN Usuarios AS usu ON ses.idUsuario = usu.idUsuario;