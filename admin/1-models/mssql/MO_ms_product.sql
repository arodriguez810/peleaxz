IF NOT EXISTS(SELECT [name] FROM sys.tables WHERE [name] = 'ms_product')
CREATE TABLE ms_product(
  [id] [int] IDENTITY(1,1) NOT NULL,
  [name] NVARCHAR(50) NOT NULL,
  [description] NVARCHAR(200) NULL,
  [category] int,
  [price] money,
  [active] BIT NOT NULL,
  [created] DATETIME NOT NULL DEFAULT GETDATE(),
  [updated] DATETIME NOT NULL DEFAULT GETDATE(),
  [deleted] DATETIME NULL,
  [user_created] INT NULL,
  [user_updated] INT NULL,
  [user_deleted] INT NULL
)