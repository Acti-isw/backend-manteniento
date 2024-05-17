SELECT
  A.idAlmacen AS idAlmacen,
  A.idSucursal AS idSucursal,
  B.NombreAlmacen AS NombreAlmacen,
  C.NombreTipoAlmacen AS NombreTipoAlmacen
FROM
  COMUNES.COMSucursalAlmacenes AS A
  JOIN COMUNES.COMAlmacenes AS B ON A.idAlmacen = B.idAlmacen
  JOIN COMUNES.COMTipoAlmacenesParaSucursal AS C ON A.idTipoAlmacenSurcursal = C.idTipoAlmacenParaSucursal;