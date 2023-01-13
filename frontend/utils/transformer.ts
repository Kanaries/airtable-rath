import { FieldType, Record } from "@airtable/blocks/models";
import type { IMutField, IRow } from "@kanaries/graphic-walker/dist/interfaces";

export function inferAnalyticTypeFromAirtableField(field: { type: FieldType }): IMutField['analyticType'] {
    return {
        [FieldType.AUTO_NUMBER]: 'dimension',
        [FieldType.CHECKBOX]: 'measure',
        [FieldType.COUNT]: 'measure',
        [FieldType.CREATED_BY]: 'dimension',
        [FieldType.CREATED_TIME]: 'dimension',
        [FieldType.CURRENCY]: 'dimension',
        [FieldType.DATE]: 'dimension',
        [FieldType.DATE_TIME]: 'dimension',
        [FieldType.DURATION]: 'measure',
        [FieldType.EMAIL]: 'dimension',
        [FieldType.LAST_MODIFIED_BY]: 'dimension',
        [FieldType.LAST_MODIFIED_TIME]: 'dimension',
        [FieldType.MULTILINE_TEXT]: 'measure',
        [FieldType.NUMBER]: 'measure',
        [FieldType.PERCENT]: 'measure',
        [FieldType.PHONE_NUMBER]: 'dimension',
        [FieldType.RATING]: 'measure',
        [FieldType.RICH_TEXT]: 'measure',
        [FieldType.SINGLE_COLLABORATOR]: 'dimension',
        [FieldType.SINGLE_LINE_TEXT]: 'dimension',
        [FieldType.URL]: 'dimension',
    }[field.type] ?? 'measure';
}

export function inferSemanticTypeFromAirtableField(field: { type: FieldType }): IMutField['semanticType'] | null {
    return {
        [FieldType.AUTO_NUMBER]: 'ordinal',
        [FieldType.CHECKBOX]: 'nominal',
        [FieldType.COUNT]: 'quantitative',
        [FieldType.CREATED_BY]: 'nominal',
        [FieldType.CREATED_TIME]: 'temporal',
        [FieldType.CURRENCY]: 'quantitative',
        [FieldType.DATE]: 'temporal',
        [FieldType.DATE_TIME]: 'temporal',
        [FieldType.DURATION]: null,
        [FieldType.EMAIL]: 'nominal',
        [FieldType.LAST_MODIFIED_BY]: 'nominal',
        [FieldType.LAST_MODIFIED_TIME]: 'temporal',
        [FieldType.MULTILINE_TEXT]: 'nominal',
        [FieldType.NUMBER]: 'quantitative',
        [FieldType.PERCENT]: 'quantitative',
        [FieldType.PHONE_NUMBER]: 'nominal',
        [FieldType.RATING]: 'quantitative',
        [FieldType.RICH_TEXT]: 'nominal',
        [FieldType.SINGLE_COLLABORATOR]: 'nominal',
        [FieldType.SINGLE_LINE_TEXT]: 'nominal',
        [FieldType.URL]: 'nominal',
    }[field.type] ?? null;
}

export function transformRecord(record: Record, fields: IMutField[]): IRow {
    const row: IRow = {};

    for (const { fid, semanticType } of fields) {
        const content = record.getCellValueAsString(fid);
        if (semanticType === 'quantitative') {
            row[fid] = Number(content);
        } else {
            row[fid] = content;
        }
    }

    return row;
}
