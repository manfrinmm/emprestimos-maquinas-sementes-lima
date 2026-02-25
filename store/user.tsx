import { User } from '@/app/api/user/type'
import { create } from 'zustand'

type UserPayload = User | Omit<User, 'id' | 'externalId'>

interface UserState {
  user: UserPayload | null
  setUser: (user: UserPayload) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))