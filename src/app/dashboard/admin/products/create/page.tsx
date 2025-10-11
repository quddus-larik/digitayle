"use client";

import React, { useCallback, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Combobox } from "@/app/components/popover";
import { Separator } from "@radix-ui/react-separator";
import { Switch } from "@/app/components/ui/switch";
import { Badge } from "@/app/components/ui/badge";
import { BadgeAlert, Eye, Settings, Trash } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@components/ui/carousel";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/app/components/ui/tabs";

// ---------- Helper Components ----------
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <>
        <Separator className="my-1" />
        <Label className="text-muted-foreground">{title}</Label>
        <Separator className="my-1" />
        {children}
    </>
);

const Field = ({
    label,
    type = "text",
    badge,
}: {
    label: string;
    type?: string;
    badge?: string;
}) => (
    <>
        <Label>
            {label}
            {badge && <Badge>{badge}</Badge>}
        </Label>
        <Input type={type} min={(type == "number")? 0 : undefined}  />
    </>
);

// ---------- Main Page ----------
export default function Page() {
    const [previews, setPreviews] = useState<string[]>([]);
    const [Type, setType] = useState<string>("");
    const [dataUrls, setDataUrls] = useState<{ value: string }[]>([{ value: "" }]);

    const frams = [
        { value: "phone", label: "Phone" },
        { value: "tablet", label: "Tablet" },
        { value: "laptop", label: "Laptop" },
    ];

    // ---------- File Input ----------
    const handleFileInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (!files) return;

            const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
            Promise.all(
                imageFiles.map(
                    (file) =>
                        new Promise<string>((resolve, reject) => {
                            const reader = new FileReader();
                            reader.onloadend = () => resolve(reader.result as string);
                            reader.onerror = reject;
                            reader.readAsDataURL(file);
                        })
                )
            ).then(setPreviews);
        },
        []
    );

    // ---------- Product Type UI ----------
    const renderSpecs = useCallback(() => {
        if (!Type)
            return (
                <div className="w-full h-svh flex flex-col items-center justify-center gap-3">
                    <BadgeAlert size={100} className="text-muted-foreground/50" />
                    <Label className="text-muted-foreground text-wrap text-center">
                        Type of product not defined. It should be Tablet, Phone or Laptop.
                    </Label>
                </div>
            );

        const isMobile = Type === "phone" || Type === "tablet";
        const isLaptop = Type === "laptop";

        return (
            <>
                <Section title={`Specifications ${Type && <Badge>{Type}</Badge>}`}>
                    <Field label="Release Date" type="date" />
                    <Field label="Weight" type="number" badge="gram" />
                    <Field label="Dimensions" type="number" badge="inches" />
                </Section>

                <Section title="Memory Specs">
                    <Field label="RAM" type="number" badge="GBs" />
                    <Field label="Storage" type="number" badge="GBs" />
                    <div className="p-2 bg-muted/50 w-full rounded-sm">
                        <Label>
                            {isLaptop ? "Memory Card Slot" : "Card Slot"} <Switch />
                        </Label>
                    </div>
                </Section>

                <Section title="Performance Specs">
                    <Field label="Processor" badge="name" />
                    {isLaptop && <Field label="Processor Speed" badge="Hz" />}
                    <Field label="GPU" badge="name" />
                    {isLaptop && <Field label="GPU Speed" badge="Hz" />}
                </Section>

                <Section title="Network Specs">
                    {isMobile ? (
                        <>
                            <Field label="Sim Slots" type="number" />
                            <div className="grid grid-cols-3 gap-1 p-2 mt-2 rounded-lg bg-muted/50">
                                {["Wifi", "Bluetooth", "NFC", "Radio", "3G", "4G/LTE", "5G"].map((net) => (
                                    <Label key={net}>
                                        {net} <Switch />
                                    </Label>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="grid grid-cols-3 gap-1 p-2 mt-2 rounded-lg bg-muted/50">
                            {["Wifi", "Bluetooth", "Fingerprint"].map((net) => (
                                <Label key={net}>
                                    {net} <Switch />
                                </Label>
                            ))}
                        </div>
                    )}
                </Section>

                <Section title="Display Specs">
                    <Field label="Screen Size" type="number" badge='inches"' />
                    <Field label="Resolution" badge="width x height" />
                    <Field label="Screen Type" />
                    {isMobile && <Field label="Screen Protector" type="number" />}
                </Section>

                <Section title="Battery Specs">
                    <Field label="Battery Type" />
                    <Field label="Battery Storage" badge="mAh" />
                    {isLaptop && (
                        <div className="p-2 bg-muted/50 rounded-lg">
                            <Label>
                                Removable Battery <Switch />
                            </Label>
                        </div>
                    )}
                </Section>

                <Section title="Camera Specs">
                    <Field label="Front Camera" type="number" badge="MPs" />
                    {isMobile && <Field label="Back Camera" type="number" badge="MPs" />}
                    <div
                        className={`grid ${isMobile ? "grid-cols-3 grid-rows-2" : "grid-cols-2"
                            } gap-1 p-2 mt-2 rounded-lg bg-muted/50`}
                    >
                        {isMobile
                            ? ["Front Recording", "Back Recording", "Front Flash", "Back Flash"]
                            : ["Front Recording", "Front Flash"]
                                .map((item) => (
                                    <Label key={item}>
                                        {item} <Switch />
                                    </Label>
                                ))}
                    </div>
                </Section>

                <Section title="Accessibility Specs">
                    {isMobile && (
                        <>
                            <Field label="UI" />
                            <Field label="Operating System" />
                        </>
                    )}
                    {isLaptop && (
                        <>
                            <Field label="Operating System" />
                            <Field label="Generation" type="number" />
                            <div className="p-2 bg-muted/50 rounded-lg">
                                <Label>
                                    Backlit Keyboard <Switch />
                                </Label>
                            </div>
                            <Field label="Printed Keyboard Language" />
                        </>
                    )}
                </Section>

                {isLaptop && <Button className="mt-4">Create Product</Button>}
            </>
        );
    }, [Type]);

    return (
        <>
            <div className="w-full flex items-center justify-between mb-3">
                <h1 className="ml-1 text-xl">Products Management</h1>
                <Button variant="outline">
                    <Settings className="mr-1" /> Settings
                </Button>
            </div>

            <div className="bg-muted/50 min-h-screen rounded-xl p-4">
                <form className="flex flex-col gap-4 md:flex-row">
                    {/* Left Column */}
                    <div className="w-full flex flex-col gap-2">
                        <Section title="Fill out product information">
                            <Field label="Name" />
                            <Label>Description</Label>
                            <Textarea placeholder="Information about product" />
                            <Field label="Stocks" type="number" badge="numbers" />
                            <Field label="Price" type="number" badge="PKR" /> 
                            <Field label="Discount" type="number" badge="percentage"  /> 
                            <Label>Type of product</Label>
                            <Combobox data={frams} title="Product" value={Type} onChange={setType} />
                        </Section>

                        <Badge variant="secondary" className="bg-blue-500">
                            <Eye className="mr-1" /> Preview
                        </Badge>

                        <Tabs defaultValue="image" className="w-full">
                            <TabsList className="w-full">
                                <TabsTrigger value="image">Upload images</TabsTrigger>
                                <TabsTrigger value="url">Add URLs</TabsTrigger>
                            </TabsList>

                            <TabsContent value="image">
                                <Label>Picture</Label>
                                <Input type="file" multiple accept="image/*" className="mb-2" onChange={handleFileInputChange} />
                                {previews.length ? (
                                    <div className="flex justify-center py-2 md:px-0 px-14 bg-muted-foreground/5 ring-1 ring-muted-foreground/20 rounded-lg">
                                        <Carousel className="w-full max-w-xs rounded-lg p-1">
                                            <CarouselContent>
                                                {previews.map((src, idx) => (
                                                    <CarouselItem key={idx}>
                                                        <div className="relative">
                                                            <Badge className="absolute top-1 left-1 z-10">{idx + 1}</Badge>
                                                            <img
                                                                src={src}
                                                                alt={`Preview ${idx + 1}`}
                                                                className="rounded-md object-cover w-full h-48"
                                                            />
                                                        </div>
                                                    </CarouselItem>
                                                ))}
                                            </CarouselContent>
                                            <CarouselPrevious />
                                            <CarouselNext />
                                        </Carousel>
                                    </div>
                                ) : (
                                    <div className="w-full h-40 bg-muted/50 rounded-lg flex items-center justify-center">
                                        <BadgeAlert size={100} className="text-muted-foreground/50" />
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="url" className="flex flex-col gap-2">
                                {dataUrls.map((_, idx) => (
                                    <div key={idx} className="flex gap-1 items-center">
                                        <Input type="text" placeholder={`Image URL ${idx + 1}`} />
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-oYkkvT5ZjJvAytuB20swwXH6E3iK3o8H7g&s"
                                            alt="url"
                                            className="h-8 w-8 rounded-sm ring-1 ring-muted-foreground/20"
                                        />
                                        <Button size="icon" disabled={idx == 0? true : false} variant={"destructive"} onClick={() =>
                                            setDataUrls((prev) => prev.filter((_, i) => i !== idx))
                                        }><Trash /></Button>
                                    </div>
                                ))}
                                <Button
                                    variant="outline"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setDataUrls((prev) => [...prev, { value: "" }]);
                                    }}
                                >
                                    Add new
                                </Button>
                            </TabsContent>
                        </Tabs>

                    </div>

                    {/* Right Column */}
                    <div className="w-full flex flex-col gap-2">{renderSpecs()}</div>
                </form>
            </div>
        </>
    );
}
