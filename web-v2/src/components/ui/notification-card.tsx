import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check, Send } from 'lucide-react';
import Image from 'next/image';

interface NotificationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  avatarSrc: string;
  avatarFallback?: string;
  isOnline?: boolean;
  userName: string;
  userRole: string;
  message: string;
  timestamp: string;
  readStatus?: 'Read' | 'Unread';
  onReply?: () => void;
}

const NotificationCard = React.forwardRef<HTMLDivElement, NotificationCardProps>(
  (
    {
      className,
      title = 'Notificações',
      avatarSrc,
      avatarFallback = 'U',
      isOnline = false,
      userName,
      userRole,
      message,
      timestamp,
      readStatus = 'Unread',
      onReply,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-md overflow-hidden rounded-2xl border border-ui-divider/40 bg-white p-2 shadow-soft backdrop-blur-sm animate-in fade-in-0 slide-in-from-bottom-4 duration-500',
          className
        )}
        {...props}
      >
        <div className="p-4 pb-2">
          <h3 className="text-lg font-black text-text-primary tracking-tight">{title}</h3>
        </div>
        
        <div className="p-4 pt-0">
          <div className="flex items-start justify-between space-x-4">
            
            {/* User Info Section */}
            <div className="flex-shrink-0">
              <div className="relative">
                {/* Avatar Customizado */}
                <div className="h-12 w-12 rounded-full overflow-hidden bg-ui-wash border border-ui-divider/50 flex items-center justify-center relative">
                  {avatarSrc ? (
                    <img 
                      src={avatarSrc} 
                      alt={userName} 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-text-secondary font-bold text-lg">{avatarFallback}</span>
                  )}
                </div>
                {isOnline && (
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-white bg-[#00b2f7]" />
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-2">
                <p className="text-sm font-black text-text-primary">{userName}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-purple">{userRole}</p>
              </div>

              {/* Message Bubble */}
              <div className="mb-3 rounded-lg rounded-tl-none bg-ui-wash p-3 text-sm text-text-secondary relative">
                <p className="font-medium">{message}</p>
              </div>

              {/* Footer with Timestamp and Read Status */}
              <div className="flex items-center space-x-2 text-xs font-bold text-text-placeholder uppercase tracking-wide">
                <span>{timestamp}</span>
                <span>&middot;</span>
                {readStatus === 'Read' && (
                  <>
                    <span className="text-brand-purple">Lido</span>
                    <Check className="h-3.5 w-3.5 text-brand-purple" />
                  </>
                )}
                {readStatus === 'Unread' && <span>Não lido</span>}
              </div>
            </div>
            
            {/* Reply Button */}
            <div className="flex-shrink-0">
              <button
                type="button"
                className="h-10 w-10 rounded-full flex items-center justify-center transition-all bg-ui-wash text-text-primary hover:bg-brand-purple/10 hover:text-brand-purple active:scale-95"
                onClick={onReply}
                aria-label="Responder notificação"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
NotificationCard.displayName = 'NotificationCard';

export { NotificationCard };
