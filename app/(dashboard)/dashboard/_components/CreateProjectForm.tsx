import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { useContext, useState } from "react";
import { UserOpen } from "../page";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { uuid } from "uuidv4";
interface ProjectItem {
  id: string;
  company_name: string;
  deadline: string;
  url: string;
}

const formSchema = z.object({
  company_name: z.string().min(1, {
    message: "必須項目です",
  }),
  deadline: z.string().min(1, {
    message: "必須項目です",
  }),
  url: z
    .string()
    .optional()
    .or(
      z.string().min(1, {
        message: "任意項目です",
      }),
    ),
});

const CreateProjectForm = () => {
  const { setOpen } = useContext(UserOpen);
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      deadline: "",
      url: "",
    },
  });

  const [values, setValues] = useState<ProjectItem[]>([]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isLoaded || !userId) {
      console.error("User ID is not loaded or available");
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: uuid(),
          company_name: values.company_name,
          deadline: values.deadline,
          url: values.url || "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const data = await response.json();
      setValues((prevValues) => [...prevValues, data]);
      setOpen(false);
      router.push(`/dashboard/projects/${data.id}`);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">会社名</FormLabel>
              <FormControl>
                <Input placeholder="株式会社サポーターズ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">期限</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  placeholder="2023/03/14"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">参照リンク</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="http://localhost:3000/dashboard"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="sm:justify-start">
          <Button type="submit" className="my-3 w-full">
            作成
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CreateProjectForm;
