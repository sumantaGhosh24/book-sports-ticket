"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {
  CalendarCheck,
  CalendarX,
  MapPin,
  LinkIcon,
  BadgeIndianRupee,
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {ISport} from "@/lib/models/sport.model";
import {sportFormSchema} from "@/lib/validator";
import {sportDefaultValues} from "@/constants";
import {useUploadThing} from "@/lib/uploadthing";
import {createSport, updateSport} from "@/lib/actions/sport.actions";

import {Form, FormControl, FormField, FormItem, FormMessage} from "./ui/form";
import {Input} from "./ui/input";
import Dropdown from "./Dropdown";
import {Button} from "./ui/button";
import {Textarea} from "./ui/textarea";
import {FileUploader} from "./FileUploader";

type SportFormProps = {
  userId: string;
  type: "Create" | "Update";
  sport?: ISport;
  sportId?: string;
};

const SportForm = ({userId, type, sport, sportId}: SportFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues =
    sport && type === "Update"
      ? {
          ...sport,
          startDateTime: new Date(sport.startDateTime),
          endDateTime: new Date(sport.endDateTime),
        }
      : sportDefaultValues;

  const router = useRouter();

  const {startUpload} = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof sportFormSchema>>({
    resolver: zodResolver(sportFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof sportFormSchema>) {
    let uploadedImageUrl = values.imageUrl;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) {
        return;
      }
      uploadedImageUrl = uploadedImages[0].url;
    }
    if (type === "Create") {
      try {
        const newSport = await createSport({
          sport: {...values, imageUrl: uploadedImageUrl},
          userId,
          path: "/profile",
        });
        if (newSport) {
          form.reset();
          router.push(`/sports/${newSport._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (type === "Update") {
      if (!sportId) {
        router.back();
        return;
      }
      try {
        const updatedSport = await updateSport({
          userId,
          sport: {...values, imageUrl: uploadedImageUrl, _id: sportId},
          path: `/sports/${sportId}`,
        });
        if (updatedSport) {
          form.reset();
          router.push(`/sports/${updatedSport._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Sport title"
                    {...field}
                    className="py-6 bg-gray-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({field}) => (
              <FormItem className="w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({field}) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="rounded-2xl bg-gray-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({field}) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="location"
            render={({field}) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center justify-center h-[54px] w-full overflow-hidden rounded-full bg-gray-200 px-4 py-2">
                    <MapPin size={24} />
                    <Input
                      placeholder="Sport stadium location"
                      {...field}
                      className="py-6 ml-3 bg-gray-200"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="startDateTime"
            render={({field}) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center justify-center h-[54px] w-full overflow-hidden rounded-full bg-gray-200 px-4 py-2">
                    <CalendarCheck size={24} />
                    <p className="mx-3 whitespace-nowrap">Start Date:</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                      className="bg-gray-200 focus:border-none focus:outline-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDateTime"
            render={({field}) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center justify-center h-[54px] w-full overflow-hidden rounded-full bg-gray-200 px-4 py-2">
                    <CalendarX size={24} />
                    <p className="mx-3 whitespace-nowrap">End Date:</p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                      className="bg-gray-200 focus:border-none focus:outline-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="price"
            render={({field}) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center justify-center h-[54px] w-full overflow-hidden rounded-full bg-gray-200 px-4 py-2">
                    <BadgeIndianRupee size={24} />
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      className="py-6 bg-gray-200"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({field}) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex items-center justify-center h-[54px] w-full overflow-hidden rounded-full bg-gray-200 px-4 py-2">
                    <LinkIcon size={24} />
                    <Input
                      placeholder="Enter official site"
                      {...field}
                      className="py-6 bg-gray-200"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Processing..." : `${type} Sport`}
        </Button>
      </form>
    </Form>
  );
};

export default SportForm;
