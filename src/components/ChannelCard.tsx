import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

interface ChannelCardProps {
  channel: TelegramChannel;
  categoryName?: string;
  isAuthenticated: boolean;
  onEdit: (channel: TelegramChannel) => void;
  onDelete: (id: string) => void;
}

const ChannelCard = ({ channel, categoryName, isAuthenticated, onEdit, onDelete }: ChannelCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in">
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
              onClick={() => onEdit(channel)}
            >
              <Icon name="Pencil" size={16} />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="h-8 w-8"
              onClick={() => onDelete(channel.id)}
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
            {categoryName}
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
  );
};

export default ChannelCard;
