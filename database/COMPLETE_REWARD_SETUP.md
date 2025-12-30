# 🚀 Complete Database Setup for Reward System

## ⚠️ Run These Files in Order:

### 1. Reward Functions (CRITICAL - Run First)
```bash
psql -f database/functions/reward_functions.sql
```
**Creates:**
- `get_user_rewards(user_id, tenant_id)` - Get/create user rewards
- `award_coins(user_id, tenant_id, action, ...)` - Award coins
- `get_user_streak(user_id, tenant_id)` - Get streak data

### 2. Leaderboard Function (CRITICAL - Run Second)
```bash
psql -f database/functions/get_tenant_leaderboard.sql
```
**Creates:**
- `get_tenant_leaderboard(tenant_id, sort_column, limit)` - Tenant leaderboard
- Performance indexes

### 3. Permanent Streak Fix (Run Third)
```bash
psql -f database/fixes/permanent_streak_fix.sql
```
**Updates:**
- Trigger functions with better NULL handling
- Ensures streak always updates correctly

### 4. Fix Existing Data (Run Fourth)
```bash
psql -f database/fixes/fix_streak_data.sql
```
**Fixes:**
- Historical streak data for existing users

---

## ✅ Verify Setup:

```sql
-- Check all functions exist
SELECT proname FROM pg_proc 
WHERE proname IN (
    'get_user_rewards', 
    'award_coins', 
    'get_user_streak',
    'get_tenant_leaderboard'
);
-- Should return 4 rows

-- Test leaderboard
SELECT * FROM get_tenant_leaderboard(
    'YOUR_TENANT_ID'::uuid,
    'total_coins',
    10
);
```

---

## 🎯 After Running All Files:

✅ Rewards work
✅ Streak updates correctly
✅ Leaderboard shows data
✅ No RPC errors

**Run all 4 files in order!** 🚀
