'use client';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { z } from 'zod';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadthing';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { userValidation } from '@/lib/validations/user.validation';
import { AccProfileParam } from '@/lib/constants/params/AccProfileParam';
import { set } from 'mongoose';
import { updateUser } from '@/lib/actions/user.actions';
import { Input } from '../ui/input';

const AccProfile = ({ user }: AccProfileParam) => {
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing('imageUploader');
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(userValidation),
    defaultValues: {
      name: user?.name || 'RandomRexUser',
      username: user?.username || '',
      userImage: user?.userImage || '',
      phoneNumber: user?.phoneNumber || '',
    },
  });

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes('image')) {
        return;
      }

      fileReader.onload = async (e) => {
        const imageData = e.target?.result?.toString() || '';
        fieldChange(imageData);
      };

      fileReader.readAsDataURL(file);
    }
  }

  const onSubmit = async (values: z.infer<typeof userValidation>) => {
    const imageValue = values.userImage;
    const hasImageChanged = isBase64Image(imageValue) && files.length > 0; // checkthis logic

    if (hasImageChanged) {
      const imageFileRes = await startUpload(files);
      if (imageFileRes && imageFileRes[0].url) {
        values.userImage = imageFileRes[0].url;
      }
    }
    await updateUser({
      userId: user.id,
      username: values.username,
      name: values.name,
      userImage: values.userImage,
      phoneNumber: values.phoneNumber,
    });

    // on success redirect to home
    router.push('/');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="userImage"
          render={({ field }) => (
            <FormItem className="flex items-center gap-5">
              <FormLabel className="flex h-24 w-24 items-center justify-center rounded-full bg-dark-4">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="Profile Image"
                    width={100}
                    height={100}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="Profile Image"
                    width={50}
                    height={50}
                    className="rounded-full object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-medium-bold text-gray-400">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload a new profile image"
                  onChange={(e) => handleImageChange(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                First Name
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Input
                  type="text"
                  placeholder="Enter your first name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Username
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Input
                  type="text"
                  placeholder="Enter your username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Phone Number
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Input type="text" placeholder="(Optional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default AccProfile;
