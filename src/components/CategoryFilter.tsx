import React from 'react';
import { CATEGORIES } from '../data/initialData';
import { 
  Trees, Paintbrush, Wrench, Zap, Hammer, 
  Grid, Dog, Settings, LayoutGrid 
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (catId: string | null) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trees': return <Trees className="w-4 h-4" />;
      case 'Paintbrush': return <Paintbrush className="w-4 h-4" />;
      case 'Wrench': return <Wrench className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'Hammer': return <Hammer className="w-4 h-4" />;
      case 'Grid': return <Grid className="w-4 h-4" />;
      case 'Dog': return <Dog className="w-4 h-4" />;
      case 'Settings': return <Settings className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition flex items-center gap-2 ${
          selectedCategory === null
            ? 'bg-emerald-800 text-white shadow-xs'
            : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-300'
        }`}
      >
        <LayoutGrid className="w-3.5 h-3.5" />
        <span>Alle Categorieën</span>
      </button>

      {CATEGORIES.map(cat => {
        const isSelected = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition flex items-center gap-2 ${
              isSelected
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-300'
            }`}
          >
            <span className={isSelected ? 'text-white' : 'text-emerald-700'}>
              {getIcon(cat.iconName)}
            </span>
            <span>{cat.nameNl}</span>
          </button>
        );
      })}
    </div>
  );
};
