"use client";

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
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";

const formSchema = z.object({
  companyName: z.string().min(1, {
    message: "必須項目です",
  }),
  deadline: z.string().min(1, {
    message: "必須項目です",
  }),
  url: z.string().min(0, {
    message: "任意項目です",
  }),
});

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function CreateProjectForm({ open, setOpen }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      deadline: "",
      url: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="companyName"
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
        <DialogFooter className="sm:justify-start ">
          {/* <DialogClose asChild> */}
          <Button type="submit" className="my-3 w-full ">
            作成
          </Button>
          {/* </DialogClose> */}
        </DialogFooter>
      </form>
    </Form>
  );
}
