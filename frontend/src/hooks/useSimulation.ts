import { useMutation } from '@tanstack/react-query';
import { runSimulation } from '../services/api';

export function useSimulation(userId: number = 1) {
  return useMutation({
    mutationFn: (careerId: number) => runSimulation(careerId, userId),
  });
}
