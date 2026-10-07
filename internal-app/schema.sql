CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY, name TEXT NOT NULL, brand TEXT, brand_logo TEXT, category TEXT, subcategory TEXT,
  part_number TEXT, manufacturer_part_number TEXT, image TEXT, product_page TEXT, description TEXT, applications TEXT, vehicles TEXT,
  mrp REAL, selling_price REAL, cost_price REAL, landed_cost_ex_gst REAL, gst_rate REAL NOT NULL DEFAULT 0.18,
  stock_on_hand INTEGER NOT NULL DEFAULT 0, stock_reserved INTEGER NOT NULL DEFAULT 0,
  stock_available INTEGER NOT NULL DEFAULT 0, stock_incoming INTEGER NOT NULL DEFAULT 0,
  order_asap INTEGER NOT NULL DEFAULT 0, reorder_level INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_products_part_number ON products(part_number);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock_available);
CREATE INDEX IF NOT EXISTS idx_products_reorder ON products(order_asap);

CREATE TABLE IF NOT EXISTS sale_out_transactions (
  id TEXT PRIMARY KEY, product_id TEXT NOT NULL REFERENCES products(id), quantity INTEGER NOT NULL CHECK(quantity > 0),
  user_name TEXT, reference TEXT, notes TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_sale_out_product ON sale_out_transactions(product_id);

CREATE TABLE IF NOT EXISTS imports (
  id TEXT PRIMARY KEY, import_type TEXT NOT NULL, filename TEXT NOT NULL,
  rows_received INTEGER NOT NULL DEFAULT 0, rows_matched INTEGER NOT NULL DEFAULT 0,
  rows_unmatched INTEGER NOT NULL DEFAULT 0, rows_changed INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL, report_json TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
