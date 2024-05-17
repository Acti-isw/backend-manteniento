SELECT
  a.idano,
  a.idmes,
  b.NombreMes
FROM
  COMUNES.COMAnoMes AS a
  JOIN COMUNES.COMMesesAno AS b ON b.idmes = a.idmes;