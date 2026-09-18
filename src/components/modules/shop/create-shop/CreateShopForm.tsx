"use client";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ui/core/imageUploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ImagePreviewer from "./ImagePreviewer";
import { createShop } from "@/services/shop";
import { toast } from "sonner";
import Logo from "@/assets/svgs/logo";

const CreateShopForm = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const form = useForm();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const servicesOffered = data?.servicesOffered
      ?.split(",")
      .map((service: string) => service.trim())
      .filter((service: string) => service !== "");

    const modifiedData = {
      ...data,
      servicesOffered,
      establishedYear: Number(data?.establishedYear),
    };
    try {
      const formData = new FormData();
      const imageFile = imageFiles[0]; // Get the first image file from the array
      formData.append("data", JSON.stringify(modifiedData));
      formData.append("logo", imageFile);

      const response = await createShop(formData);

      console.log(response);

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
    <div className="border-2 border-gray-300 rounded-xl grow  p-5 my-5">
      <div className="flex items-center space-x-4 mb-5">
        <Logo />
        <div>
          <h1 className="text-xl font-semibold">Create Your Shop</h1>
          <p className="font-extralight text-sm text-gray-600">
            Join us today and start your journey!
          </p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessLicenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business License Number</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="establishedYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Established Year</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taxIdentificationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Identification Number</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="socialMediaLinks.facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialMediaLinks.twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="socialMediaLinks.instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-center">
            <div className="col-span-4 md:col-span-3">
              <FormField
                control={form.control}
                name="servicesOffered"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Services Offered</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-36"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {imageFiles.length > 0 ? (
              <ImagePreviewer
                imagePreview={imagePreviews}
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreviews}
                className="mt-5"
              />
            ) : (
              <ImageUploader
                setImagePreviews={setImagePreviews}
                setImageFiles={setImageFiles}
                isMultiple={false}
              />
            )}
          </div>

          <Button type="submit" className="mt-5 w-full">
            {isSubmitting ? "Creating...." : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateShopForm;
