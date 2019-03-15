IF NOT EXISTS(SELECT [name] FROM sys.tables WHERE [name] = 'ms_allusers')
CREATE TABLE ms_allusers(
  [tempid] NVARCHAR(200) NULL,
  [all] int NULL,
  [user] int NOT NULL,
  [category] int NOT NULL,
  [description] NVARCHAR(200) NULL,
  [id] uniqueidentifier NULL
)
