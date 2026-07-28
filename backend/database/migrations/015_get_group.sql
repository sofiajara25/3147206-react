INSERT INTO group_permissions (
    group_id,
    permission_id
)

SELECT 
    1,
    permission_id
FROM permissions 
WHERE permission_codename IN (
    'report_user',
    'view_user'
);