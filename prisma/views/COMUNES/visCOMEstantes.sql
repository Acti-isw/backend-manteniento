SELECT
  A.CodigoEstante,
  A.Descripcion,
  A.ELIMINADO,
  A.FECHAHORACAMBIO,
  A.idAlmacen,
  A.IDEQUIPO,
  A.idEstante,
  A.IDUSUARIO,
  A.NombreEstante,
  B.NombreAlmacen
FROM
  COMUNES.COMEstantes AS A
  JOIN COMUNES.COMAlmacenes AS B ON A.idAlmacen = B.idAlmacen;