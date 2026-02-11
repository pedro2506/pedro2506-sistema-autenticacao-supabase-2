-- ========================================
-- ADICIONAR COLUNA TELEFONE
-- ========================================
-- Execute este script no SQL Editor do seu projeto Supabase
-- Dashboard Supabase → SQL Editor → Cole este código → Execute

ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS phone TEXT;

-- Pronto! A coluna phone foi adicionada com sucesso.
