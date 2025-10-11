"use client";

import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { MapPin, PenLine, Phone, Settings, User, UserRoundPen } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { Separator } from "@/app/components/ui/separator";
import { Loader } from "@/app/components/custom/loader";



export default function Page() {
    const { user, isLoaded } = useUser();
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        username: "",
        country: "",
        city: "",
        street: "",
        zip: "",
        phone: "",
        wa_number: "",
        role: ""
    });

    // ✅ Load user info from API if already saved
    useEffect(() => {
        const fetchUser = async () => {
            if (!user) return;

            try {
                const res = await axios.get("/api/v1/users", {
                    params: { email: user.primaryEmailAddress?.emailAddress },
                });

                if (res.data?.user) {
                    setForm({
                        username: res.data.user.username || "",
                        country: res.data.user.address?.country || "",
                        city: res.data.user.address?.city || "",
                        street: res.data.user.address?.street || "",
                        zip: res.data.user.address?.zip || "",
                        phone: res.data.user.contact?.phone || "",
                        wa_number: res.data.user.contact?.wa_number || "",
                        role: res.data.user?.role || "member"
                    });
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user]);

    if (!isLoaded || !user || loading) {
        return <Loader/>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // ✅ Required fields validation
        for (const [key, value] of Object.entries(form)) {
            if (!value.trim()) {
                toast.error(`${key} is required`);
                return;
            }
        }

        try {
            const res = await axios.post("/api/v1/users", {
                email: user.primaryEmailAddress?.emailAddress,
                ...form,
            });

            if (res.data.success) {
                toast.success("Profile updated successfully");
            } else {
                toast.error(res.data.error || "Failed to update profile");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="flex flex-col gap-6 p-4">
            <div className="w-full flex items-center justify-between">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <UserRoundPen /> Edit Info
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Update your shipping address and contact info.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="country">Country</Label>
                                    <Input
                                        id="country"
                                        name="country"
                                        value={form.country}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="street">Street</Label>
                                    <Input
                                        id="street"
                                        name="street"
                                        value={form.street}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="zip">Postal Code</Label>
                                    <Input
                                        id="zip"
                                        name="zip"
                                        value={form.zip}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="wa_number">WhatsApp Number</Label>
                                    <Input
                                        id="wa_number"
                                        name="wa_number"
                                        value={form.wa_number}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <DialogFooter className="mt-4">
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button type="submit">Save changes</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <Button variant="outline">
                    <Settings /> Setting
                </Button>
            </div>

            {/* Profile Card */}
            <div className="bg-muted/50 flex flex-col items-center rounded-xl p-6">
                <img
                    src={user.imageUrl}
                    alt={user.fullName ?? "User"}
                    className="h-32 w-32 rounded-full border-4 border-white shadow-md"
                />
                <h1 className="mt-4 text-2xl font-semibold">{user.fullName}</h1>
                <p className="text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</p>
            </div>

            <div className="w-full flex flex-col p-4 gap-1 bg-muted/50 rounded-xl">
                <div className="font-medium text-xl flex gap-2 items-center">
                    <User size={18} />
                    <p>Personal Information</p>
                </div>
                <Separator />
                <div className="w-full grid auto-rows-min gap-4 sm:grid-cols-3 mt-3">
                    <div>
                        <h2 className="text-sm text-muted-foreground">First Name</h2>
                        <p>{user.firstName ?? "-"}</p>
                    </div>
                    <div>
                        <h2 className="text-sm text-muted-foreground">Last Name</h2>
                        <p>{user.lastName ?? "-"}</p>
                    </div>
                    <div>
                        <h2 className="text-sm text-muted-foreground">username</h2>
                        <p>{form.username ?? "-"}</p>
                    </div>
                </div>
                <div className="w-full grid auto-rows-min gap-4 sm:grid-cols-1 mt-3">
                    <div>
                        <h2 className="text-sm text-muted-foreground">Role</h2>
                        <p>{form.role}</p>
                    </div>
                </div>
                
            </div>

            <div className="w-full flex flex-col p-4 gap-1 bg-muted/50 rounded-xl">
                <div className="font-medium text-xl flex gap-2 items-center">
                    <Phone size={18} />
                    <p>Contact Information</p>
                </div>
                <Separator />
                <div className="w-full grid auto-rows-min gap-4 sm:grid-cols-2 mt-3">
                    <div>
                        <h2 className="text-sm text-muted-foreground">Cell</h2>
                        <p>{form.phone ?? "-"}</p>
                    </div>
                    <div>
                        <h2 className="text-sm text-muted-foreground">Whatsapp Number</h2>
                        <p>{form.wa_number ?? "-"}</p>
                    </div>
                    <div>
                        <h2 className="text-sm text-muted-foreground">Email Address</h2>
                        <p>{user.primaryEmailAddress?.emailAddress ?? "-"}</p>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-col p-4 gap-1 bg-muted/50 rounded-xl">
                <div className="font-medium text-xl flex gap-2 items-center">
                    <MapPin size={18} />
                    <p>Shipping Information</p>
                </div>
                <Separator />
                <div className="w-full grid auto-rows-min gap-4 sm:grid-cols-3 mt-3">
                    <div>
                        <h2 className="text-sm text-muted-foreground">Contry</h2>
                        <p>{form.country ?? "-"}</p>
                    </div>
                    <div>
                        <h2 className="text-sm text-muted-foreground">City</h2>
                        <p>{form.city ?? "-"}</p>
                    </div>
                    <div>
                        <h2 className="text-sm text-muted-foreground">Postal Code</h2>
                        <p>{form.zip ?? "-"}</p>
                    </div>
                </div>
                <div className="w-full grid auto-rows-min gap-4 sm:grid-cols-1 mt-3">
                    <div>
                        <h2 className="text-sm text-muted-foreground">Contry</h2>
                        <p>{form.street ?? "-"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
