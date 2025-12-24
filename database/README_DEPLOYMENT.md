# 🚀 Math4Code Database Deployment Guide

## Quick Setup for Fresh Supabase Instance

### Prerequisites
- A new Supabase project
- Access to the SQL Editor

### Deployment Steps

1. **Open Supabase Dashboard**
   - Navigate to your project
   - Go to SQL Editor

2. **Run the Schema**
   - Open `FRESH_SETUP_SCHEMA.sql`
   - Copy the entire contents
   - Paste into SQL Editor
   - Click "Run"

3. **Verify Installation**
   ```sql
   -- Check tables (should return 34)
   SELECT COUNT(*) FROM information_schema.tables 
   WHERE table_schema = 'public';
   
   -- Check functions (should return 22+)
   SELECT COUNT(*) FROM information_schema.routines 
   WHERE routine_schema = 'public';
   ```

### What Gets Created

#### Tables (34)
- **Core**: profiles
- **Courses**: courses, modules, lessons
- **Enrollment**: enrollments, enrollment_logs, lesson_progress
- **Exams**: exams, sections, questions, options, exam_attempts, responses, results, section_results
- **Question Bank**: question_bank, question_bank_options
- **Payments**: course_payments, payments (legacy)
- **Rewards**: user_rewards, reward_transactions, user_badges, daily_missions
- **Community**: community_channels, community_messages, community_reactions, community_bookmarks
- **Other**: reviews, notifications, student_uploaded_pdfs, bunny_settings, live_stream_sessions, chat_sessions, chat_messages

#### Functions & RPCs (22 Total)
Includes all trigger functions, RPC functions, and utility functions:
1. `handle_new_user()` - Auto-create profile on signup
2. `create_notification()` - Notification helper
3. `submit_exam_attempt()` - Exam grading engine
4. `mark_expired_enrollments()` - Cleanup function
5. `check_enrollment_expiry()` - Trigger function
6. `get_course_learners()` - Enrollment data
7. `get_course_structure()` - Course content JSON
8. `get_or_create_daily_missions()` - Daily missions RPC
9. `update_mission_progress()` - Mission tracking RPC
10. `handle_reward_transaction()` - Reward system trigger
11. Plus 12 more utility and helper functions

#### Indexes (97 Total)
Complete performance optimization with indexes on:
- Primary keys and foreign keys
- Frequently queried columns
- Composite indexes for complex queries
- GIN indexes for full-text search
- Conditional indexes for filtered queries

#### RLS Policies (85 Total)
Comprehensive row-level security covering:
- All 34 tables with role-based access
- Admin, student, and creator permissions
- Read, write, update, and delete policies
- Secure data isolation per user

#### Triggers (3)
- `on_auth_user_created` - Auto-create profile
- `on_reward_transaction` - Update rewards
- `check_expiry_before_insert_update` - Enrollment expiry

### Post-Deployment

1. **Configure Auth**
   - Set up authentication providers in Supabase Auth settings
   - Configure email templates

2. **Environment Variables**
   - Update `.env.local` with new Supabase URL and anon key
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

3. **Test the Setup**
   - Create a test user
   - Verify profile creation
   - Test reward system
   - Create a test course

### Troubleshooting

**Issue**: Functions not found
- **Solution**: Ensure you're running the script in the SQL Editor, not the Table Editor

**Issue**: RLS policies blocking access
- **Solution**: Check that users are authenticated and have the correct role

**Issue**: Triggers not firing
- **Solution**: Verify triggers are created with `\df` in SQL Editor

### Migration from Existing Database

If you have an existing database and want to update it:

1. **Backup your data first!**
2. Run individual migration files from `database/migrations/` in order
3. Or use the complete schema and migrate data separately

### Support

For issues or questions:
- Check the session summary in the conversation history
- Review individual migration files in `database/migrations/`
- Consult the `COMPLETE_PRODUCTION_SCHEMA.sql` for reference

---

**Last Updated**: December 2024  
**Schema Version**: Production v1.0  
**Total Tables**: 34  
**Total Functions**: 22 (includes triggers + RPCs)  
**Total Indexes**: 97  
**Total RLS Policies**: 85
