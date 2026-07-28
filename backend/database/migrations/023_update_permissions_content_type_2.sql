UPDATE permissions
SET content_type_id = 1
WHERE permission_codename IN (
    'state_user'
)