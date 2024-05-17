SELECT
  a.idCiudad,
  a.NombreCiudad,
  a.idZona,
  c.NombreZona,
  a.XDEFAULT,
  CASE
    WHEN a.XDEFAULT = 1 THEN 'Si'
    ELSE 'No'
  END AS DesDEFAULT,
  a.IDUSUARIO,
  a.ELIMINADO,
  CASE
    WHEN a.ELIMINADO = 1 THEN 'Si'
    ELSE 'No'
  END AS DesELIMINADO,
  a.FECHAHORACAMBIO,
  a.idMunicipio,
  COMUNES.COMMunicipios.NombreMunicipio,
  COMUNES.COMEstados.idEstado,
  COMUNES.COMEstados.NombreEstado
FROM
  COMUNES.COMCiudades AS a
  JOIN COMUNES.COMZonas AS c ON a.idZona = c.idZona
  JOIN COMUNES.COMMunicipios ON a.idMunicipio = COMUNES.COMMunicipios.idMunicipio
  JOIN COMUNES.COMEstados ON COMUNES.COMMunicipios.idEstado = COMUNES.COMEstados.idEstado;