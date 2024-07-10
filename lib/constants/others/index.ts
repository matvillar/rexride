import { AiFillMessage } from 'react-icons/ai';
import { FaSearch, FaUser } from 'react-icons/fa';
import { GiAbstract028 } from 'react-icons/gi';
import { IoHomeSharp } from 'react-icons/io5';
import { FaCarAlt } from 'react-icons/fa';

export const headerLinks = [
  {
    label: 'Home',
    href: '/',
    icon: IoHomeSharp,
  },
  {
    label: 'Search',
    href: '/search-rides',
    icon: FaSearch,
  },
  {
    label: 'Messages',
    href: '/messages',
    icon: AiFillMessage,
  },
  {
    label: 'Create Ride',
    href: '/rides/create',
    icon: FaCarAlt,
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: FaUser,
  },
  {
    label: 'About',
    href: '/about-us',
    icon: GiAbstract028,
  },
];
