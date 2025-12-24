# Legacy Test Series Tables - Deletion Plan

## 📋 **Overview**

The following tables are **legacy** and no longer used in the current system. Everything has been unified under the `courses` table with a `course_type` field (`'course'` or `'test_series'`).

---

## 🗑️ **Tables to be Deleted**

### 1. `test_series`
- **Purpose**: Stored test series metadata
- **Status**: ❌ **UNUSED** - Replaced by `courses` table with `course_type = 'test_series'`
- **Data**: Will be permanently deleted

### 2. `test_series_enrollments`
- **Purpose**: Stored student enrollments in test series
- **Status**: ❌ **UNUSED** - Replaced by `enrollments` table
- **Data**: Will be permanently deleted

### 3. `test_series_exams`
- **Purpose**: Linked exams to test series
- **Status**: ❌ **UNUSED** - Replaced by `course_modules` and `module_items`
- **Data**: Will be permanently deleted

---

## 🔗 **Foreign Key Dependencies**

The script handles these in the correct order:

1. **Drop `test_series_exams`** (references `test_series`)
2. **Drop `test_series_enrollments`** (references `test_series`)
3. **Drop `test_series`** (main table)
4. **Drop related functions** (`get_student_test_series_progress`)
5. **Clean up orphaned FK** in `payments` table (if exists)

---

## ⚠️ **Impact Analysis**

### Will This Break Anything?

**NO** - These tables are not used in the current codebase:

✅ **Current System Uses**:
- `courses` table (with `course_type` field)
- `enrollments` table (unified for both courses and test series)
- `course_payments` table (unified payment tracking)

❌ **Old System Used** (being deleted):
- `test_series` table
- `test_series_enrollments` table
- `test_series_exams` table
- `payments` table with `series_id` column

### Code References

The only code references to `test_series` are:
- **Old SQL scripts** in `/scripts` folder (not executed)
- **Frontend filters** that check `course_type === 'test_series'` (still works with `courses` table)

---

## 🚀 **How to Execute**

### Step 1: Backup (Optional but Recommended)

```sql
-- Backup test_series data
CREATE TABLE test_series_backup AS SELECT * FROM test_series;
CREATE TABLE test_series_enrollments_backup AS SELECT * FROM test_series_enrollments;
CREATE TABLE test_series_exams_backup AS SELECT * FROM test_series_exams;
```

### Step 2: Run the Deletion Script

1. Open Supabase SQL Editor
2. Copy **entire contents** of `drop_legacy_test_series.sql`
3. Click **Run**
4. Verify success message

### Step 3: Verify

```sql
-- Should return 0 rows
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename LIKE '%test_series%';
```

---

## ✅ **Benefits of Deletion**

1. **Cleaner Database**: Removes unused tables
2. **No Confusion**: Single source of truth (`courses` table)
3. **Better Performance**: Fewer tables to maintain
4. **Simplified Queries**: No need to check multiple tables

---

## 🔄 **Migration Path**

If you had data in these tables, it should have already been migrated to:

| Old Table | New Table | Field |
|-----------|-----------|-------|
| `test_series` | `courses` | `course_type = 'test_series'` |
| `test_series_enrollments` | `enrollments` | `course_id` references `courses` |
| `test_series_exams` | `module_items` | `item_type = 'exam'` |

---

## 📝 **Summary**

**Safe to delete?** ✅ **YES**

**Will it break anything?** ❌ **NO**

**Should you backup first?** ✅ **YES** (just in case)

**Ready to proceed?** Run the script!
