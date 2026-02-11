-- ========================================
-- CRIAR TABELA DE PERFÍS DO USUÁRIO
-- ========================================
-- Execute este script no SQL Editor do seu projeto Supabase
-- Dashboard Supabase → SQL Editor → Cole este código → Execute

-- Criar tabela de perfis de usuário
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  cpf TEXT,
  address TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Habilitar Row Level Security (RLS) para segurança
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Política: Usuário pode ver seu próprio perfil
CREATE POLICY "Usuários podem ver seu próprio perfil"
ON user_profiles FOR SELECT
USING (auth.uid() = id);

-- Política: Usuário pode atualizar seu próprio perfil
CREATE POLICY "Usuários podem atualizar seu próprio perfil"
ON user_profiles FOR UPDATE
USING (auth.uid() = id);

-- Política: Usuário pode inserir seu próprio perfil
CREATE POLICY "Usuários podem inserir seu próprio perfil"
ON user_profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- Criar bucket de armazenamento para avatares (opcional, se quiser salvar fotos)
-- Descomente as próximas linhas se quiser usar upload de fotos
/*
BEGIN;
  INSERT INTO storage.buckets (id, name, public)
  VALUES ('avatars', 'avatars', true)
  ON CONFLICT (id) DO NOTHING;
COMMIT;

-- Políticas para o bucket de avatares
CREATE POLICY "Avatares públicos são visíveis para todos"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Usuários podem fazer upload de seus próprios avatares"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatares' AND owner = auth.uid());

CREATE POLICY "Usuários podem deletar seus próprios avatares"
ON storage.objects FOR DELETE
USING (bucket_id = 'avatares' AND owner = auth.uid());
*/
