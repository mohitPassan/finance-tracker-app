import { ModeToggle } from "@/components/theme-toggle";
import { ItemsForm } from "./items-form";
import { ItemsTable } from "./items-table";

export default function Home() {
    return (
        <div className="max-w-lg">
            <ModeToggle />
            <ItemsTable />
            <ItemsForm />
        </div>
    );
}
