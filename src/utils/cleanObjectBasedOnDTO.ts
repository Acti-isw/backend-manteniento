import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

// Define una función para limpiar un objeto según un DTO
export function cleanObjectBasedOnDTO<T extends object>(
  dtoClass: new () => T,
  object: any,
): T {
  const cleanObject = {} as T; // Crea un objeto limpio del tipo T
  // Transforma el objeto en una instancia del DTO
  const plainClass = plainToClass(dtoClass, object);

  // Obtiene las propiedades del objeto que llego
  const objProperties = Object.getOwnPropertyNames(plainClass);
  console.log('objProperties', objProperties);

  // Itera sobre las propiedades del objeto y copia solo aquellas que existan en el DTO
  console.log('dtoClass', dtoClass);
  objProperties.forEach((key) => {
    if (key in dtoClass) {
      cleanObject[key] = object[key];
    }
  });
  console.log('cleanObject', cleanObject);

  // Valida la instancia del DTO
  const cleanDTO = plainToClass(dtoClass, cleanObject);
  const errors = validateSync(cleanDTO, { skipMissingProperties: true });

  // Si hay errores de validación, lanza una excepción
  if (errors.length > 0) {
    throw new Error(
      `El objeto proporcionado no coincide con el DTO: ${errors.toString()}`,
    );
  }

  //Devuelve el objeto limpio validado
  return cleanDTO;
}
