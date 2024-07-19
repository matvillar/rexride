'use client';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoIosNotifications } from 'react-icons/io';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Loader2 } from 'lucide-react';
import NotificationItem from './NotificationItem';

type Props = {};

const NotificationsDropDownMenu = (props: Props) => {
  // Example state for notification count
  const [notificationCount, setNotificationCount] = useState(0);
  const requests = useQuery(api.allRequests.getAllRequests);
  const reqCount = useQuery(api.allRequests.reqCount);
  const msgCount = 0;

  useEffect(() => {
    if (reqCount !== undefined && msgCount !== undefined) {
      setNotificationCount((reqCount || 0) + (msgCount || 0));
    }
  }, [reqCount, msgCount]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="relative">
          <IoIosNotifications size={30} />
          {notificationCount > 0 && (
            <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {notificationCount}
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Add your notification items here */}
        <DropdownMenuItem onClick={() => console.log('pepe')}>
          {requests ? (
            requests.length === 0 ? (
              <p className="text-gray-400 p-2 text-sm">
                Zero Notifications at this moment
              </p>
            ) : (
              requests.map((req) => {
                return (
                  <NotificationItem
                    key={req.request._id}
                    id={req.request._id}
                    imageUrl={req.sender.imageUrl}
                    username={req.sender.username}
                    email={req.sender.email}
                  />
                );
              })
            )
          ) : (
            <Loader2 />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropDownMenu;
