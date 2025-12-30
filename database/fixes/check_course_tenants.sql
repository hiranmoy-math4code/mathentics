-- Check which tenant each course belongs to
SELECT 
    c.id,
    c.title,
    c.tenant_id,
    t.name as tenant_name,
    t.slug as tenant_slug,
    c.is_published
FROM courses c
LEFT JOIN tenants t ON c.tenant_id = t.id
WHERE c.is_published = true
ORDER BY t.slug, c.title;

-- Count courses per tenant
SELECT 
    t.name as tenant_name,
    t.slug,
    COUNT(c.id) as course_count
FROM tenants t
LEFT JOIN courses c ON t.id = c.tenant_id AND c.is_published = true
GROUP BY t.id, t.name, t.slug
ORDER BY t.slug;
