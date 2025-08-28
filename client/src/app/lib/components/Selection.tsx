"use client";

import "@app/lib/styles/selection.css";
import { Tooltip } from "@mantine/core";
import clsx from "clsx";
import { useRef, useState } from "react";

interface SelectionProps {
    name: string;
    lastLetter: string;
    lastNumber: number;
    onChange?: (selected: Record<string, string[]>) => void;
    disabled?: Record<string, string>;
    selected?: string[];
}

interface Rect {
    x: number;
    y: number;
    w: number;
    h: number;
}

const createGrid = (lastLetter: string, lastNumber: number): string[][] => {
    const grid: string[][] = [];
    const startCharCode = "A".charCodeAt(0);
    for (let row = 0; row <= lastLetter.charCodeAt(0) - startCharCode; row++) {
        const letter = String.fromCharCode(startCharCode + row);
        const rowArr: string[] = [];
        for (let col = 1; col <= lastNumber; col++) rowArr.push(letter + col);
        grid.push(rowArr);
    }
    return grid;
};

export default function Selection({ name, lastLetter, lastNumber, onChange, disabled = {}, selected = [] }: SelectionProps) {
    const gridKeys = createGrid(lastLetter, lastNumber);
    const [start, setStart] = useState<{ x: number; y: number } | null>(null);
    const [rect, setRect] = useState<Rect | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const updateSelected = (newSelected: string[]) => {
        if (onChange) onChange({ [name]: newSelected });
    };

    const handleMouseDown = (event: React.MouseEvent) => {
        if (!containerRef.current) return;
        const bounds = containerRef.current.getBoundingClientRect();
        const target = event.target as HTMLElement;

        if (target.classList.contains("grid-item")) {
            if (disabled[target.id]) return;
            const newSelected = selected.includes(target.id) ? selected.filter((i) => i !== target.id) : [...selected, target.id];
            updateSelected(newSelected);
        }

        setStart({
            x: event.clientX - bounds.left,
            y: event.clientY - bounds.top,
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!start || !containerRef.current) return;
        const bounds = containerRef.current.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        setRect({
            x: Math.min(x, start.x),
            y: Math.min(y, start.y),
            w: Math.abs(x - start.x),
            h: Math.abs(y - start.y),
        });
    };

    const handleMouseUp = () => {
        if (!containerRef.current || !start) {
            setStart(null);
            setRect(null);
            return;
        }

        if (rect) {
            const toggledIds: string[] = [];
            const items = containerRef.current.querySelectorAll<HTMLDivElement>(".grid-item");
            const parentBox = containerRef.current.getBoundingClientRect();

            items.forEach((item) => {
                const box = item.getBoundingClientRect();
                const relBox = {
                    x: box.left - parentBox.left,
                    y: box.top - parentBox.top,
                    w: box.width,
                    h: box.height,
                };
                const overlap = !(relBox.x + relBox.w < rect.x || relBox.x > rect.x + rect.w || relBox.y + relBox.h < rect.y || relBox.y > rect.y + rect.h);
                if (overlap && !disabled[item.id]) {
                    toggledIds.push(item.id);
                }
            });

            const newSelected = Array.from(new Set(selected.filter((s) => !toggledIds.includes(s)).concat(toggledIds.filter((id) => !selected.includes(id)))));

            updateSelected(newSelected);
        }

        setStart(null);
        setRect(null);
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center">
                <p className="text-xl font-bold tracking-wide text-gray-800 border-b-2 border-indigo-500 pb-0.5">{name}</p>
            </div>
            <div
                ref={containerRef}
                className="selection-container"
                style={{ gridTemplateColumns: `repeat(${lastNumber}, 1fr)` }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                {gridKeys.flat().map((id) => {
                    const isDisabled = !!disabled[id];
                    const cell = (
                        <div key={id} id={id} className={clsx("grid-item", selected.includes(id) && "selected", isDisabled && "disabled")}>
                            {id}
                        </div>
                    );
                    if (isDisabled)
                        return (
                            <Tooltip key={id} label={disabled[id]} withArrow arrowSize={8} openDelay={500} transitionProps={{ transition: "pop", duration: 200 }}>
                                {cell}
                            </Tooltip>
                        );
                    return cell;
                })}
                {rect && (
                    <div
                        className="selection-rect"
                        style={{
                            left: rect.x,
                            top: rect.y,
                            width: rect.w,
                            height: rect.h,
                        }}
                    />
                )}
            </div>
        </div>
    );
}
