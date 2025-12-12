import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Category {
  id: string;
  name: string;
  color: string;
}

interface CategoryFiltersProps {
  categories: Category[];
  selectedCategory: string;
  isAuthenticated: boolean;
  onSelectCategory: (categoryId: string) => void;
  onDeleteCategory: (categoryId: string) => void;
}

const CategoryFilters = ({ 
  categories, 
  selectedCategory, 
  isAuthenticated,
  onSelectCategory, 
  onDeleteCategory 
}: CategoryFiltersProps) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4 text-muted-foreground">Категории</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <div key={category.id} className="relative group">
            <Badge
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
              onClick={() => onSelectCategory(category.id)}
              style={selectedCategory === category.id ? { backgroundColor: category.color, borderColor: category.color } : {}}
            >
              {category.name}
            </Badge>
            {isAuthenticated && category.id !== 'all' && category.id !== 'main' && category.id !== 'kenty' && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteCategory(category.id);
                }}
              >
                <Icon name="X" size={12} />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilters;
