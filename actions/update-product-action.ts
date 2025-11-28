"use server"

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"

export async function updateProduct(data: unknown, id: number) {
    const result = ProductSchema.safeParse(data)
    if(!result.success){
        return {
            // Return the whole ZodError so callers can read `error.issues`.
            error: result.error
        }
    }
    await prisma.product.update({
        where: {
            id
        },
        data: result.data
    })
    revalidatePath('/admin/products')
}