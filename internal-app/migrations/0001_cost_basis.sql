-- Migration 0001: cost basis and supplier identifiers
ALTER TABLE products ADD COLUMN manufacturer_part_number TEXT;
ALTER TABLE products ADD COLUMN landed_cost_ex_gst REAL;
ALTER TABLE products ADD COLUMN gst_rate REAL NOT NULL DEFAULT 0.18;
