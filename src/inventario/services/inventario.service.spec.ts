import { Test, TestingModule } from '@nestjs/testing';
import { InventarioService } from './inventario.service';
import { PrismaService } from '../../prisma/prisma.service';

import { NotFoundException } from '@nestjs/common';
import { InventarioDTO } from '../dto/inventario.dto';

describe('InventarioService', () => {
  let service: InventarioService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventarioService,
        {
          provide: PrismaService,
          useValue: {
            inventario: {
              create: jest.fn(), // Inicializamos como un mock
              update: jest.fn(),
            },
            visInventario: {
              findMany: jest.fn(),
              findFirst: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<InventarioService>(InventarioService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createInventory', () => {
    it('should create an inventory', async () => {
      const inventarioDTO = {
        /* datos de ejemplo */
      };
      (prisma.inventario.create as jest.Mock).mockResolvedValue(inventarioDTO);

      expect(
        await service.createInventory(inventarioDTO as InventarioDTO),
      ).toEqual(inventarioDTO);
      expect(prisma.inventario.create).toHaveBeenCalledWith({
        data: inventarioDTO,
      });
    });
  });

  describe('findInventoryById', () => {
    it('should return an inventory if found', async () => {
      const mockInventory = { idInventario: 1 };
      (prisma.visInventario.findFirst as jest.Mock).mockResolvedValue(
        mockInventory,
      );

      expect(await service.findInventoryById(1)).toEqual(mockInventory);
    });

    it('should throw NotFoundException if no inventory is found', async () => {
      (prisma.visInventario.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.findInventoryById(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateInventory', () => {
    it('should update an inventory', async () => {
      const inventarioDTO = {
        idInventario: 1,
        idItem: 2,
        stockActual: 50,
        stockMin: 10,
        stockMax: 100,
        isDelete: false,
        idUsuario: 3,
        createAT: new Date(),
        updateAT: new Date(),
      };

      (prisma.inventario.update as jest.Mock).mockResolvedValue({
        ...inventarioDTO,
        updateAT: new Date(),
      });

      const updatedInventory = await service.updateInventory(
        inventarioDTO as InventarioDTO,
      );

      expect(updatedInventory).toEqual({
        ...inventarioDTO,
        updateAT: expect.any(Date),
      });
      expect(prisma.inventario.update).toHaveBeenCalledWith({
        where: { idInventario: inventarioDTO.idInventario },
        data: expect.objectContaining({
          idItem: inventarioDTO.idItem,
          stockActual: inventarioDTO.stockActual,
          stockMin: inventarioDTO.stockMin,
          stockMax: inventarioDTO.stockMax,
          isDelete: inventarioDTO.isDelete,
          idUsuario: inventarioDTO.idUsuario,
          updateAT: expect.any(Date),
        }),
      });
    });
  });

  describe('deleteInventory', () => {
    it('should mark an inventory as deleted', async () => {
      const mockInventory = {
        idInventario: 1,
        isDelete: true,
        updateAT: new Date(),
      };

      (prisma.inventario.update as jest.Mock).mockResolvedValue(mockInventory);

      const result = await service.deleteInventory(1);

      expect(result).toEqual(mockInventory);
      expect(prisma.inventario.update).toHaveBeenCalledWith({
        where: { idInventario: 1 },
        data: {
          isDelete: true,
          updateAT: expect.any(Date),
        },
      });
    });
  });
});
