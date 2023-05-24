import { FaBook } from 'react-icons/fa';
const other = {
  id: 'pages4',
  title: 'Pages',
  caption: 'Pages Caption',
  type: 'group',
  children: [
    {
      id: 'test',
      title: 'Test',
      type: 'collapse',
      icon: FaBook,
      children: [
        {
          id: 'login',
          title: 'Login',
          type: 'item',
          url: '/pages/login/login',
          target: true,
        },
      ],
    },
    {
      id: 'documentation',
      title: 'Documentation',
      type: 'item',
      url: '/',
      icon: FaBook,
      external: true,
      target: true,
      breadcrumbs: true,
    },
  ],
};
export default other;
