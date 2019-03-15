IF NOT EXISTS(SELECT [name] FROM sys.tables WHERE [name] = 'ms_user')
CREATE TABLE ms_user(
  [id] [int] IDENTITY(1,1) NOT NULL,
  [username] NVARCHAR(15) NOT NULL,
  [name] NVARCHAR(50) NOT NULL,
  [lastname] NVARCHAR(50) NOT NULL,
  [email] NVARCHAR(51) NULL,
  [password] NVARCHAR(200) NULL,
  [active] BIT NOT NULL,
  [created] DATETIME NOT NULL DEFAULT GETDATE(),
  [updated] DATETIME NOT NULL DEFAULT GETDATE(),
  [deleted] DATETIME NULL,
  [user_created] INT NULL,
  [user_updated] INT NULL,
  [user_deleted] INT NULL
)
