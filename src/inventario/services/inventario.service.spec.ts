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
});
