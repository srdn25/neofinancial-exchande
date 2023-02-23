import * as React from 'react';
import { Label, Table } from 'semantic-ui-react';
import { IResponseGetFindExchangeRate } from '../redux/features/currencyExchangeRateAPI';

export default function ExchangeTable(props: { data: IResponseGetFindExchangeRate[] }) {
    return (
        <div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Rate</Table.HeaderCell>
                        <Table.HeaderCell>Exchange Flow</Table.HeaderCell>
                        <Table.HeaderCell>Countries</Table.HeaderCell>
                        <Table.HeaderCell>Amount from 100$</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {props.data.map((row, index) => (
                        <Table.Row>
                            <Table.Cell>{index === 0 ? <Label ribbon>{row.rate}</Label> : row.rate}</Table.Cell>
                            <Table.Cell>{row.code}</Table.Cell>
                            <Table.Cell>{row.countries}</Table.Cell>
                            <Table.Cell>{row.amount}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}