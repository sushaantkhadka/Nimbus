"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


const fromSchema = z.object({
    name: z.string().min(1),
});

export const StoreModal = () => {
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof fromSchema>>({
        resolver: zodResolver(fromSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof fromSchema>) => {
        try {
            setLoading(true);

            const response = await axios.post('/api/stores', values)

            toast.success("Store created.")
            
        } catch (error) {
            toast.error("Something Went Wrong.")
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            title="Create Store"
            description="Add a new store and manage your store"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={ loading } placeholder="Store Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end">
                                <Button
                                    disabled={ loading }
                                    variant="outline"
                                    onClick={(storeModal.onClose)}>
                                    Cancle
                                </Button>
                                <Button
                                    disabled={ loading }
                                    type="submit">
                                    Continue
                                </Button>


                            </div>
                        </form>

                    </Form>
                </div>
            </div>
        </Modal>
    );
};