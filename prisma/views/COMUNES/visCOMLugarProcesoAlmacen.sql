SELECT
  a.idproceso,
  a.nombreproceso,
  a.posicionproceso,
  CASE
    a.eliminado
    WHEN 0 THEN 'NO'
    WHEN 1 THEN 'SI'
  END AS DESEliminado,
  CASE
    a.desistema
    WHEN 0 THEN 'NO'
    WHEN 1 THEN 'si'
  END AS DESSistema,
  a.eliminado,
  a.desistema,
  a.idusuario,
  a.fechahoracambio
FROM
  COMUNES.COMLugarProcesoAlmacen AS a
WHERE
  eliminado = 0;