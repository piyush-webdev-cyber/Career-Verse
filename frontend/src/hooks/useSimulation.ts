import { useMutation } from '@tanstack/react-query';
import { runSimulation } from '../services/api';

export function useSimulation() {
  return useMutation({
    mutationFn: (careerId: number) => runSimulation(careerId),
  });
}
