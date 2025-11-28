"use server"

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"

export async function createProduct(data: unknown){
    const result = ProductSchema.safeParse(data)
    if(!result.success){
        return {
            // Return the full ZodError so callers can access `error.issues`
            error: result.error
        }
    }
    await prisma.product.create({
        data: result.data
    })
}