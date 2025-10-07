import { Button } from "@/app/components/ui/button";
import { Settings } from "lucide-react";

export default function App() {

    return (
        <>   
            <div className="w-full flex items-center justify-between">
                <h1 className="ml-1 text-xl">Admin Panel</h1>
                <Button variant={"outline"}><Settings/>settings</Button>
            </div>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
            </div>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </>
    )
}