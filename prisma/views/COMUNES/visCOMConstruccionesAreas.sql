SELECT
  a.IdArea,
  a.IdConstruccion,
  a.NombreArea,
  a.Descripcion,
  a.ELIMINADO,
  a.IDUSUARIO,
  a.FECHAHORACAMBIO,
  b.NombreConstruccion
FROM
  COMUNES.COMConstruccionesAreas AS a
  JOIN COMUNES.COMConstrucciones AS b ON a.IdConstruccion = b.idConstruccion;