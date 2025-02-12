import { create } from 'zustand'

const useSelectWork = create((set) => ({
  selectedWork: null,
  setSelectedWork: (selectedWork) => set({ selectedWork }),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
}))
export default useSelectWork