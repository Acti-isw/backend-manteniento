SELECT
  idUnidadMedida,
  Nombre,
  Fraccional,
  CASE
    Fraccional
    WHEN 0 THEN 'No'
    WHEN 1 THEN 'Si'
  END AS DESFRACCIONAL,
  maximofracciones,
  Eliminado,
  CASE
    Eliminado
    WHEN 0 THEN 'No'
    WHEN 1 THEN 'Si'
  END AS DESELIMINADO,
  XDefault,
  CASE
    XDefault
    WHEN 0 THEN 'No'
    WHEN 1 THEN 'Si'
  END AS DESXDEFAULT,
  IDUSUARIO,
  FECHAHORACAMBIO
FROM
  COMUNES.COMUNidadesdeMedida;