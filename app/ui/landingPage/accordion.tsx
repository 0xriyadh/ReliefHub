// components/Accordion.tsx
'use client';
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

interface AccordionItem {
    id: string;
    title: string;
    isOpen: boolean;
    content: string;
}

const Accordion: React.FC = () => {
    const [accordionItems, setAccordionItems] = useState<AccordionItem[]>([
        {
            id: uuid(),
            title: "What is Notion?",
            isOpen: true,
            content:
                "Notion is an all-in-one productivity tool that allows you to create notes, databases, and collaborative workspaces, making it easy to organize and manage your tasks, projects, and ideas in one place."
        },
        {
            id: uuid(),
            title: "Who is this template for?",
            isOpen: false,
            content:
                "This template is specifically designed for Notion creators who want to create a personalized landing page for their Notion workspace, showcasing their projects, services, or content in a visually appealing manner."
        },
        {
            id: uuid(),
            title: "Do I need to pay for this?",
            isOpen: false,
            content: "No, this is free."
        },
        {
            id: uuid(),
            title: "Where can I ask more questions about this template?",
            isOpen: false,
            content:
                "If you have any further questions or need assistance regarding this template, please feel free to reach out to me on my website, or click the Contact within the navigation links."
        }
    ]);

    const toggleAccordion = (id: string) => {
        setAccordionItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, isOpen: !item.isOpen } : item
            )
        );
    };

    return (
        <div className='mx-72 mt-16 drop-shadow-md offset-y-0 offset-x-8'>
            {accordionItems.map(item => (
                <div key={item.id} className="mb-4">
                    <div
                        className="cursor-pointer p-4 bg-white"
                        onClick={() => toggleAccordion(item.id)}
                    >
                        <strong>{item.title}</strong>
                    </div>
                    {item.isOpen && <div className="p-2">{item.content}</div>}
                </div>
            ))}
        </div>
    );
};

export default Accordion;
