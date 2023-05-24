import { FaBook } from 'react-icons/fa';
const word = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: FaBook,
      children: [
        {
          id: 'profile',
          title: 'Profile',
          type: 'item',
          url: '/pages/login/profile',
          target: true,
        },
      ],
    },
  ],
};

export default word;
