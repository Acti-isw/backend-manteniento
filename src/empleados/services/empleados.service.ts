import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Empleados, Unidades } from '@prisma/client';
import { isEmpty } from 'lodash';
import { EmpleadosDTO, EmpleadosUpdateDTO } from '../dto/empleados.dto';

@Injectable()
export class EmpleadosService {
  constructor(private readonly prisma: PrismaService) {}

  async createEmployee(empleado: EmpleadosDTO): Promise<Empleados> {
    return await this.prisma.empleados.create({
      data: empleado,
    });
  }

  async updateEmployee(empleado: EmpleadosUpdateDTO): Promise<Empleados> {
    const { idEmpleado, ...dataToUpdate } = empleado;
    return await this.prisma.empleados.update({
      where: { idEmpleado },
      data: {
        ...dataToUpdate,
        updateAT: new Date(),
      },
    });
  }

  async findEmployee(): Promise<Empleados[]> {
    const employees = await this.prisma.empleados.findMany();
    if (isEmpty(employees)) {
      throw new NotFoundException('No se encontraron Empleados');
    }
    return employees;
  }

  async findEmployeeById(id: number): Promise<Unidades> {
    const unidad = await this.prisma.unidades.findFirst({
      where: { idUnidad: id },
    });

    if (!unidad) {
      throw new NotFoundException(`No se encontro el empleado con id:${id}`);
    }
    return unidad;
  }

  async deleteEmployee(idEmpleado: number): Promise<Empleados> {
    return await this.prisma.empleados.update({
      where: {
        idEmpleado: idEmpleado,
      },
      data: {
        isDelete: true,
        updateAT: new Date(),
      },
    });
  }

  async countEmpleados(): Promise<number> {
    return await this.prisma.empleados.count({
      where: { isDelete: false },
    });
  }
}
