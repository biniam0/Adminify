"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  roomSchema,
  type BedKey,
  type HygieneFeatureKey,
  type KitchenFeatureKey,
  type LivingFeatureKey,
  type RoomFormData,
} from "@/schema/roomSchema";
import type { GuestHouseType } from "@/types/guest-room.type";
import { createRoom } from "@/actions/rooms/createRoom";

interface RoomFormProps {
  guestHouses: GuestHouseType[] | [];
}

const RoomForm = ({ guestHouses }: RoomFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
    mode: "onChange", // This will validate on change
    defaultValues: {
      name: "",
      roomId: "",
      type: "SINGLE",
      price: 0,
      description: "",
      images: [],
      availability: true,
      square_meters: 0,
      max_occupancy: 1,
      beds: {
        single_beds: 0,
        double_beds: 0,
        queen_beds: 0,
        king_beds: 0,
        sofa_beds: 0,
        cribs: false,
      },
      living_features: {
        private_bathroom: false,
        bathtub: false,
        shower: false,
        hairdryer: false,
        minibar: false,
        tv: false,
        streaming_tv: false,
        wifi_available: false,
      },
      kitchen_features: {
        coffee_maker: false,
        refrigerator: false,
        microwave: false,
      },
      accessibility: {
        wheelchair_accessible: false,
      },
      hygiene_features: {
        sanitizer: false,
        hygiene_kits: false,
        digital_keys: false,
      },
      guestHouseId: "",
    },
  });

  const {
    fields: imageFields,
    append: addImage,
    remove: removeImage,
  } = useFieldArray({
    control: form.control,
    name: "images",
  });

  // Add error handler for form validation failures
  const onError = (errors: any) => {
    console.log("❌ Form validation errors:", errors);
    setSubmitError("Please check the form for errors and try again.");

    // Find first error and focus on it
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      const element = document.querySelector(
        `[name="${firstErrorField}"]`
      ) as HTMLElement;
      element?.focus();
    }
  };

  const onSubmit = async (values: RoomFormData) => {
    console.log("🚀 Form submission started");
    console.log("Form values:", values);

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Manual validation check
      const validatedData = roomSchema.parse(values);
      console.log("✅ Validated data:", validatedData);

      // Check if createRoom function exists
      if (typeof createRoom !== "function") {
        throw new Error("createRoom function is not available");
      }

      const result = await createRoom(validatedData);
      console.log("📡 API result:", result);

      // Better result handling
      if (result === null || result === undefined) {
        throw new Error("No response from server");
      }

      // if (result.success === false || result.error) {
      //   throw new Error(
      //     result.error || result.message || "Failed to create room"
      //   );
      // }

      // Success
      setSubmitSuccess(true);
      form.reset();

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("❌ Form submission error:", error);

      if (error instanceof Error) {
        setSubmitError(error.message);
      } else if (typeof error === "string") {
        setSubmitError(error);
      } else {
        setSubmitError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create Room</h2>

      {/* Add status messages */}
      {submitError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {submitError}
        </div>
      )}

      {submitSuccess && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          <strong>Success:</strong> Room created successfully!
        </div>
      )}

      <Card className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Standard Single Room"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Room description..."
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="R-101"
                      {...field}
                      disabled={isSubmitting}
                    />
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
                  <FormLabel>Room Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SINGLE">Single</SelectItem>
                      <SelectItem value="DOUBLE">Double</SelectItem>
                      <SelectItem value="TWIN">Twin</SelectItem>
                      <SelectItem value="DELUXE">Deluxe</SelectItem>
                      <SelectItem value="SUITE">Suite</SelectItem>
                      <SelectItem value="FAMILY">Family</SelectItem>
                      <SelectItem value="STUDIO">Studio</SelectItem>
                      <SelectItem value="EXECUTIVE">Executive</SelectItem>
                      <SelectItem value="PRESIDENTIAL">Presidential</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guestHouseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guest House</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Guest House" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {guestHouses.length === 0 ? (
                        <SelectItem value="" disabled>
                          No guest houses available
                        </SelectItem>
                      ) : (
                        guestHouses.map((g) => {
                          const id = g.id ?? "";
                          return (
                            <SelectItem key={id} value={id}>
                              <div className="flex flex-col items-start">
                                <span className="font-medium">{g.name}</span>
                                <span className="text-xs text-gray-500">
                                  {g.location?.city}, {g.location?.country}
                                </span>
                              </div>
                            </SelectItem>
                          );
                        })
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (per night)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || 0)
                      }
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="square_meters"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Square Meters</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || 0)
                      }
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="max_occupancy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Occupancy</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(Number(e.target.value) || 0)
                      }
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <h3 className="text-lg font-semibold mb-2">Beds</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(Object.keys(form.watch("beds")) as BedKey[]).map((bedKey) => {
                  if (bedKey === "cribs") {
                    return (
                      <FormField
                        key={bedKey}
                        control={form.control}
                        name={`beds.${bedKey}` as const}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center space-x-2 border p-3 rounded">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={(checked) =>
                                    field.onChange(checked === true)
                                  }
                                  disabled={isSubmitting}
                                />
                              </FormControl>
                              <FormLabel className="text-sm capitalize">
                                Cribs
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    );
                  }
                  return (
                    <FormField
                      key={bedKey}
                      control={form.control}
                      name={`beds.${bedKey}` as `beds.${BedKey}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="capitalize">
                            {bedKey.replace("_", " ")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              value={(field.value as number) ?? 0}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value) || 0)
                              }
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Living Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(form.watch("living_features")).map((feature) => (
                  <FormField
                    key={feature}
                    control={form.control}
                    name={
                      `living_features.${feature}` as `living_features.${LivingFeatureKey}`
                    }
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(checked === true)
                              }
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormLabel className="text-sm">
                            {feature
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Kitchen Features</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(form.watch("kitchen_features")).map((feature) => (
                  <FormField
                    key={feature}
                    control={form.control}
                    name={
                      `kitchen_features.${feature}` as `kitchen_features.${KitchenFeatureKey}`
                    }
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2 border p-3 rounded">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(checked === true)
                              }
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormLabel className="text-sm capitalize">
                            {feature.replace("_", " ")}
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Accessibility</h3>
              <FormField
                control={form.control}
                name="accessibility.wheelchair_accessible"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2 border p-3 rounded">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(checked === true)
                          }
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormLabel>Wheelchair Accessible</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Hygiene Features</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(form.watch("hygiene_features")).map((feature) => (
                  <FormField
                    key={feature}
                    control={form.control}
                    name={
                      `hygiene_features.${feature}` as `hygiene_features.${HygieneFeatureKey}`
                    }
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2 border p-3 rounded">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(checked === true)
                              }
                              disabled={isSubmitting}
                            />
                          </FormControl>
                          <FormLabel className="text-sm capitalize">
                            {feature.replace("_", " ")}
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Room Images</h3>
              {imageFields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`images.${index}.url`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Image URL"
                            {...field}
                            disabled={isSubmitting}
                          />
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
                          <Input
                            placeholder="Image Name"
                            {...field}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeImage(index)}
                    disabled={isSubmitting}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="secondary"
                onClick={() => addImage({ url: "", name: "" })}
                disabled={isSubmitting}
              >
                + Add Image
              </Button>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Creating..." : "Create Room"}
            </Button>

            {/* Debug info - Remove in production */}
            {process.env.NODE_ENV === "development" && (
              <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
                <details>
                  <summary>Debug Info (Dev Only)</summary>
                  <pre className="mt-2 bg-white p-2 rounded">
                    Form Valid: {form.formState.isValid ? "Yes" : "No"}
                    {"\n"}Errors:{" "}
                    {JSON.stringify(form.formState.errors, null, 2)}
                    {"\n"}Values: {JSON.stringify(form.getValues(), null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default RoomForm;
