-- Add duration_months column to courses table
ALTER TABLE courses 
ADD COLUMN IF NOT EXISTS duration_months INTEGER DEFAULT NULL;

COMMENT ON COLUMN courses.duration_months IS 'Course validity period in months. NULL = lifetime access, Number = months of validity (e.g., 24 = 2 years)';

-- Verify expires_at column exists in enrollments table
ALTER TABLE enrollments 
ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ DEFAULT NULL;

COMMENT ON COLUMN enrollments.expires_at IS 'Date when course access expires. NULL = lifetime access';

-- Create function to calculate enrollment expiry
CREATE OR REPLACE FUNCTION calculate_enrollment_expiry()
RETURNS TRIGGER AS $$
DECLARE
  course_duration INTEGER;
BEGIN
  -- Get course duration
  SELECT duration_months INTO course_duration
  FROM courses
  WHERE id = NEW.course_id;
  
  -- If course has duration, calculate expiry date
  IF course_duration IS NOT NULL THEN
    NEW.expires_at := NOW() + (course_duration || ' months')::INTERVAL;
  ELSE
    -- Lifetime access
    NEW.expires_at := NULL;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists
DROP TRIGGER IF EXISTS set_enrollment_expiry ON enrollments;

-- Create trigger on enrollments insert
CREATE TRIGGER set_enrollment_expiry
BEFORE INSERT ON enrollments
FOR EACH ROW
EXECUTE FUNCTION calculate_enrollment_expiry();

-- Create trigger for enrollment updates (in case course_id changes)
DROP TRIGGER IF EXISTS update_enrollment_expiry ON enrollments;

CREATE TRIGGER update_enrollment_expiry
BEFORE UPDATE OF course_id ON enrollments
FOR EACH ROW
WHEN (OLD.course_id IS DISTINCT FROM NEW.course_id)
EXECUTE FUNCTION calculate_enrollment_expiry();
