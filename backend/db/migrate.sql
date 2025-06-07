
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS temp_generate_photo CASCADE;
CREATE TABLE IF NOT EXISTS temp_generate_photo (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    photo_id VARCHAR(255) NOT NULL,
    status_order VARCHAR(50) DEFAULT 'pending',
    status_payment VARCHAR(50) DEFAULT 'unpaid',
    shipping_address VARCHAR(255) NOT NULL
);

CREATE OR REPLACE FUNCTION notify_paid_order()
RETURNS trigger AS $$
BEGIN
  IF NEW.status_payment = 'paid' AND OLD.status_payment IS DISTINCT FROM NEW.status_payment THEN
    PERFORM pg_notify('order_paid_channel', NEW.id::text);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS orders_update_trigger ON orders;

CREATE TRIGGER orders_update_trigger
AFTER UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION notify_paid_order();
