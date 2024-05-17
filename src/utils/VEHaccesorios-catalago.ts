import { IAccesorios } from 'src/VEHICULOS/accesorios-salida-llegada/interface/accesorios.interface';

export const accesoriosCatalogo: IAccesorios = {
  gato: 1,
  cables: 2,
  luzMuerta: 3,
  extintor: 4,
  documentos: 5,
  extra: 6,
};

export interface IAccesoriosSalLle {
  [nombre: string]: boolean;
}

