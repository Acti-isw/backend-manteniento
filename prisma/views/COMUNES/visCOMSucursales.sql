SELECT
  A.idSucursal,
  A.idCiudad,
  B.NombreCiudad,
  A.NombreSucursal,
  A.Direccion,
  A.Telefono1,
  A.Telefono2,
  A.Fax1,
  A.Fax2,
  A.Descripcion,
  A.XDEFAULT,
  A.ELIMINADO,
  CASE
    WHEN A.XDEFAULT = 1 THEN 'Si'
    ELSE 'No'
  END AS DESCXDEFAULT,
  A.DESISTEMA,
  CASE
    WHEN A.DESISTEMA = 1 THEN 'Si'
    ELSE 'No'
  END AS DESCDESISTEMA,
  A.IDUSUARIO,
  A.FECHAHORACAMBIO
FROM
  COMUNES.COMSucursales AS A
  JOIN COMUNES.COMCiudades AS B ON A.idCiudad = B.idCiudad;