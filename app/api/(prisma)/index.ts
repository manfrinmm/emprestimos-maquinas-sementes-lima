import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Flag para indicar se o banco está configurado
export const isDatabaseConfigured = !!(process.env.DATABASE_URL || process.env.DIRECT_URL)

// Configuração do Prisma Client com fallback para permitir build
const createPrismaClient = () => {
  // Obter URL do ambiente
  const databaseUrlFromEnv = process.env.DATABASE_URL || process.env.DIRECT_URL

  // Se estiver em produção sem DATABASE_URL, usar uma URL dummy apenas para permitir o build
  // As APIs devem verificar isDatabaseConfigured antes de usar o Prisma
  const effectiveUrl = databaseUrlFromEnv ?? 'postgresql://dummy:dummy@localhost:5432/dummy'
  
  if (!databaseUrlFromEnv) {
    console.warn('⚠️ DATABASE_URL não configurada. Configure as variáveis de ambiente na Vercel.')
    console.warn('⚠️ Variáveis necessárias: DATABASE_URL e DIRECT_URL')
  }
  
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: effectiveUrl,
      },
    },
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Helper para garantir conexão saudável
export async function ensureConnection() {
  try {
    await prisma.$connect()
    return true
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error)
    return false
  }
}
