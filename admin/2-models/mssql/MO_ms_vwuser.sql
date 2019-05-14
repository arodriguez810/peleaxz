IF (NOT EXISTS (SELECT 1 FROM sys.views WHERE name = 'ms_vwuser'))
BEGIN
    EXECUTE('CREATE VIEW ms_vwuser
             as
             SELECT
             	id,
             	name + '' '' + lastName fullName,
             	''Created '' + CONVERT (
             		nvarchar,
             		DATEDIFF(
             			DAY,
             			updated,
             		GETDATE())) + '' days ago'' TIME
             FROM
             	ms_user');
END;