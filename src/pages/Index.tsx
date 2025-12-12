import { useState } from 'react';
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

const Index = () => {
  const [channels, setChannels] = useState<TelegramChannel[]>([
    {
      id: '1',
      name: 'Бизнес новости',
      description: 'Ежедневные обзоры рынков и новости бизнеса',
      link: 'https://t.me/example',
      image: 'https://via.placeholder.com/400x300/0EA5E9/FFFFFF?text=Business',
      category: 'business'
    },
    {
      id: '2',
      name: 'Финансовая аналитика',
      description: 'Глубокий анализ финансовых рынков',
      link: 'https://t.me/example2',
      image: 'https://via.placeholder.com/400x300/1A1F2C/FFFFFF?text=Finance',
      category: 'finance'
    }
  ]);

  const [categories] = useState<Category[]>([
    { id: 'all', name: 'Все каналы', color: '#0EA5E9' },
    { id: 'business', name: 'Бизнес', color: '#0EA5E9' },
    { id: 'finance', name: 'Финансы', color: '#1A1F2C' },
    { id: 'tech', name: 'Технологии', color: '#0EA5E9' },
    { id: 'marketing', name: 'Маркетинг', color: '#1A1F2C' }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newChannel, setNewChannel] = useState({
    name: '',
    description: '',
    link: '',
    image: '',
    category: 'business'
  });

  const filteredChannels = selectedCategory === 'all' 
    ? channels 
    : channels.filter(ch => ch.category === selectedCategory);

  const handleAddChannel = () => {
    if (newChannel.name && newChannel.link) {
      setChannels([...channels, {
        id: Date.now().toString(),
        ...newChannel,
        image: newChannel.image || 'https://via.placeholder.com/400x300/0EA5E9/FFFFFF?text=Channel'
      }]);
      setNewChannel({ name: '', description: '', link: '', image: '', category: 'business' });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteChannel = (id: string) => {
    setChannels(channels.filter(ch => ch.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary text-secondary-foreground shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Send" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold">Мои Telegram каналы</h1>
            </div>
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
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4 text-muted-foreground">Категории</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Badge>
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
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={() => handleDeleteChannel(channel.id)}
                >
                  <Icon name="Trash2" size={16} />
                </Button>
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
