SELECT
  a.idEmpleado,
  a.IdCiudad,
  a.idEstadoCivil,
  a.Nombres,
  a.Apellidos,
  a.Nombres + ' ' + a.Apellidos AS NombreEmpleado,
  b.NombreCiudad,
  a.CURP,
  a.IMSS,
  a.Domicilio,
  a.Localidad,
  a.Colonia,
  a.FechaNacimiento,
  MONTH(a.FechaNacimiento) AS mes,
  h.NombreMes,
  a.InformarA,
  a.Telefono1,
  a.Telefono2,
  a.TipoSangineo,
  a.UMF,
  a.Alergias,
  a.RFC,
  a.idPuesto,
  e.NombrePuesto,
  a.idHorario,
  a.HDefault,
  f.NombreHorario,
  a.idDepartamento,
  g.NombreDepartamento,
  a.XDEFAULT,
  CASE
    a.XDEFAULT
    WHEN 0 THEN 'No'
    WHEN 1 THEN 'Si'
  END AS DESXDefault,
  a.ELIMINADO,
  CASE
    a.ELIMINADO
    WHEN 0 THEN 'No'
    WHEN 1 THEN 'Si'
  END AS DESELIMINADO,
  a.IDUSUARIO,
  a.FECHAHORACAMBIO,
  a.Email,
  a.Extension,
  i.NombreEstadoC
FROM
  RECURSOSHUMANOS.RHEmpleados AS a
  JOIN COMUNES.COMCiudades AS b ON b.idCiudad = a.IdCiudad
  JOIN RECURSOSHUMANOS.RHPuestos AS e ON e.idPUESTO = a.idPuesto
  JOIN RECURSOSHUMANOS.RHHorarios AS f ON f.idHorario = a.idHorario
  JOIN RECURSOSHUMANOS.RHDepartamentos AS g ON g.idDepartamento = a.idDepartamento
  JOIN COMUNES.COMMesesAno AS h ON h.idMes = MONTH(a.FechaNacimiento)
  JOIN RECURSOSHUMANOS.RHEstadosCiviles AS i ON a.idEstadoCivil = i.idEstadoCivil;