-- Secure function to toggle user ban status
-- Only allows admins and creators to execute this
create or replace function toggle_user_ban(target_user_id uuid)
returns json
language plpgsql
security definer -- Runs with superuser privileges to access auth.users
as $$
declare
  performer_role text;
  target_banned_until timestamptz;
  new_status text;
begin
  -- 1. Check if the performer (current user) is an admin or creator
  select role into performer_role
  from public.profiles
  where id = auth.uid();
  if performer_role is null or (performer_role != 'admin' and performer_role != 'creator') then
    return json_build_object('success', false, 'error', 'Unauthorized: Admin or Creator access required');
  end if;
  -- 2. Check current ban status of the target user
  select banned_until into target_banned_until
  from auth.users
  where id = target_user_id;
  -- 3. Toggle Logic
  if target_banned_until is not null and target_banned_until > now() then
    -- User is currently banned -> Unban them
    update auth.users
    set banned_until = null
    where id = target_user_id;
    new_status := 'unblocked';
  else
    -- User is not banned -> Ban them for ~100 years
    update auth.users
    set banned_until = now() + interval '100 years'
    where id = target_user_id;
    new_status := 'blocked';
  end if;
  return json_build_object('success', true, 'action', new_status);
exception when others then
  return json_build_object('success', false, 'error', SQLERRM);
end;
$$;
-- Secure function to check user ban status
create or replace function check_user_ban_status(target_user_id uuid)
returns json
language plpgsql
security definer
as $$
declare
  performer_role text;
  target_banned_until timestamptz;
  is_banned boolean;
begin
  -- 1. Check Authorization
  select role into performer_role
  from public.profiles
  where id = auth.uid();
  if performer_role is null or (performer_role != 'admin' and performer_role != 'creator') then
    return json_build_object('success', false, 'error', 'Unauthorized');
  end if;
  -- 2. Check Status
  select banned_until into target_banned_until
  from auth.users
  where id = target_user_id;
  is_banned := (target_banned_until is not null and target_banned_until > now());
  return json_build_object('success', true, 'isBanned', is_banned);
exception when others then
  return json_build_object('success', false, 'error', SQLERRM);
end;
$$;
-- Secure function to delete user chat history
create or replace function delete_user_chat_history(target_user_id uuid)
returns json
language plpgsql
security definer
as $$
declare
  performer_role text;
begin
  -- 1. Check Authorization
  select role into performer_role
  from public.profiles
  where id = auth.uid();
  if performer_role is null or (performer_role != 'admin' and performer_role != 'creator') then
    return json_build_object('success', false, 'error', 'Unauthorized: Admin or Creator access required');
  end if;
  -- 2. Delete Chat History
  delete from chat_sessions
  where user_id = target_user_id;
  return json_build_object('success', true);
exception when others then
  return json_build_object('success', false, 'error', SQLERRM);
end;
$$;