SELECT
  VEHICULOS.VEHChoferes.*,
  RECURSOSHUMANOS.RHEmpleados.Nombres,
  RECURSOSHUMANOS.RHEmpleados.Apellidos,
  (
    RECURSOSHUMANOS.RHEmpleados.Nombres + ' ' + RECURSOSHUMANOS.RHEmpleados.Apellidos
  ) AS NombreCompleto
FROM
  VEHICULOS.VEHChoferes
  JOIN RECURSOSHUMANOS.RHEmpleados ON VEHICULOS.VEHChoferes.idEmpleado = RECURSOSHUMANOS.RHEmpleados.idEmpleado;