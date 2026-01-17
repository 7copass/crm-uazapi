export interface KanbanColumn {
    id: string;
    title: string;
    color: string; // Hex color for the header/identifier
    order: number;
}

export interface KanbanCard {
    id: string;
    columnId: string;
    title: string; // e.g. Lead Name
    value: number; // e.g. R$ 4,19
    tags: string[]; // e.g. ["A441"]
    avatars?: string[]; // Assignees or participants
    hasPhone?: boolean; // green phone icon
    createdAt: string;
}

export interface KanbanBoardData {
    columns: KanbanColumn[];
    cards: KanbanCard[];
}
