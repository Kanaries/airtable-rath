import { GraphicWalker } from '@kanaries/graphic-walker';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useBase, useCursor, useRecords } from '@airtable/blocks/ui';
import type { IMutField } from '@kanaries/graphic-walker/dist/interfaces';
import { inferAnalyticTypeFromAirtableField, inferSemanticTypeFromAirtableField, transformRecord } from '../utils/transformer';

const Container = styled.div`
    margin-top: 0.4rem;
    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
`;

export default function GW() {
    const base = useBase();
    const cursor = useCursor();
    const table = base.getTableByIdIfExists(cursor.activeTableId);
    const airtableFields = table?.fields ?? [];
    const records = useRecords(table ?? null);
    
    const fields = useMemo(() => {
        return airtableFields.reduce<IMutField[]>((list, f) => {
            const aType = inferAnalyticTypeFromAirtableField(f);
            const sType = inferSemanticTypeFromAirtableField(f);
            if (sType) {
                list.push({
                    fid: f.id,
                    name: f.name,
                    analyticType: aType,
                    semanticType: sType,
                });
            }
            return list;
        }, []);
    }, [airtableFields]);

    const data = useMemo(() => {
        return records.map(record => transformRecord(record, fields));
    }, [records, fields]);

    return table ? (
        <Container>
            <GraphicWalker
                hideDataSourceConfig
                dataSource={data}
                rawFields={fields}
                keepAlive={false}
            />
        </Container>
    ) : null;
}
