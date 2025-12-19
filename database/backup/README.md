# Database Consolidation - Math4Code

## 📋 Overview

This consolidation creates **ONE SOURCE OF TRUTH** for the Math4Code database schema. All scattered SQL files have been consolidated into three idempotent, well-organized files.

## ✅ New Database Structure

### Location: `/database/backup/`

All database files are now in this single directory:

1. **`01_schema.sql`** - Tables, Constraints, Indexes, RLS Policies
2. **`02_functions_rpc.sql`** - Business Logic Functions & RPCs
3. **`03_triggers.sql`** - Automated Actions & Triggers

## 🚀 How to Use

### Fresh Database Setup

Run these files **in order** in your Supabase SQL Editor:

```sql
-- Step 1: Create all tables, indexes, and security policies
-- Run: database/backup/01_schema.sql

-- Step 2: Create all functions and RPCs
-- Run: database/backup/02_functions_rpc.sql

-- Step 3: Create all triggers and automations
-- Run: database/backup/03_triggers.sql
```

### Existing Database Update

All files are **idempotent** (safe to run multiple times). You can run them on an existing database to:
- Add missing tables/columns
- Update functions
- Fix constraints
- Apply new triggers

## 🔧 Critical Fixes Included

### 1. Responses Table Unique Constraint ✅
**Problem**: Exam autosave failing with "no unique constraint" error  
**Fix**: Added `CONSTRAINT responses_attempt_question_unique UNIQUE (attempt_id, question_id)`

### 2. Lesson Progress Unique Constraint ✅
**Problem**: Lesson completion failing with constraint error  
**Fix**: Added `CONSTRAINT lesson_progress_user_lesson_unique UNIQUE (user_id, lesson_id)`

### 3. NAT Question Evaluation ✅
**Problem**: Numerical Answer Type questions not evaluating correctly  
**Fix**: Cast `student_answer::numeric` in `submit_exam_attempt` function

### 4. Reward System & Streaks ✅
**Problem**: Coins and streaks showing 0  
**Fix**: Added trigger `update_rewards_on_transaction` with streak calculation

### 5. Community Channels Auto-Creation ✅
**Problem**: Channels not created when course is published  
**Fix**: Added trigger `create_community_channels_on_course` with backfill

## 📊 What's in Each File

### 01_schema.sql (Structure & Security)

**Tables** (30+ tables):
- Core: `profiles`, `courses`, `modules`, `lessons`
- Learning: `enrollments`, `lesson_progress`, `reviews`
- Exams: `exams`, `sections`, `questions`, `options`, `exam_attempts`, `responses`, `results`
- Test Series: `test_series`, `test_series_exams`, `test_series_enrollments`
- Payments: `course_payments`, `payments`
- Rewards: `user_rewards`, `reward_transactions`, `user_badges`, `daily_missions`
- Community: `community_channels`, `community_messages`, `community_reactions`, `community_bookmarks`
- Other: `notifications`, `chat_sessions`, `chat_messages`, `bunny_settings`, `live_stream_sessions`

**Indexes** (60+ indexes):
- Foreign key indexes
- Composite indexes for frequent queries
- JSONB GIN indexes
- Text search indexes

**RLS Policies** (50+ policies):
- Row-level security for all tables
- Role-based access control
- Enrollment-based permissions

### 02_functions_rpc.sql (Business Logic)

**Functions**:
- `handle_new_user()` - Auto-create profile on signup
- `create_notification()` - Create user notifications
- `submit_exam_attempt()` - **CRITICAL**: Calculate and save exam results
- `get_student_stats()` - Student dashboard statistics
- `get_student_courses_progress()` - Course progress calculation
- `get_admin_dashboard_stats()` - Admin dashboard data
- `get_admin_chart_data()` - Last 7 days analytics
- `get_course_structure()` - Optimized course structure fetch
- `get_published_courses_with_meta()` - Marketplace courses
- `get_student_test_series_progress()` - Test series progress
- `get_channels_with_meta()` - Community channels with metadata

### 03_triggers.sql (Automations)

**Triggers**:
- `on_auth_user_created` - Create profile on signup
- `on_course_published` - Notify all users of new course
- `on_lesson_added` - Notify enrolled users of new lesson
- `update_*_updated_at` - Auto-update timestamps (20+ tables)
- `update_rewards_on_transaction` - **CRITICAL**: Update coins, XP, streaks
- `create_community_channels_on_course` - Auto-create default channels

**Backfill Scripts**:
- Create channels for existing courses
- Initialize user_rewards for existing users

## 🗑️ Files to Delete

### Root Directory
- `fix_lesson_progress_constraint.sql`
- `verify_and_fix_constraint.sql`
- `logic_and_triggers.sql`
- `test_upsert.sql`
- `create_streak_trigger.sql`
- `create_community_channels_trigger.sql`
- `fix_reward_system.sql`
- `fix_responses_constraint.sql`
- `full_schema.sql`
- `rls_policies.sql`
- `check_progress.sql`
- `check_constraints.sql`

### scripts/ Directory
- `test_series_rpc.sql`
- `optimize_rpc.sql`
- `optimize_indexes.sql`
- `optimize_chat_indexes.sql`
- `marketplace_rpc.sql`
- `latest.sql`
- `fix_google_auth_v2.sql`
- `fix_google_auth.sql`
- `exam_submission_rpc.sql`
- `current_schema.sql`
- `course_structure.sql`
- `community_rpc.sql`
- `chart_rpc.sql`
- `bunny_collections_migration.sql`

### Keep These
- `database/backup/01_schema.sql` ✅
- `database/backup/02_functions_rpc.sql` ✅
- `database/backup/03_triggers.sql` ✅
- `scripts/archive/*` (historical reference)
- `supabase/verify-indexes.sql` (verification tool)

## 🔍 Integrity Check

All tables and columns used in the codebase are included:

### Frontend Hooks Verified
- ✅ `useExamSession.ts` - responses table with unique constraint
- ✅ `useLessonProgress.ts` - lesson_progress with unique constraint
- ✅ `useRewards.ts` - user_rewards, reward_transactions
- ✅ `useStudentCourses.ts` - enrollments, courses
- ✅ `useCommunity.ts` - community_channels, community_messages

### Backend Actions Verified
- ✅ `rewardActions.ts` - reward system functions
- ✅ `examActions.ts` - submit_exam_attempt RPC
- ✅ `courseActions.ts` - course structure RPC

## 📝 Migration Steps

### Option 1: Clean Slate (Recommended for Development)
1. Drop all tables (Supabase dashboard)
2. Run `01_schema.sql`
3. Run `02_functions_rpc.sql`
4. Run `03_triggers.sql`

### Option 2: Update Existing (Production)
1. Backup your database first!
2. Run `01_schema.sql` (adds missing tables/constraints)
3. Run `02_functions_rpc.sql` (updates functions)
4. Run `03_triggers.sql` (updates triggers)

## ⚠️ Important Notes

1. **Idempotent**: All files use `CREATE OR REPLACE`, `IF NOT EXISTS`, `DROP IF EXISTS`
2. **Order Matters**: Always run 01 → 02 → 03
3. **Backfills Included**: Triggers file includes backfill for existing data
4. **No Data Loss**: Schema changes are additive only

## 🎯 Benefits

- ✅ **Single Source of Truth**: No more scattered SQL files
- ✅ **Version Control**: Easy to track changes
- ✅ **Reproducible**: Can recreate database from scratch
- ✅ **Documented**: Clear structure and organization
- ✅ **Tested**: All critical fixes included
- ✅ **Idempotent**: Safe to run multiple times

## 🐛 Debugging

If you encounter issues:

1. **Check execution order**: Must be 01 → 02 → 03
2. **Check for errors**: Read Supabase SQL Editor output
3. **Verify constraints**: Run verification queries in files
4. **Check RLS**: Ensure policies are enabled

## 📞 Support

For issues or questions:
1. Check the verification queries at the end of each file
2. Review the comments in the SQL files
3. Check Supabase logs for detailed error messages

---

**Last Updated**: 2025-12-19  
**Version**: 1.0.0  
**Status**: Production Ready ✅
