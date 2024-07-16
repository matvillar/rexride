'use client';
import { Card } from '@/components/ui/card';
import React, { useRef } from 'react';
import { messageValidation } from '@/lib/validations/message.validation';
import { useParams } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutationState } from '@/hooks/useMutationState';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ConvexError } from 'convex/values';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import TextAreaAutosize from 'react-textarea-autosize';
import { IoSend } from 'react-icons/io5';
const ChatInput = () => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { chatId } = useParams();

  const conversation = useQuery(api.conversation.getConversation, {
    id: chatId as Id<'conversations'>,
  });

  const { mutate: sendMessage, pending } = useMutationState(
    api.message.createMessage
  );

  const form = useForm<z.infer<typeof messageValidation>>({
    resolver: zodResolver(messageValidation),

    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof messageValidation>) => {
    await sendMessage({
      conversationId: conversation?._id,
      content: [values.content],
      type: 'text',
    })
      .then(() => {
        form.reset();
      })
      .catch((err) => {
        toast.error(
          err instanceof ConvexError ? err.message : 'Something went wrong'
        );
      });
  };

  const handleInputChange = (e: any) => {
    const { value, selectionStart } = e.target;

    if (selectionStart !== null) {
      form.setValue('content', value);
    }
  };

  return (
    <Card className="w-full p-2 rounded-lg relative">
      <div className="flex gap-2 items-end w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-2 w-full items-end"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center w-full">
                  <FormControl className="flex-1 text-medium-bold text-gray-400">
                    <TextAreaAutosize
                      onKeyDown={async (e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          await form.handleSubmit(onSubmit)();
                        }
                      }}
                      rows={1}
                      maxRows={3}
                      {...field}
                      onChange={handleInputChange}
                      onClick={handleInputChange}
                      placeholder="Type a message"
                      className="w-full h-full p-2 rounded-lg border border-gray-300 focus:outline-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={pending} type="submit" className="flex-shrink-0">
              <IoSend />
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default ChatInput;

// <FormControl className="flex-1 text-medium-bold text-gray-400">
//   <TextAreaAutosize
//     rows={1}
//     maxRows={3}
//     {...field}
//     onChange={handleInputChange}
//     onClick={handleInputChange}
//     placeholder="Type a message"
//     className="w-full h-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//   />
// </FormControl>;
