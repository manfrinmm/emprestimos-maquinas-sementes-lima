import { User } from '@/app/api/user/type'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserPayload = User | Omit<User, 'id' | 'externalId'>

interface UserState {
  user: UserPayload | null
  setUser: (user: UserPayload | null) => void
}

const STORAGE_KEY = 'user-storage'

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: STORAGE_KEY }
  )
)