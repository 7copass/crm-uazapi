import { KanbanBoardData, KanbanCard, KanbanColumn } from './types';

export interface KanbanService {
    getBoard(): Promise<KanbanBoardData>;
    moveCard(cardId: string, toColumnId: string): Promise<void>;
}

const MOCK_COLUMNS: KanbanColumn[] = [
    { id: 'leads-entrada', title: 'LEADS DE ENTRADA', color: '#64748b', order: 0 }, // Slate
    { id: 'contato-inicial', title: 'CONTATO INICIAL', color: '#3b82f6', order: 1 }, // Blue
    { id: 'discussoes', title: 'DISCUSSÕES', color: '#eab308', order: 2 }, // Yellow
    { id: 'tomada-decisao', title: 'TOMADA DE DECISÃO', color: '#f97316', order: 3 }, // Orange
];

const MOCK_CARDS: KanbanCard[] = [
    {
        id: 'c1',
        columnId: 'leads-entrada',
        title: 'Shirliane Queiroz',
        value: 4.19,
        tags: ['A441'],
        hasPhone: true,
        createdAt: '2026-01-14T17:27:00'
    },
    {
        id: 'c2',
        columnId: 'leads-entrada',
        title: 'Kleiton',
        value: 250.00,
        tags: ['A283'],
        hasPhone: true,
        createdAt: '2026-01-14T14:01:00'
    },
    {
        id: 'c3',
        columnId: 'contato-inicial',
        title: 'Alan Hair Brasil',
        value: 1200.00,
        tags: ['A422'],
        hasPhone: true,
        createdAt: '2026-01-12T12:01:00'
    }
];

export class MockKanbanService implements KanbanService {
    async getBoard(): Promise<KanbanBoardData> {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { columns: MOCK_COLUMNS, cards: MOCK_CARDS };
    }

    async moveCard(cardId: string, toColumnId: string): Promise<void> {
        const card = MOCK_CARDS.find(c => c.id === cardId);
        if (card) {
            card.columnId = toColumnId;
        }
    }
}

export const kanbanService = new MockKanbanService();
