"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import ImagePreviewer from "../create-shop/ImagePreviewer";
import { useState } from "react";
import ImageUploader from "@/components/ui/core/imageUploader";
import { createCategory } from "@/services/category";

export function CreateCategoryModal() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const form = useForm();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();
      const imageFile = imageFiles[0]; // Get the first image file from the array
      formData.append("data", JSON.stringify(data));
      formData.append("icon", imageFile);

      const response = await createCategory(formData);
      if (response?.success) {
        toast.success("Shop created successfully!");
      } else {
        toast.error(
          response?.message || "Failed to create shop. Please try again.",
        );
      }
    } catch (error) {
      toast.error("Failed to create shop. Please try again.");
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger render={<Button>Create Category</Button>} />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between mt-5">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-36 w-72"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {imagePreviews.length > 0 ? (
                <ImagePreviewer
                  setImageFiles={setImageFiles}
                  imagePreview={imagePreviews}
                  setImagePreview={setImagePreviews}
                  className="mt-8"
                />
              ) : (
                <div className="mt-8">
                  <ImageUploader
                    setImageFiles={setImageFiles}
                    setImagePreviews={setImagePreviews}
                  />
                </div>
              )}
            </div>

            <Button type="submit" className="mt-5 w-full">
              {isSubmitting ? "Creating...." : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
