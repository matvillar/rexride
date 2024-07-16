import React from 'react';
import { addChatValidation } from '@/lib/validations/addChat.validation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertDialog } from '../ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';
import { BiSolidMessageAdd } from 'react-icons/bi';
import { Input } from '../ui/input';
import { useMutationState } from '@/hooks/useMutationState';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { ConvexError } from 'convex/values';

const AddChat = () => {
  const { mutate: createReq, pending } = useMutationState(api.request.create);
  const form = useForm<z.infer<typeof addChatValidation>>({
    resolver: zodResolver(addChatValidation),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof addChatValidation>) => {
    await createReq({ email: values.email })
      .then(() => {
        form.reset();
        toast.success('Request Sent');
      })
      .catch((err) => {
        toast.error(
          err instanceof ConvexError ? err.data : 'An error occurred'
        );
      });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <BiSolidMessageAdd
          size={24}
          className="hover:text-red-500 transition-all"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Chat</DialogTitle>
          <DialogDescription>
            Send a request to chat with someone
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-start gap-10"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormControl className="flex-1 text-medium-bold text-gray-400">
                    <Input type="email" placeholder="Enter Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={pending} type="submit" className="w-full">
                Send Request
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddChat;
