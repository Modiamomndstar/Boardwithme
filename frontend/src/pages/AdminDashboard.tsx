// frontend/src/pages/AdminDashboard.tsx
import { UserIcon, ChatBubbleLeftEllipsisIcon, CurrencyDollarIcon, CogIcon } from '@heroicons/react/24/outline';

const items = [
  { name: 'Users', icon: UserIcon, href: '/admin/users' },
  { name: 'Disputes', icon: ChatBubbleLeftEllipsisIcon, href: '/admin/disputes' },
  { name: 'Earnings', icon: CurrencyDollarIcon, href: '/admin/earnings' },
  { name: 'Settings', icon: CogIcon, href: '/admin/settings' },
];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <item.icon className="h-10 w-10 text-green-600 mb-2" />
            <h2 className="text-lg font-semibold">{item.name}</h2>
          </a>
        ))}
      </div>
    </div>
  );
}
