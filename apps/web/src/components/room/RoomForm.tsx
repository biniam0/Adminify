"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Input } from "../ui/input";
import {
  roomSchema,
  type BedKey,
  type HygieneFeatureKey,
  type KitchenFeatureKey,
  type LivingFeatureKey,
  type RoomFormData,
} from "@/schema/roomSchema";
import type { GuestHouseType } from "@/types/guest-room.type";
import { Label } from "../ui/label";

const createRoom = async (data: RoomFormData) => {
  console.log("Creating room:", data);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, id: Math.random().toString() };
};

interface RoomFormProps {
  guestHouses: GuestHouseType[] | [];
}

const RoomForm = ({ guestHouses }: RoomFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<RoomFormData>({
    resolver: zodResolver(roomSchema),
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

  const onSubmit = async (values: RoomFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const validatedData = roomSchema.parse(values);
      const result = await createRoom(validatedData);

      if (result.success) {
        setSubmitSuccess(true);
        form.reset();
      } else {
        setSubmitError("Failed to create room. Please try again.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create Room</h2>

      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Standard Single Room" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Room ID */}
            <FormField
              control={form.control}
              name="roomId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room ID</FormLabel>
                  <FormControl>
                    <Input placeholder="R-101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Room Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Type</FormLabel>
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
            {/* Guest House */}
            <FormField
              control={form.control}
              name="guestHouseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guest House</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Guest House" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {guestHouses.map((g, idx) => (
                        <SelectItem key={g.id} value={g.name}>
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{g.name}</span>
                            <span className="text-xs text-gray-500">
                              {g.location.city}, {g.location.country}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
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
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Square meters */}
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
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Max occupancy */}
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
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Beds */}
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
                                field.onChange(Number(e.target.value))
                              }
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

            {/* Kitchen Features */}
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

            {/* Accessibility */}
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
                        />
                      </FormControl>
                      <FormLabel>Wheelchair Accessible</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Hygiene Features */}
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

            {/* Images */}
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

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Creating..." : "Create Room"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default RoomForm;
