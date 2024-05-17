SELECT
  ISNULL(I.Costo, 0) AS Costo,
  J.idCosto,
  J.NombreCosto,
  J.idDestino,
  J.NombreDestino,
  J.idVehiculo,
  J.Nombre AS NombreVehiculo,
  J.idTipoVehiculo,
  J.NombreTipoVehiculo
FROM
  VEHICULOS.VEHCostosDestinos AS I
  RIGHT JOIN (
    SELECT
      X.idCosto,
      X.NombreCosto,
      X.idDestino,
      X.NombreDestino,
      X.idVehiculo,
      X.Nombre,
      X.idTipoVehiculo,
      Y.NombreTipoVehiculo
    FROM
      (
        SELECT
          A.idCosto,
          A.NombreCosto,
          B.idDestino,
          B.NombreDestino,
          C.idVehiculo,
          C.Nombre,
          C.idTipoVehiculo
        FROM
          VEHICULOS.VEHCostos AS A
          CROSS JOIN VEHICULOS.VEHDestinos AS B
          CROSS JOIN VEHICULOS.VEHVehiculos AS C
        WHERE
          (A.ELIMINADO = 0)
          AND (B.ELIMINADO = 0)
          AND (C.ELIMINADO = 0)
      ) AS X
      JOIN VEHICULOS.VEHTiposVehiculos AS Y ON Y.idTipoVehiculo = X.idTipoVehiculo
  ) AS J ON J.idCosto = I.idCosto
  AND J.idDestino = I.idDestino
  AND J.idVehiculo = I.idVehiculo;