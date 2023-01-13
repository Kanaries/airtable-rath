import React from 'react';
import styled from 'styled-components';
import { initializeBlock } from '@airtable/blocks/ui';
import Header from './components/header';
import GW from './components/gw';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

function AirtableRath() {
    return (
        <Container>
            <Header />
            <GW />
        </Container>
    );
}

initializeBlock(() => <AirtableRath />);
