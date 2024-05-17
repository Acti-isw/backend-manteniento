SELECT
  RECURSOSHUMANOS.RHInstitucionesEgreso.idInstitucion,
  RECURSOSHUMANOS.RHInstitucionesEgreso.NombreInstitucion,
  RECURSOSHUMANOS.RHInstitucionesEgreso.idCiudad,
  RECURSOSHUMANOS.RHInstitucionesEgreso.Descripcion,
  RECURSOSHUMANOS.RHInstitucionesEgreso.IDUSUARIO,
  RECURSOSHUMANOS.RHInstitucionesEgreso.FECHAHORACAMBIO,
  RECURSOSHUMANOS.RHInstitucionesEgreso.XDEFAULT,
  RECURSOSHUMANOS.RHInstitucionesEgreso.ELIMINADO,
  COMUNES.COMCiudades.NombreCiudad
FROM
  RECURSOSHUMANOS.RHInstitucionesEgreso
  JOIN COMUNES.COMCiudades ON RECURSOSHUMANOS.RHInstitucionesEgreso.idCiudad = COMUNES.COMCiudades.idCiudad;