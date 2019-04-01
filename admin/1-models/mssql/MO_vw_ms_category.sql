IF (NOT EXISTS (SELECT 1 FROM sys.views WHERE name = 'vw_ms_category'))
BEGIN
    EXECUTE('create view [dbo].[vw_ms_category]
as
select * from ms_category

');
END;