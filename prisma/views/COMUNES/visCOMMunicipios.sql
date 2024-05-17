SELECT
  A.idMunicipio,
  A.idEstado,
  A.NombreMunicipio,
  A.FECHAHORACAMBIO,
  A.IDUSUARIO,
  A.XDEFAULT,
  B.NombreEstado
FROM
  COMUNES.COMMunicipios AS A
  JOIN COMUNES.COMEstados AS B ON B.idEstado = A.idEstado;