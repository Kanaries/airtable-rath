import React from 'react';
import styled from 'styled-components';
import { useBase, useCursor } from '@airtable/blocks/ui';

const HeaderContainer = styled.div`
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    align-items: baseline;
    font-family: 'Space Mono', Menlo, Courier, monospace;
    margin-block: 0.5rem;
    padding-inline: 1rem;
    > * {
        flex-grow: 0;
        flex-shrink: 0;
        cursor: default;
        line-height: 1.5em;
        height: 1.5em;
        margin: 0;
    }
`;

const BaseHeader = styled.h1`
    font-size: 0.8rem;
    font-weight: 500;
`;

const TableHeader = styled.h2`
    font-size: 0.8rem;
    font-weight: 500;
`;

const Splitter = styled.span`
    font-size: 0.8rem;
    font-weight: 500;
    padding-inline: 0.5em;
`;

export default function Header() {
    const base = useBase();
    const cursor = useCursor();
    const table = base.getTableByIdIfExists(cursor.activeTableId);

    return (
        <HeaderContainer>
            <BaseHeader>{base.name}</BaseHeader>
            <Splitter>{'>'}</Splitter>
            {table && <TableHeader>{table.name}</TableHeader>}
        </HeaderContainer>
    );
}
