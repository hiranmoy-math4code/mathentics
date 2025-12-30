# Exam Attempts & Responses - tenant_id Fix Guide

## ✅ SQL Fix Applied

**File:** `database/fixes/fix_exam_attempts_responses_rls.sql`

This SQL file:
1. ✅ Adds `tenant_id` column to `exam_attempts` table
2. ✅ Populates existing rows from parent exam's `tenant_id`
3. ✅ Creates complete RLS policies for `exam_attempts` and `responses`

## 🔍 Where exam_attempts are Created

Exam attempts are typically created in these scenarios:

### 1. **Quiz/Exam Start** (Client-Side)
When a student clicks "Start Exam", the code should:

```typescript
// Get tenant_id from user's active membership
const { data: membership } = await supabase
  .from('user_tenant_memberships')
  .select('tenant_id')
  .eq('user_id', userId)
  .eq('is_active', true)
  .single();

const tenantId = membership?.tenant_id;

// Create exam attempt with tenant_id
const { data: attempt, error } = await supabase
  .from('exam_attempts')
  .insert({
    tenant_id: tenantId,  // ✅ MUST include
    exam_id: examId,
    student_id: userId,
    status: 'in_progress',
    started_at: new Date().toISOString()
  })
  .select()
  .single();
```

### 2. **Server Actions** (if using)
If you have server actions for starting exams:

```typescript
// app/actions/examActions.ts
export async function startExam(examId: string) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Not authenticated');
  
  // Get tenant from headers or user membership
  const tenantId = await getTenantId(); // Your helper function
  
  const { data, error } = await supabase
    .from('exam_attempts')
    .insert({
      tenant_id: tenantId,  // ✅ MUST include
      exam_id: examId,
      student_id: user.id,
      status: 'in_progress'
    })
    .select()
    .single();
    
  return { data, error };
}
```

## 🔍 Where responses are Created

Responses are created when students answer questions:

```typescript
// Save answer
const { error } = await supabase
  .from('responses')
  .insert({
    attempt_id: attemptId,  // Parent attempt has tenant_id
    question_id: questionId,
    selected_option_id: optionId,
    answer_text: answerText
  });

// Note: responses don't need tenant_id directly
// RLS checks via parent attempt's tenant_id
```

## 📋 Action Items

### 1. **Find exam_attempts INSERT code**
Search for:
- `exam_attempts").insert`
- `from("exam_attempts").insert`
- Quiz/Exam start handlers

### 2. **Add tenant_id to INSERT**
Ensure all exam_attempts INSERT statements include `tenant_id`

### 3. **Test**
- Start a new exam
- Check database: `SELECT * FROM exam_attempts ORDER BY created_at DESC LIMIT 5;`
- Verify `tenant_id` is populated

## 🎯 Quick Search Commands

```bash
# Find exam_attempts INSERT
grep -r "exam_attempts" --include="*.tsx" --include="*.ts" app/ components/

# Find quiz/exam start functions
grep -r "startExam\|handleStart" --include="*.tsx" --include="*.ts" app/ components/
```

## ✅ After Running SQL

The RLS policies will:
- ✅ Allow students to INSERT with their tenant_id
- ✅ Block cross-tenant access
- ✅ Validate exam belongs to same tenant

**No more RLS errors after SQL + code fix!** 🎉
