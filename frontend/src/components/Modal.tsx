import { Dialog } from '@headlessui/react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

export default function Modal({ isOpen, onClose, children, title }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-30">
      <div className="min-h-screen bg-black/40 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md">
          <Dialog.Title className="text-lg font-bold mb-4">{title}</Dialog.Title>
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
