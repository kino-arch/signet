-- Rename the column
ALTER TABLE public.profiles RENAME COLUMN token_balance TO credits;

-- Update the column default if it had one
ALTER TABLE public.profiles ALTER COLUMN credits SET DEFAULT 0;
