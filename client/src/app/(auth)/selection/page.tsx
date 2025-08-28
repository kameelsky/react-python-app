"use client";

import Selection from "@app/lib/components/Selection";
import { useState } from "react";

export default function SelectionPage(): React.ReactNode {
    const [selected, setSelected] = useState<Record<string, string[]>>({});

    const boxes = [
        { name: "Box 1", lastLetter: "C", lastNumber: 3, disabled: { B1: "XD", B2: "HEHE" } },
        { name: "Box 2", lastLetter: "C", lastNumber: 3, disabled: { B1: "XD", B2: "HEHE" } },
    ];

    const handleChange = (name: string, selectedItems: string[]) => {
        setSelected((prev) => {
            const newSelected = { ...prev };
            if (selectedItems?.length) {
                newSelected[name] = selectedItems;
            } else {
                delete newSelected[name];
            }
            return newSelected;
        });
    };

    return (
        <div className="flex flex-col justify-center items-center space-y-4 p-4">
            {boxes.map((box) => (
                <Selection
                    key={box.name}
                    name={box.name}
                    lastLetter={box.lastLetter}
                    lastNumber={box.lastNumber}
                    onChange={(items) => handleChange(box.name, items[box.name])}
                    selected={selected[box.name]}
                    disabled={box.disabled}
                />
            ))}
            <code>{JSON.stringify(selected)}</code>
        </div>
    );
}
