IF NOT EXISTS(SELECT [name] FROM sys.tables WHERE [name] = 'ms_allproducts')
CREATE TABLE ms_allproducts(
  [all] int NOT NULL,
  [product] int NOT NULL,
  [id] uniqueidentifier NOT NULL
)