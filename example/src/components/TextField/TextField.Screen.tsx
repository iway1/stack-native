import React from "react";
import { useForm } from "react-hook-form";
import { STKButton, TextField } from "stack-native";
import { z } from "zod";
import { TestAppScreen } from "../../TestAppScreen";
import { zodResolver } from "@hookform/resolvers/zod";

const Schema = z.object({
  name: z.string(),
});

export function TextFieldScreen() {
  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof Schema>) {
    console.log(data);
  }

  return (
    <TestAppScreen>
      <TextField
        className="mt-32"
        label="Name"
        control={form.control}
        name="name"
      />
      <STKButton
        className="mt-4"
        label="Button"
        onPress={form.handleSubmit(onSubmit)}
      />
    </TestAppScreen>
  );
}
