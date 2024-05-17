SELECT
  a.IdSucursal,
  a.idConstruccion,
  a.NombreConstruccion,
  a.Descripcion,
  a.ELIMINADO,
  CASE
    a.eliminado
    WHEN 0 THEN 'No'
    WHEN 1 THEN 'Si'
  END AS DESEliminado,
  a.IDUSUARIO,
  a.FECHAHORACAMBIO,
  c.NombreSucursal
FROM
  COMUNES.COMConstrucciones AS a
  JOIN COMUNES.COMSucursales AS c ON c.idSucursal = a.IdSucursal;