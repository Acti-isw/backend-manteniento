SELECT
  a.idLocalidad,
  a.idCiudad,
  b.NombreCiudad,
  a.NombreLocalidad,
  a.NombreCorto,
  a.Descripcion,
  a.ELIMINADO,
  CASE
    WHEN A.ELIMINADO = 0 THEN 'No'
    ELSE 'Si'
  END AS DESELIMINADO,
  a.XDEFAULT,
  CASE
    WHEN A.XDEFAULT = 0 THEN 'No'
    ELSE 'Si'
  END AS DESXDEFAULT,
  a.IDUSUARIO,
  a.FECHAHORACAMBIO,
  a.CodigoPostal,
  a.Referencia
FROM
  COMUNES.COMLocalidades AS a
  JOIN COMUNES.COMCiudades AS b ON a.idCiudad = b.idCiudad
WHERE
  (b.ELIMINADO = 0);