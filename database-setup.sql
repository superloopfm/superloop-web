-- 1. Create Entries Table (tracks email submissions & prizes)
CREATE TABLE entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  prize_tier INT NOT NULL CHECK (prize_tier IN (1, 2, 3)),
  prize_label TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Index for fast duplicate-email lookups
CREATE INDEX idx_entries_email ON entries (email);

-- 2. Create Inventory Table (tracks the 100 Vinyl records)
CREATE TABLE inventory (
  id TEXT PRIMARY KEY DEFAULT 'vinyl',
  total_cap INT NOT NULL DEFAULT 100,
  remaining INT NOT NULL DEFAULT 100,
  CONSTRAINT remaining_non_negative CHECK (remaining >= 0)
);

-- Seed the single inventory row
INSERT INTO inventory (id, total_cap, remaining) VALUES ('vinyl', 100, 100);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
-- Note: No policies are created here. This means DEFAULT DENY for all client-side requests.
-- Only the Edge Function (using service_role) can read/write to these tables.

-- 4. Create the Atomic Decrement RPC Function (Prevents Race Conditions)
CREATE OR REPLACE FUNCTION decrement_vinyl()
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  rows_affected INT;
BEGIN
  UPDATE inventory
  SET remaining = remaining - 1
  WHERE id = 'vinyl' AND remaining > 0;

  GET DIAGNOSTICS rows_affected = ROW_COUNT;
  RETURN rows_affected > 0;
END;
$$;
