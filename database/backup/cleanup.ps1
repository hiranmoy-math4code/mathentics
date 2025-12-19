# Cleanup Script - Remove Scattered SQL Files
# Run this after verifying the consolidated files work correctly

Write-Host "🗑️  Database Consolidation Cleanup Script" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  WARNING: This will delete scattered SQL files!" -ForegroundColor Yellow
Write-Host "Make sure you've tested the consolidated files first!" -ForegroundColor Yellow
Write-Host ""

$confirmation = Read-Host "Type 'DELETE' to proceed with cleanup"

if ($confirmation -ne "DELETE") {
    Write-Host "❌ Cleanup cancelled." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "🧹 Cleaning up scattered SQL files..." -ForegroundColor Green
Write-Host ""

# Root directory files to delete
$rootFiles = @(
    "fix_lesson_progress_constraint.sql",
    "verify_and_fix_constraint.sql",
    "logic_and_triggers.sql",
    "test_upsert.sql",
    "create_streak_trigger.sql",
    "create_community_channels_trigger.sql",
    "fix_reward_system.sql",
    "fix_responses_constraint.sql",
    "full_schema.sql",
    "rls_policies.sql",
    "check_progress.sql",
    "check_constraints.sql"
)

# scripts/ directory files to delete
$scriptsFiles = @(
    "scripts\test_series_rpc.sql",
    "scripts\optimize_rpc.sql",
    "scripts\optimize_indexes.sql",
    "scripts\optimize_chat_indexes.sql",
    "scripts\marketplace_rpc.sql",
    "scripts\latest.sql",
    "scripts\fix_google_auth_v2.sql",
    "scripts\fix_google_auth.sql",
    "scripts\exam_submission_rpc.sql",
    "scripts\current_schema.sql",
    "scripts\course_structure.sql",
    "scripts\community_rpc.sql",
    "scripts\chart_rpc.sql",
    "scripts\bunny_collections_migration.sql"
)

$deletedCount = 0
$failedCount = 0

# Delete root files
foreach ($file in $rootFiles) {
    if (Test-Path $file) {
        try {
            Remove-Item $file -Force
            Write-Host "✅ Deleted: $file" -ForegroundColor Green
            $deletedCount++
        } catch {
            Write-Host "❌ Failed to delete: $file" -ForegroundColor Red
            $failedCount++
        }
    } else {
        Write-Host "⏭️  Not found: $file" -ForegroundColor Gray
    }
}

# Delete scripts files
foreach ($file in $scriptsFiles) {
    if (Test-Path $file) {
        try {
            Remove-Item $file -Force
            Write-Host "✅ Deleted: $file" -ForegroundColor Green
            $deletedCount++
        } catch {
            Write-Host "❌ Failed to delete: $file" -ForegroundColor Red
            $failedCount++
        }
    } else {
        Write-Host "⏭️  Not found: $file" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "✅ Cleanup Complete!" -ForegroundColor Green
Write-Host "   Deleted: $deletedCount files" -ForegroundColor Green
if ($failedCount -gt 0) {
    Write-Host "   Failed: $failedCount files" -ForegroundColor Red
}
Write-Host ""
Write-Host "📁 Consolidated files are in: database/backup/" -ForegroundColor Cyan
Write-Host "   - 01_schema.sql" -ForegroundColor White
Write-Host "   - 02_functions_rpc.sql" -ForegroundColor White
Write-Host "   - 03_triggers.sql" -ForegroundColor White
Write-Host "   - README.md" -ForegroundColor White
Write-Host ""
