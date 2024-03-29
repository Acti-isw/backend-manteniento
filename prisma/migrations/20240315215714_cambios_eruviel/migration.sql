BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[AccionesStock] (
    [idAccion] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(100) NOT NULL,
    [createAT] DATETIME CONSTRAINT [DF__AccionesS__creat__6A30C649] DEFAULT CURRENT_TIMESTAMP,
    [updateAT] DATETIME,
    [isDelete] BIT CONSTRAINT [DF__AccionesS__isDel__6B24EA82] DEFAULT 0,
    [idUsuario] INT,
    CONSTRAINT [PK_idAccion] PRIMARY KEY CLUSTERED ([idAccion])
);

-- CreateTable
CREATE TABLE [dbo].[Categoria] (
    [idCategoria] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(100) NOT NULL,
    [createAT] DATETIME CONSTRAINT [DF__Categoria__creat__5441852A] DEFAULT CURRENT_TIMESTAMP,
    [updateAT] DATETIME,
    [isDelete] BIT CONSTRAINT [DF__Categoria__isDel__5535A963] DEFAULT 0,
    [idUsuario] INT NOT NULL,
    CONSTRAINT [PK_idCategoria] PRIMARY KEY CLUSTERED ([idCategoria])
);

-- CreateTable
CREATE TABLE [dbo].[Herramientas] (
    [idHerramientas] INT NOT NULL IDENTITY(1,1),
    [idItem] INT NOT NULL,
    [codigoItson] VARCHAR(50) NOT NULL,
    [disponible] BIT NOT NULL,
    [createAT] DATETIME CONSTRAINT [DF__Herramien__creat__75A278F5] DEFAULT CURRENT_TIMESTAMP,
    [updateAT] DATETIME,
    [isDelete] BIT CONSTRAINT [DF__Herramien__isDel__76969D2E] DEFAULT 0,
    [idUsuario] INT NOT NULL,
    CONSTRAINT [PK_idHerramientas] PRIMARY KEY CLUSTERED ([idHerramientas])
);

-- CreateTable
CREATE TABLE [dbo].[HistorialStock] (
    [idHistorialStock] INT NOT NULL IDENTITY(1,1),
    [stockAnterior] INT,
    [stockNuevo] INT NOT NULL,
    [idItem] INT NOT NULL,
    [idAccion] INT NOT NULL,
    [idUsuario] INT NOT NULL,
    [fecha] DATETIME NOT NULL CONSTRAINT [DF__Historial__fecha__71D1E811] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_idHistorialStock] PRIMARY KEY CLUSTERED ([idHistorialStock])
);

-- CreateTable
CREATE TABLE [dbo].[Inventario] (
    [idInventario] INT NOT NULL IDENTITY(1,1),
    [idItem] INT NOT NULL,
    [stockActual] INT NOT NULL,
    [stockMin] INT NOT NULL,
    [stockMax] INT NOT NULL,
    [createAT] DATETIME CONSTRAINT [DF__Inventari__creat__656C112C] DEFAULT CURRENT_TIMESTAMP,
    [updateAT] DATETIME,
    [isDelete] BIT CONSTRAINT [DF__Inventari__isDel__66603565] DEFAULT 0,
    [idUsuario] INT NOT NULL,
    CONSTRAINT [PK_idInventario] PRIMARY KEY CLUSTERED ([idInventario])
);

-- CreateTable
CREATE TABLE [dbo].[Item] (
    [idItem] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(100) NOT NULL,
    [descripcion] VARCHAR(100),
    [imagen] VARCHAR(100),
    [idUnidad] INT NOT NULL,
    [idCategoria] INT NOT NULL,
    [createAT] DATETIME CONSTRAINT [DF__Item__createAT__5FB337D6] DEFAULT CURRENT_TIMESTAMP,
    [updateAT] DATETIME,
    [isDelete] BIT CONSTRAINT [DF__Item__isDelete__60A75C0F] DEFAULT 0,
    [idUsuario] INT NOT NULL,
    CONSTRAINT [PK_idItem] PRIMARY KEY CLUSTERED ([idItem])
);

-- CreateTable
CREATE TABLE [dbo].[SalidaEntradaHerramientas] (
    [idSalidaEntradaHerramientas] INT NOT NULL IDENTITY(1,1),
    [idHerramientas] INT NOT NULL,
    [idEmpleado] INT,
    [motivo] VARCHAR(200) NOT NULL,
    [isSalida] BIT,
    [createAT] DATETIME CONSTRAINT [DF__SalidaEnt__creat__03F0984C] DEFAULT CURRENT_TIMESTAMP,
    [idUsuario] INT NOT NULL,
    CONSTRAINT [PK_idSalidaEntradaHerramientas] PRIMARY KEY CLUSTERED ([idSalidaEntradaHerramientas])
);

-- CreateTable
CREATE TABLE [dbo].[Unidades] (
    [idUnidad] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(100) NOT NULL,
    [createAT] DATETIME CONSTRAINT [DF__Unidades__create__59063A47] DEFAULT CURRENT_TIMESTAMP,
    [updateAT] DATETIME,
    [isDelete] BIT CONSTRAINT [DF__Unidades__isDele__59FA5E80] DEFAULT 0,
    [idUsuario] INT NOT NULL,
    CONSTRAINT [PK_idUnidad] PRIMARY KEY CLUSTERED ([idUnidad])
);

-- CreateTable
CREATE TABLE [dbo].[Usuarios] (
    [idUsuario] INT NOT NULL IDENTITY(1,1),
    [nombreCompleto] VARCHAR(60) NOT NULL,
    [usuario] VARCHAR(45) NOT NULL,
    [password] VARCHAR(100) NOT NULL,
    [idRole] INT,
    [createAT] DATETIME CONSTRAINT [DF__Usuarios__create__4F7CD00D] DEFAULT CURRENT_TIMESTAMP,
    [updateAT] DATETIME CONSTRAINT [DF__Usuarios__update__5070F446] DEFAULT CURRENT_TIMESTAMP,
    [isDelete] BIT CONSTRAINT [DF__Usuarios__isDele__5165187F] DEFAULT 0,
    CONSTRAINT [PK_idUsuarios] PRIMARY KEY CLUSTERED ([idUsuario])
);

-- CreateTable
CREATE TABLE [dbo].[Role] (
    [idRole] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(45),
    [createAT] DATETIME CONSTRAINT [DF__Role__createAT__49C3F6B7] DEFAULT CURRENT_TIMESTAMP,
    [updateAT] DATETIME CONSTRAINT [DF__Role__updateAT__4AB81AF0] DEFAULT CURRENT_TIMESTAMP,
    [isDelete] BIT CONSTRAINT [DF__Role__isDelete__4BAC3F29] DEFAULT 0,
    CONSTRAINT [PK_idRole] PRIMARY KEY CLUSTERED ([idRole])
);

-- CreateTable
CREATE TABLE [dbo].[sysdiagrams] (
    [name] NVARCHAR(128) NOT NULL,
    [principal_id] INT NOT NULL,
    [diagram_id] INT NOT NULL IDENTITY(1,1),
    [version] INT,
    [definition] VARBINARY(max),
    CONSTRAINT [PK__sysdiagr__C2B05B61C2D6580D] PRIMARY KEY CLUSTERED ([diagram_id]),
    CONSTRAINT [UK_principal_name] UNIQUE NONCLUSTERED ([principal_id],[name])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Herramientas_codigoItson] ON [dbo].[Herramientas]([codigoItson]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Herramientas_idItem] ON [dbo].[Herramientas]([idItem]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Inventario_idItem] ON [dbo].[Inventario]([idItem]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Item_idCategoria] ON [dbo].[Item]([idCategoria]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_Item_idUnidad] ON [dbo].[Item]([idUnidad]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_SalidaEntradaHerramientas_idEmpleado] ON [dbo].[SalidaEntradaHerramientas]([idEmpleado]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [IX_SalidaEntradaHerramientas_idHerramientas] ON [dbo].[SalidaEntradaHerramientas]([idHerramientas]);

-- AddForeignKey
ALTER TABLE [dbo].[AccionesStock] ADD CONSTRAINT [FK__AccionesS__idUsu__4CA06362] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuarios]([idUsuario]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Categoria] ADD CONSTRAINT [FK__Categoria__idUsu__46E78A0C] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuarios]([idUsuario]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Herramientas] ADD CONSTRAINT [FK__Herramien__idIte__5070F446] FOREIGN KEY ([idItem]) REFERENCES [dbo].[Item]([idItem]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Herramientas] ADD CONSTRAINT [FK__Herramien__idUsu__5165187F] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuarios]([idUsuario]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[HistorialStock] ADD CONSTRAINT [FK__Historial__idAcc__4E88ABD4] FOREIGN KEY ([idAccion]) REFERENCES [dbo].[AccionesStock]([idAccion]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[HistorialStock] ADD CONSTRAINT [FK__Historial__idIte__4D94879B] FOREIGN KEY ([idItem]) REFERENCES [dbo].[Item]([idItem]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[HistorialStock] ADD CONSTRAINT [FK__Historial__idUsu__4F7CD00D] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuarios]([idUsuario]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Inventario] ADD CONSTRAINT [FK__Inventari__idIte__4AB81AF0] FOREIGN KEY ([idItem]) REFERENCES [dbo].[Item]([idItem]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Inventario] ADD CONSTRAINT [FK__Inventari__idUsu__4BAC3F29] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuarios]([idUsuario]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Item] ADD CONSTRAINT [FK__Item__idCategori__49C3F6B7] FOREIGN KEY ([idCategoria]) REFERENCES [dbo].[Categoria]([idCategoria]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Item] ADD CONSTRAINT [FK__Item__idUnidad__48CFD27E] FOREIGN KEY ([idUnidad]) REFERENCES [dbo].[Unidades]([idUnidad]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Item] ADD CONSTRAINT [FK_Item_Usuarios] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuarios]([idUsuario]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[SalidaEntradaHerramientas] ADD CONSTRAINT [FK_SalidaEntradaHerramientas_Herramientas] FOREIGN KEY ([idHerramientas]) REFERENCES [dbo].[Herramientas]([idHerramientas]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[SalidaEntradaHerramientas] ADD CONSTRAINT [FK__SalidaEnt__idUsu__534D60F1] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuarios]([idUsuario]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Unidades] ADD CONSTRAINT [FK__Unidades__idUsua__47DBAE45] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[Usuarios]([idUsuario]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Usuarios] ADD CONSTRAINT [FK_Usuarios_Role] FOREIGN KEY ([idRole]) REFERENCES [dbo].[Role]([idRole]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
