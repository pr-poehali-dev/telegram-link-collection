import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

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

const COLOR_THEMES = [
  { name: 'Синий', primary: '#0EA5E9', secondary: '#1A1F2C', background: '#FFFFFF' },
  { name: 'Зелёный', primary: '#10B981', secondary: '#065F46', background: '#F0FDF4' },
  { name: 'Фиолетовый', primary: '#8B5CF6', secondary: '#5B21B6', background: '#FAF5FF' },
  { name: 'Оранжевый', primary: '#F97316', secondary: '#C2410C', background: '#FFF7ED' },
  { name: 'Розовый', primary: '#EC4899', secondary: '#BE185D', background: '#FDF2F8' },
  { name: 'Тёмный', primary: '#60A5FA', secondary: '#1E293B', background: '#0F172A' },
];

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);

  const [channels, setChannels] = useState<TelegramChannel[]>([
    {
      id: '1',
      name: 'Бизнес новости',
      description: 'Ежедневные обзоры рынков и новости бизнеса',
      link: 'https://t.me/example',
      image: 'https://via.placeholder.com/400x300/0EA5E9/FFFFFF?text=Business',
      category: 'main'
    },
    {
      id: '2',
      name: 'Финансовая аналитика',
      description: 'Глубокий анализ финансовых рынков',
      link: 'https://t.me/example2',
      image: 'https://via.placeholder.com/400x300/1A1F2C/FFFFFF?text=Finance',
      category: 'kenty'
    }
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: 'all', name: 'Все каналы', color: '#0EA5E9' },
    { id: 'main', name: 'Основной', color: '#0EA5E9' },
    { id: 'kenty', name: 'Кенты', color: '#1A1F2C' }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingChannel, setEditingChannel] = useState<TelegramChannel | null>(null);
  const [newCategory, setNewCategory] = useState({ name: '', color: '#0EA5E9' });
  const [newChannel, setNewChannel] = useState({
    name: '',
    description: '',
    link: '',
    image: '',
    category: 'main'
  });

  useEffect(() => {
    const root = document.documentElement;
    const theme = COLOR_THEMES[selectedTheme];
    
    const hexToHSL = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;
      
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
        }
      }
      
      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };
    
    root.style.setProperty('--primary', hexToHSL(theme.primary));
    root.style.setProperty('--secondary', hexToHSL(theme.secondary));
    root.style.setProperty('--background', hexToHSL(theme.background));
    root.style.setProperty('--foreground', theme.background === '#0F172A' ? '210 40% 98%' : '222 47% 11%');
    root.style.setProperty('--card', hexToHSL(theme.background));
    root.style.setProperty('--card-foreground', theme.background === '#0F172A' ? '210 40% 98%' : '222 47% 11%');
    root.style.setProperty('--muted-foreground', theme.background === '#0F172A' ? '215 20% 65%' : '215 16% 47%');
  }, [selectedTheme]);

  const filteredChannels = selectedCategory === 'all' 
    ? channels 
    : channels.filter(ch => ch.category === selectedCategory);

  const handleLogin = () => {
    if (password === 'admin') {
      setIsAuthenticated(true);
      setIsLoginDialogOpen(false);
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleAddChannel = () => {
    if (newChannel.name && newChannel.link) {
      setChannels([...channels, {
        id: Date.now().toString(),
        ...newChannel,
        image: newChannel.image || 'https://via.placeholder.com/400x300/0EA5E9/FFFFFF?text=Channel'
      }]);
      setNewChannel({ name: '', description: '', link: '', image: '', category: 'main' });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteChannel = (id: string) => {
    setChannels(channels.filter(ch => ch.id !== id));
  };

  const handleEditChannel = (channel: TelegramChannel) => {
    setEditingChannel(channel);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingChannel) {
      setChannels(channels.map(ch => 
        ch.id === editingChannel.id ? editingChannel : ch
      ));
      setIsEditDialogOpen(false);
      setEditingChannel(null);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      const categoryId = newCategory.name.toLowerCase().replace(/\s+/g, '-');
      setCategories([...categories, {
        id: categoryId,
        name: newCategory.name,
        color: newCategory.color
      }]);
      setNewCategory({ name: '', color: '#0EA5E9' });
      setIsCategoryDialogOpen(false);
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (categoryId === 'all' || categoryId === 'main' || categoryId === 'kenty') return;
    setCategories(categories.filter(c => c.id !== categoryId));
    setChannels(channels.map(ch => 
      ch.category === categoryId ? { ...ch, category: 'main' } : ch
    ));
    if (selectedCategory === categoryId) {
      setSelectedCategory('all');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary text-secondary-foreground shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Send" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold">Переходник Давление</h1>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2" onClick={() => setIsThemeDialogOpen(true)}>
                <Icon name="Palette" size={18} />
                Цвет
              </Button>
              {isAuthenticated ? (
                <>
                  <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="gap-2">
                        <Icon name="FolderPlus" size={18} />
                        Создать категорию
                      </Button>
                    </DialogTrigger>
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
                        <Button onClick={handleAddCategory}>
                          Создать
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <Icon name="Plus" size={18} />
                        Добавить канал
                      </Button>
                    </DialogTrigger>
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
                        <Button onClick={handleAddChannel}>
                          Добавить
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" onClick={handleLogout}>
                    <Icon name="LogOut" size={18} />
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsLoginDialogOpen(true)} className="gap-2">
                  <Icon name="Lock" size={18} />
                  Войти
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

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
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Введите пароль"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsLoginDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleLogin}>
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
            {COLOR_THEMES.map((theme, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                  selectedTheme === index ? 'border-primary' : 'border-border'
                }`}
                onClick={() => {
                  setSelectedTheme(index);
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
            <Button onClick={handleSaveEdit}>
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 text-muted-foreground">Категории</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <div key={category.id} className="relative group">
                <Badge
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
                  onClick={() => setSelectedCategory(category.id)}
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
                      handleDeleteCategory(category.id);
                    }}
                  >
                    <Icon name="X" size={12} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChannels.map((channel) => (
            <Card key={channel.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={channel.image} 
                  alt={channel.name}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
                {isAuthenticated && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEditChannel(channel)}
                    >
                      <Icon name="Pencil" size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDeleteChannel(channel.id)}
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold">{channel.name}</h3>
                  <Badge variant="secondary" className="ml-2">
                    {categories.find(c => c.id === channel.category)?.name}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4 text-sm">{channel.description}</p>
                <a
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="w-full gap-2">
                    <Icon name="ExternalLink" size={16} />
                    Открыть канал
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredChannels.length === 0 && (
          <div className="text-center py-16">
            <Icon name="Inbox" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium text-muted-foreground mb-2">
              Нет каналов в этой категории
            </h3>
            <p className="text-muted-foreground">
              Добавьте первый канал, чтобы начать
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;