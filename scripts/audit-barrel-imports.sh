#!/bin/bash

# =====================================================
# BARREL IMPORT AUDIT SCRIPT
# =====================================================
# Purpose: Find and suggest fixes for barrel imports that prevent tree-shaking
# Barrel files (index.ts) can bloat bundles by including unused exports

echo "🔍 Auditing Barrel Imports..."
echo "======================================"

# Find all barrel imports from @/components/ui
echo "\n📦 Checking @/components/ui barrel imports..."
UI_IMPORTS=$(grep -r "from '@/components/ui'" --include="*.tsx" --include="*.ts" app/ components/ 2>/dev/null | wc -l)
echo "Found: $UI_IMPORTS barrel imports"

# Find all barrel imports from @/hooks
echo "\n🪝 Checking @/hooks barrel imports..."
HOOK_IMPORTS=$(grep -r "from '@/hooks'" --include="*.tsx" --include="*.ts" app/ components/ 2>/dev/null | wc -l)
echo "Found: $HOOK_IMPORTS barrel imports"

# Find all barrel imports from @/lib
echo "\n📚 Checking @/lib barrel imports..."
LIB_IMPORTS=$(grep -r "from '@/lib'" --include="*.tsx" --include="*.ts" app/ components/ 2>/dev/null | wc -l)
echo "Found: $LIB_IMPORTS barrel imports"

echo "\n======================================"
echo "📊 TOTAL BARREL IMPORTS: $((UI_IMPORTS + HOOK_IMPORTS + LIB_IMPORTS))"
echo "======================================"

echo "\n💡 RECOMMENDATIONS:"
echo "-----------------------------------"
echo "❌ BAD (Barrel Import):"
echo "   import { Button } from '@/components/ui'"
echo ""
echo "✅ GOOD (Direct Import):"
echo "   import { Button } from '@/components/ui/button'"
echo ""
echo "🎯 Benefits of Direct Imports:"
echo "   • Smaller bundle size (better tree-shaking)"
echo "   • Faster build times"
echo "   • Clearer dependencies"
echo "======================================"

# Show sample barrel imports for manual review
echo "\n📋 Sample Barrel Imports (first 10):"
echo "-----------------------------------"
grep -r "from '@/components/ui'" --include="*.tsx" --include="*.ts" app/ components/ 2>/dev/null | head -10

echo "\n✨ Run 'npm run build' to see bundle size improvements after fixing!"
