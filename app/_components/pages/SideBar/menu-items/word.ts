import { FaBook, FaHome } from 'react-icons/fa';
const word = {
  id: 'pages',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'home',
      type: 'item',
      url: '/',
      icon: FaHome,
      external: true,
      target: true,
      breadcrumbs: true,
    },
    {
      id: 'Word',
      title: 'Word',
      type: 'collapse',
      icon: FaBook,
      children: [
        {
          id: 'register',
          title: 'register',
          type: 'item',
          url: '/wordlearning/register',
          target: true,
        },
      ],
    },
  ],
};

export default word;
