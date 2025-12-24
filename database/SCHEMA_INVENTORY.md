# 📊 Math4Code Database Schema - Complete Inventory

## Overview
This document provides a complete inventory of the Math4Code production database schema.

---

## 📋 **Summary Statistics**

| Component | Count | Status |
|-----------|-------|--------|
| **Tables** | 34 | ✅ Complete |
| **Functions & RPCs** | 22 | ✅ Complete |
| **Indexes** | 97 | ✅ Complete |
| **RLS Policies** | 85 | ✅ Complete |
| **Triggers** | 3 | ✅ Complete |
| **Custom Types** | 1 | ✅ Complete |
| **Extensions** | 3 | ✅ Complete |

---

## 🗂️ **Tables (34)**

### Core User Management (1)
1. `profiles` - User profiles with roles (admin/student/creator)

### Course System (3)
2. `courses` - Course and test series catalog
3. `modules` - Course modules/sections
4. `lessons` - Individual lessons (video/text/quiz/pdf)

### Enrollment & Progress (3)
5. `enrollments` - User course enrollments
6. `enrollment_logs` - Enrollment history/audit trail
7. `lesson_progress` - Lesson completion tracking

### Exam System (8)
8. `exams` - Exam definitions
9. `sections` - Exam sections
10. `questions` - Exam questions
11. `options` - Question options (MCQ/MSQ)
12. `exam_attempts` - Student exam attempts
13. `responses` - Student answers
14. `results` - Exam results
15. `section_results` - Section-wise results

### Question Bank (2)
16. `question_bank` - Reusable question library
17. `question_bank_options` - Question bank options

### Payment System (2)
18. `course_payments` - Course/test series payments
19. `payments` - Legacy payment records

### Reward System (4)
20. `user_rewards` - User coins, XP, streaks, levels
21. `reward_transactions` - Reward transaction history
22. `user_badges` - User badge achievements
23. `daily_missions` - Daily mission tracking

### Community Features (4)
24. `community_channels` - Course community channels
25. `community_messages` - Community messages
26. `community_reactions` - Message reactions
27. `community_bookmarks` - Bookmarked messages

### Other Features (7)
28. `reviews` - Course reviews
29. `notifications` - User notifications
30. `student_uploaded_pdfs` - Student PDF uploads
31. `bunny_settings` - Bunny CDN configuration
32. `live_stream_sessions` - Live streaming sessions
33. `chat_sessions` - AI chat sessions
34. `chat_messages` - Chat message history

---

## ⚙️ **Functions & RPCs (22)**

### Core Functions (10)
1. `handle_new_user()` - Auto-create profile on signup (trigger)
2. `create_notification()` - Create user notifications
3. `submit_exam_attempt()` - Grade and submit exam
4. `mark_expired_enrollments()` - Cleanup expired enrollments
5. `check_enrollment_expiry()` - Check expiry on insert/update (trigger)
6. `get_course_learners()` - Get enrollment data for a course
7. `get_course_structure()` - Get course modules/lessons as JSON
8. `get_or_create_daily_missions()` - RPC for daily missions
9. `update_mission_progress()` - RPC for mission tracking
10. `handle_reward_transaction()` - Update rewards on transaction (trigger)

### Utility Functions (12+)
- PostgreSQL pg_trgm extension functions for full-text search
- Similarity and word similarity functions
- GIN/GiST index support functions
- Additional helper functions

---

## 🔍 **Indexes (97)**

### Primary Key Indexes (34)
- One for each table's primary key

### Foreign Key Indexes (30+)
- `idx_profiles_referred_by`
- `idx_courses_creator_id`
- `idx_modules_course_id`
- `idx_lessons_module_id`
- `idx_enrollments_user_id`
- `idx_enrollments_course_id`
- And many more...

### Performance Indexes (30+)
- Composite indexes for complex queries
- Conditional indexes for filtered queries
- GIN indexes for full-text search
- Timestamp indexes for sorting

### Unique Constraints (3+)
- `profiles.referral_code`
- `course_payments.transaction_id`
- `daily_missions(user_id, date)`
- `responses(attempt_id, question_id)`

---

## 🔒 **RLS Policies (85)**

### By Table Category

**Profiles** (3 policies)
- View all, insert own, update own

**Courses** (4 policies)
- View published, insert, update, delete (creators only)

**Modules** (2 policies)
- View published courses, manage (creators only)

**Lessons** (2 policies)
- View published/free previews, manage (creators only)

**Enrollments** (4 policies)
- View own, create, update, view (creators)

**Lesson Progress** (4 policies)
- View, insert, update, delete (own only)

**Exams** (4 policies)
- View published, create, update, delete

**Sections, Questions, Options** (6 policies)
- View published, manage (creators only)

**Exam Attempts** (3 policies)
- View own, create, update

**Responses** (4 policies)
- View, insert, update, delete (own only)

**Results** (2 policies)
- View own, view all (exam creators)

**Payments** (3 policies)
- View own, create, view (course creators)

**Rewards** (4 policies)
- View all, insert, update, delete (own only)

**Community** (9 policies)
- View, create, update, delete (enrolled users)

**Notifications** (4 policies)
- View, create, update, delete (own only)

**Other Tables** (30+ policies)
- Role-based access for remaining tables

---

## 🔄 **Triggers (3)**

1. **`on_auth_user_created`**
   - Fires on: `auth.users` INSERT
   - Function: `handle_new_user()`
   - Purpose: Auto-create profile when user signs up

2. **`on_reward_transaction`**
   - Fires on: `reward_transactions` INSERT
   - Function: `handle_reward_transaction()`
   - Purpose: Update user rewards (coins, XP, streaks)

3. **`check_expiry_before_insert_update`**
   - Fires on: `enrollments` INSERT/UPDATE
   - Function: `check_enrollment_expiry()`
   - Purpose: Auto-mark expired enrollments

---

## 🧩 **Custom Types (1)**

1. **`result_visibility_type`**
   - Values: `'immediate'`, `'scheduled'`, `'manual'`
   - Used in: `exams.result_visibility`

---

## 📦 **Extensions (3)**

1. **`uuid-ossp`** - UUID generation
2. **`pg_trgm`** - Trigram matching for full-text search
3. **`pgcrypto`** - Cryptographic functions

---

## 📁 **Files**

- **`FRESH_SETUP_SCHEMA.sql`** - Complete production schema (ready to deploy)
- **`COMPLETE_PRODUCTION_SCHEMA.sql`** - Original export (reference)
- **`README_DEPLOYMENT.md`** - Deployment guide

---

## ✅ **Deployment Checklist**

- [x] All 34 tables created
- [x] All 22 functions deployed
- [x] All 97 indexes created
- [x] All 85 RLS policies enabled
- [x] All 3 triggers activated
- [x] Custom types defined
- [x] Extensions installed

---

**Generated**: December 24, 2024  
**Version**: Production v1.0  
**Status**: ✅ Complete & Production-Ready
