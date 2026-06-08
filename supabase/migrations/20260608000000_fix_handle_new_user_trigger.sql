-- Fix handle_new_user trigger: update column reference from token_balance to credits
--
-- Root cause: Migration 20260602000000_rename_token_balance.sql renamed the column
-- from token_balance → credits, but the trigger function was never updated.
-- This caused every Google OAuth sign-up to fail with:
--   "Database error saving new user" (column "token_balance" does not exist)
--
-- This migration brings the trigger function in sync with the current schema.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
begin
  insert into public.profiles (id, credits)
  values (new.id, 3)
  on conflict (id) do nothing;
  return new;
end;
$$;
