import { useState } from 'react';
import { Plus } from 'lucide-react';
import Dialog from './ui/Dialog';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';
import { CAREER_CATEGORIES, type CareerCategory } from '../data/careers';
import type { AddCustomCareerInput } from '../hooks/useCompareCareers';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (input: AddCustomCareerInput) => void;
}

const CATEGORIES = CAREER_CATEGORIES.filter((c): c is CareerCategory => c !== 'All');

export default function AddCustomCareerDialog({ open, onOpenChange, onAdd }: Props) {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('8');
  const [years, setYears] = useState('4');
  const [category, setCategory] = useState<CareerCategory>('Others');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const reset = () => {
    setName('');
    setSalary('8');
    setYears('4');
    setCategory('Others');
    setNotes('');
    setError('');
  };

  const handleClose = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    const avg = Number(salary);
    const edu = Number(years);

    if (!trimmed) {
      setError('Career name is required');
      return;
    }
    if (!Number.isFinite(avg) || avg <= 0) {
      setError('Enter a valid average salary (₹ LPA)');
      return;
    }
    if (!Number.isFinite(edu) || edu < 0 || edu > 20) {
      setError('Education years must be between 0 and 20');
      return;
    }

    onAdd({
      name: trimmed,
      averageSalary: avg,
      educationYears: edu,
      category,
      notes: notes.trim() || undefined,
    });
    handleClose(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleClose}
      title="Add custom career"
      description="Create a career path to include in your parallel universe comparison."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Career name"
          placeholder="e.g. Quantum Computing Engineer"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Average salary (₹ LPA)"
            type="number"
            min={0.5}
            step={0.5}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
          <Input
            label="Years of education"
            type="number"
            min={0}
            max={20}
            step={1}
            value={years}
            onChange={(e) => setYears(e.target.value)}
            required
          />
        </div>
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value as CareerCategory)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
        <Input
          label="Notes (optional)"
          placeholder="Any context for this path"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        {error && <p className="text-xs text-danger">{error}</p>}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={() => handleClose(false)}>
            Cancel
          </Button>
          <Button type="submit">
            <Plus className="w-3.5 h-3.5" />
            Add career
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
