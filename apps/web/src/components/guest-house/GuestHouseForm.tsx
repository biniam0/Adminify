"use client";

import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  guestHouseSchema,
  type GuestHouseFormData,
} from "@/schema/guestHouseSchema";
import { Card } from "../ui/card";
import { createGuestHouse } from "@/actions/guestHouse/createGuestHouse";
import type { GuestHouseType } from "@/types/guest-room.type";

const GuestHouseForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<GuestHouseFormData>({
    resolver: zodResolver(guestHouseSchema),
    defaultValues: {
      name: "",
      address: "",
      type: "SHARED" as const,
      images: [],
      facilities: [],
      contact: {
        phone: "",
        email: "",
      },
      location: {
        continent: "",
        country: "",
        city: "",
        subcity: "",
        nearby: "",
      },
      about: {
        description: "",
      },
      feedback: [],
    },
  });

  const [facilityInput, setFacilityInput] = useState("");

  const {
    fields: imageFields,
    append: addImage,
    remove: removeImage,
  } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const {
    fields: feedbackFields,
    append: addFeedback,
    remove: removeFeedback,
  } = useFieldArray({
    control: form.control,
    name: "feedback",
  });

  const onSubmit = async (values: GuestHouseFormData) => {
    console.log("Form submission started", values); // Debug log

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Validate the data before submitting
      const validatedData = guestHouseSchema.parse(values);
      console.log("Data validated successfully", validatedData); // Debug log

      const result = await createGuestHouse(validatedData as any); // Type assertion for now
      console.log("Guest house creation result", result); // Debug log

      if (result) {
        setSubmitSuccess(true);
        // Optional: Reset form after successful submission
        // form.reset();
      } else {
        setSubmitError("Failed to create guest house. Please try again.");
      }
    } catch (error) {
      console.error("Error while creating guest house: ", error);

      // Set user-friendly error message
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debug function to check form state
  const handleDebugClick = () => {
    console.log("Current form values:", form.getValues());
    console.log("Form errors:", form.formState.errors);
    console.log("Form is valid:", form.formState.isValid);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Guests</h2>

      {/* Debug Panel */}
      <div className="mb-4 p-2 bg-gray-100 rounded">
        <Button type="button" variant="outline" onClick={handleDebugClick}>
          Debug Form State
        </Button>
        {submitError && (
          <div className="mt-2 p-2 bg-red-100 text-red-700 rounded">
            Error: {submitError}
          </div>
        )}
        {submitSuccess && (
          <div className="mt-2 p-2 bg-green-100 text-green-700 rounded">
            Guest house created successfully!
          </div>
        )}
      </div>

      <Card className="flex flex-col p-6 space-y-4 rounded-lg shadow-md gap-0">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* --- Basic Info --- */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Cozy Beach House" {...field} />
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
                    <Input placeholder="123 Ocean Drive" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SHARED">Shared</SelectItem>
                      <SelectItem value="PRIVATE">Private</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* --- About --- */}
            <FormField
              control={form.control}
              name="about.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your guest house..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* --- Location --- */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="location.continent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Continent</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location.subcity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcity</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="location.nearby"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nearby</FormLabel>
                  <FormControl>
                    <Input placeholder="Near the beach..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* --- Contact --- */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contact.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 234 567 890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="host@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* --- Facilities --- */}
            <FormItem>
              <FormLabel>Facilities</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={facilityInput}
                  onChange={(e) => setFacilityInput(e.target.value)}
                  placeholder="Add facility"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (facilityInput.trim()) {
                        form.setValue("facilities", [
                          ...form.getValues("facilities"),
                          facilityInput.trim(),
                        ]);
                        setFacilityInput("");
                      }
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (facilityInput.trim()) {
                      form.setValue("facilities", [
                        ...form.getValues("facilities"),
                        facilityInput.trim(),
                      ]);
                      setFacilityInput("");
                    }
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {form.watch("facilities").map((f, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    onClick={() =>
                      form.setValue(
                        "facilities",
                        form
                          .getValues("facilities")
                          .filter((_, idx) => idx !== i)
                      )
                    }
                    className="cursor-pointer"
                  >
                    {f} ✕
                  </Badge>
                ))}
              </div>
            </FormItem>

            {/* --- Images --- */}
            <FormItem>
              <FormLabel>Images</FormLabel>
              <div className="space-y-4">
                {imageFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`images.${index}.url`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Image URL" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`images.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Image Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeImage(index)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => addImage({ url: "", name: "" })}
                >
                  + Add Image
                </Button>
              </div>
            </FormItem>

            {/* --- Feedbacks --- */}
            <FormItem>
              <FormLabel>Feedbacks</FormLabel>
              <div className="space-y-4">
                {feedbackFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`feedback.${index}.message`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input placeholder="Feedback message" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`feedback.${index}.rating`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Rating (1-5)"
                              min={1}
                              max={5}
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeFeedback(index)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => addFeedback({ message: "", rating: 5 })}
                >
                  + Add Feedback
                </Button>
              </div>
            </FormItem>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Creating..." : "Create Guest House"}
            </Button>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};

export default GuestHouseForm;
