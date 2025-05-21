'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { webhook } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import { Message } from '@/types/message';

const messageSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  message: z.string().min(1, 'Message is required'),
});

type MessageFormData = z.infer<typeof messageSchema>;

interface WebhookFormProps {
  onMessageSent: (message: Message) => void;
}

export default function WebhookForm({ onMessageSent }: WebhookFormProps) {
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      name: user?.name || ''
    }
  });


  const onSubmit = async (data: MessageFormData) => {
    try {
      const payload = {
        ...data,
        userId: user?.id.toString() || '',
        timestamp: new Date().toISOString(),
      };

      const result = await webhook.sendMessage(payload);
      onMessageSent(result);
      toast.success('Message sent successfully!');
      reset({ message: '' }); // Only reset message, keep name
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          {...register('name')}
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          {...register('message')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}