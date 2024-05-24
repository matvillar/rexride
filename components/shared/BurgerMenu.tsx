import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { IoMdMenu } from 'react-icons/io';
import Link from 'next/link';
import Item from './Item';
import { IoHomeSharp } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { GiAbstract028 } from 'react-icons/gi';
import { AiFillMessage } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';

const BurgerMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <IoMdMenu size={28} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <h1 className="text-2xl font-bold mb-5">
              Rex<span className="text-red-500">Ride</span>
            </h1>
          </SheetTitle>
          <SheetDescription className="flex flex-col items-start gap-4">
            <div className="mt-4">
              <Link href="/">
                <Item label="Home" icon={IoHomeSharp} />
              </Link>
            </div>
            <div className="mt-4">
              <Link href="/search-rides">
                <Item label="Search Rides" icon={FaSearch} />
              </Link>
            </div>
            <div className="mt-4">
              <Link href="/messages">
                <Item label="Messages" icon={AiFillMessage} />
              </Link>
            </div>
            <div className="mt-4 ">
              <Link href="/profile">
                <Item label="Profile" icon={FaUser} />
              </Link>
            </div>
            <div className="mt-4">
              <Link href="/about-us">
                <Item label="About" icon={GiAbstract028} />
              </Link>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default BurgerMenu;
