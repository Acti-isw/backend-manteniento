SELECT
  a.idAlmacen,
  a.NombreAlmacen,
  a.XDEFAULT,
  a.Descripcion,
  a.idProceso,
  C.NombreProceso,
  a.idTipoAlmacen,
  B.NombreTipoAlmacen,
  a.IDUSUARIO,
  a.DESISTEMA,
  a.ELIMINADO,
  a.FECHAHORACAMBIO,
  a.idSucursal,
  COMUNES.COMSucursales.NombreSucursal
FROM
  COMUNES.COMAlmacenes AS a
  JOIN COMUNES.COMTiposDeAlmacenes AS B ON a.idTipoAlmacen = B.idTipoAlmacen
  JOIN COMUNES.COMLugarProcesoAlmacen AS C ON C.idProceso = a.idProceso
  JOIN COMUNES.COMSucursales ON a.idSucursal = COMUNES.COMSucursales.idSucursal;