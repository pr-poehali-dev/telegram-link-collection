import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface TelegramChannel {
  id: string;
  name: string;
  description: string;
  link: string;
  image: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
}

interface ColorTheme {
  name: string;
  primary: string;
  secondary: string;
}

interface DialogsProps {
  isLoginDialogOpen: boolean;
  setIsLoginDialogOpen: (open: boolean) => void;
  password: string;
  setPassword: (password: string) => void;
  onLogin: () => void;
  
  isThemeDialogOpen: boolean;
  setIsThemeDialogOpen: (open: boolean) => void;
  colorThemes: ColorTheme[];
  selectedTheme: number;
  onThemeSelect: (index: number) => void;
  
  isCategoryDialogOpen: boolean;
  setIsCategoryDialogOpen: (open: boolean) => void;
  newCategory: { name: string; color: string };
  setNewCategory: (category: { name: string; color: string }) => void;
  onAddCategory: () => void;
  
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  newChannel: { name: string; description: string; link: string; image: string; category: string };
  setNewChannel: (channel: { name: string; description: string; link: string; image: string; category: string }) => void;
  categories: Category[];
  onAddChannel: () => void;
  
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  editingChannel: TelegramChannel | null;
  setEditingChannel: (channel: TelegramChannel | null) => void;
  onSaveEdit: () => void;
}

const Dialogs = ({
  isLoginDialogOpen,
  setIsLoginDialogOpen,
  password,
  setPassword,
  onLogin,
  
  isThemeDialogOpen,
  setIsThemeDialogOpen,
  colorThemes,
  selectedTheme,
  onThemeSelect,
  
  isCategoryDialogOpen,
  setIsCategoryDialogOpen,
  newCategory,
  setNewCategory,
  onAddCategory,
  
  isAddDialogOpen,
  setIsAddDialogOpen,
  newChannel,
  setNewChannel,
  categories,
  onAddChannel,
  
  isEditDialogOpen,
  setIsEditDialogOpen,
  editingChannel,
  setEditingChannel,
  onSaveEdit
}: DialogsProps) => {
  return (
    <>
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Вход для администратора</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onLogin()}
                placeholder="Введите пароль"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsLoginDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={onLogin}>
              Войти
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isThemeDialogOpen} onOpenChange={setIsThemeDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Выбор цветовой схемы</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {colorThemes.map((theme, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                  selectedTheme === index ? 'border-primary' : 'border-border'
                }`}
                onClick={() => {
                  onThemeSelect(index);
                  setIsThemeDialogOpen(false);
                }}
              >
                <span className="font-medium">{theme.name}</span>
                <div className="flex gap-2">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: theme.primary }}
                  />
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: theme.secondary }}
                  />
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Создать категорию</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">Название категории</Label>
              <Input
                id="category-name"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="Например: Работа"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-color">Цвет</Label>
              <div className="flex gap-2">
                <Input
                  id="category-color"
                  type="color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  className="w-20 h-10"
                />
                <Input
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  placeholder="#0EA5E9"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={onAddCategory}>
              Создать
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Добавить новый канал</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Название канала</Label>
              <Input
                id="name"
                value={newChannel.name}
                onChange={(e) => setNewChannel({ ...newChannel, name: e.target.value })}
                placeholder="Введите название"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Описание</Label>
              <Input
                id="description"
                value={newChannel.description}
                onChange={(e) => setNewChannel({ ...newChannel, description: e.target.value })}
                placeholder="Краткое описание канала"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Ссылка на канал</Label>
              <Input
                id="link"
                value={newChannel.link}
                onChange={(e) => setNewChannel({ ...newChannel, link: e.target.value })}
                placeholder="https://t.me/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Ссылка на изображение</Label>
              <Input
                id="image"
                value={newChannel.image}
                onChange={(e) => setNewChannel({ ...newChannel, image: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Категория</Label>
              <select
                id="category"
                value={newChannel.category}
                onChange={(e) => setNewChannel({ ...newChannel, category: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-md bg-background"
              >
                {categories.filter(c => c.id !== 'all').map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={onAddChannel}>
              Добавить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Редактировать канал</DialogTitle>
          </DialogHeader>
          {editingChannel && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Название канала</Label>
                <Input
                  id="edit-name"
                  value={editingChannel.name}
                  onChange={(e) => setEditingChannel({ ...editingChannel, name: e.target.value })}
                  placeholder="Введите название"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Описание</Label>
                <Input
                  id="edit-description"
                  value={editingChannel.description}
                  onChange={(e) => setEditingChannel({ ...editingChannel, description: e.target.value })}
                  placeholder="Краткое описание канала"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-link">Ссылка на канал</Label>
                <Input
                  id="edit-link"
                  value={editingChannel.link}
                  onChange={(e) => setEditingChannel({ ...editingChannel, link: e.target.value })}
                  placeholder="https://t.me/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-image">Ссылка на изображение</Label>
                <Input
                  id="edit-image"
                  value={editingChannel.image}
                  onChange={(e) => setEditingChannel({ ...editingChannel, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Категория</Label>
                <select
                  id="edit-category"
                  value={editingChannel.category}
                  onChange={(e) => setEditingChannel({ ...editingChannel, category: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  {categories.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={onSaveEdit}>
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Dialogs;
