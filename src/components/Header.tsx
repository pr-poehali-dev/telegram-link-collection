import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  isAuthenticated: boolean;
  onThemeClick: () => void;
  onCategoryDialogOpen: () => void;
  onAddChannelOpen: () => void;
  onLoginClick: () => void;
  onLogout: () => void;
}

const Header = ({ 
  isAuthenticated, 
  onThemeClick, 
  onCategoryDialogOpen, 
  onAddChannelOpen,
  onLoginClick, 
  onLogout 
}: HeaderProps) => {
  return (
    <header className="bg-secondary text-secondary-foreground shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Send" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold">Переходник Давление</h1>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" onClick={onThemeClick}>
              <Icon name="Palette" size={18} />
              Цвет
            </Button>
            {isAuthenticated ? (
              <>
                <Button variant="outline" className="gap-2" onClick={onCategoryDialogOpen}>
                  <Icon name="FolderPlus" size={18} />
                  Создать категорию
                </Button>
                <Button className="gap-2" onClick={onAddChannelOpen}>
                  <Icon name="Plus" size={18} />
                  Добавить канал
                </Button>
                <Button variant="outline" onClick={onLogout}>
                  <Icon name="LogOut" size={18} />
                </Button>
              </>
            ) : (
              <Button onClick={onLoginClick} className="gap-2">
                <Icon name="Lock" size={18} />
                Войти
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
