# Database Setup Checklist for Reward System

## ⚠️ MUST RUN (In Order):

### 1. Reward Functions (CRITICAL)
```bash
psql -f database/functions/reward_functions.sql
```
**Creates:**
- `get_user_rewards()` - Get/create rewards
- `award_coins()` - Award coins with duplicate check
- `get_user_streak()` - Get streak data ✅ **Fixes your streak issue!**

### 2. Reward Triggers (If not already run)
```bash
psql -f database/migrations/update_reward_triggers_tenant.sql
```
**Updates:**
- Streak calculation on login
- Reward transaction processing

### 3. RLS Policies (If getting permission errors)
```bash
psql -f database/fixes/fix_user_rewards_insert_policy.sql
```
**Fixes:**
- INSERT permission for user_rewards

---

## 🔍 Verify Setup:

```sql
-- Check if functions exist
SELECT proname FROM pg_proc 
WHERE proname IN ('get_user_rewards', 'award_coins', 'get_user_streak');

-- Should return 3 rows
```

---

## 🎯 Your Current Issue:

**Symptom:** Streak shows 0 but calendar has tick mark

**Cause:** `get_user_streak()` function not in database

**Solution:** Run step 1 above

**After running, streak will show correctly!** 🚀
