import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import Link from 'next/link';
import Item from './Item';

import { HiMenuAlt3 } from 'react-icons/hi';
import { headerLinks } from '@/lib/constants/others';

const BurgerMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <HiMenuAlt3 size={28} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <h1 className="text-2xl font-bold mb-5">
              Rex<span className="text-red-500">Ride</span>
            </h1>
          </SheetTitle>
          <SheetDescription className="flex flex-col items-start gap-5">
            {headerLinks.map((link) => (
              <Link href={link.href} key={link.href}>
                <Item label={link.label} icon={link.icon} />
              </Link>
            ))}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default BurgerMenu;
