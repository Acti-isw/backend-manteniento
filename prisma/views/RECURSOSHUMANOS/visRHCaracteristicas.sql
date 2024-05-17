SELECT
  RECURSOSHUMANOS.RHCaracteristicas.idCaracteristica,
  RECURSOSHUMANOS.RHCaracteristicas.idGrupoCaracteristicas,
  RECURSOSHUMANOS.RHCaracteristicas.NombreCaracteristica,
  RECURSOSHUMANOS.RHCaracteristicas.Descripcion,
  RECURSOSHUMANOS.RHCaracteristicas.IDUSUARIO,
  RECURSOSHUMANOS.RHCaracteristicas.IDEQUIPO,
  RECURSOSHUMANOS.RHCaracteristicas.FECHAHORACAMBIO,
  RECURSOSHUMANOS.RHCaracteristicas.ELIMINADO,
  RECURSOSHUMANOS.RHGruposCaracteristicas.NombreGrupoCaracteristicas
FROM
  RECURSOSHUMANOS.RHCaracteristicas
  JOIN RECURSOSHUMANOS.RHGruposCaracteristicas ON RECURSOSHUMANOS.RHCaracteristicas.idGrupoCaracteristicas = RECURSOSHUMANOS.RHGruposCaracteristicas.idGrupoCaracteristicas;