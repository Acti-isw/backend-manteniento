SELECT
  A.idDepartamento,
  A.idArea,
  B.NombreArea,
  A.NombreDepartamento,
  A.Referencia,
  A.Descripcion,
  A.ELIMINADO,
  (
    CASE
      A.ELIMINADO
      WHEN 0 THEN 'No'
      WHEN 1 THEN 'Si'
    END
  ) AS DESELIMINADO,
  A.IDUSUARIO,
  A.FECHAHORACAMBIO
FROM
  RECURSOSHUMANOS.RHDepartamentos AS A
  JOIN RECURSOSHUMANOS.RHAreasDeptos AS B ON A.idArea = B.IdArea
WHERE
  A.ELIMINADO = 0;