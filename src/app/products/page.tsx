"use client"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@components/ui/card"
import { Button } from "@components/ui/button"
import { Separator } from "@components/ui/separator";
import Image from "next/image"

export function ProductCard() {
    return (
        <Card className="w-[280px] rounded-xl shadow-xs p-0">
            <CardHeader className="relative p-0">
                <Image
                    src="https://bundui-images.netlify.app/products/04.jpeg"
                    alt="Red Hat"
                    width={280}
                    height={200}
                    className="rounded-t-xl object-cover"
                />
            </CardHeader>
            <CardContent className="py-1 px-3">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-semibold">Red Hat</CardTitle>
                    <span className="text-lg font-bold">$28</span>
                </div>
                <CardDescription>Clothing</CardDescription>
            </CardContent>
            <CardFooter className="p-0 m-0">
                <div className="w-full">
                <Separator />
                <Button className="w-full rounded-t-[0px]" variant="outline" >
                    Add to Cart
                </Button>
                </div>
            </CardFooter>
        </Card>
    )
}


export default function Page() {

    return (
        <>
            <h1>Hello Products</h1>
            <ProductCard />
        </>
    )
}