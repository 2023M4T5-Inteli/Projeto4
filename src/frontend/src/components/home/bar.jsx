// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar
import { React, useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar'


// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveBar = ({ isAI, sectors }) => {
    // const [barData, setBarData] = useState([]);
    console.log("sectors")
    console.log(sectors)
    const barData = sectors.map((item) => ({
        "setor": item.name,
        "tablets": isAI ? item.iaEsps.length : item.esps.length,
        "tablets color": "hsl(338, 70%, 50%)"
    }));

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('https://sfqlqf-3000.csb.app/v1/sectors/esps');
    //             const dataFromBackend = await response.json();

    //             const newData = dataFromBackend.map((item) => ({
    //                 "setor": item.name,
    //                 "tablets": item.esps.length,
    //                 "tablets color": "hsl(338, 70%, 50%)"
    //             }));

    //             setBarData(newData);
    //         } catch (error) {
    //             console.error('Erro ao obter os dados do backend:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    return (

        <ResponsiveBar
            data={barData}
            keys={['tablets']}
            indexBy="setor"
            layout="horizontal"
            margin={{ top: 50, right: 130, bottom: 50, left: 100 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            // defs={[
            //     {
            //         id: 'dots',
            //         type: 'patternDots',
            //         background: 'inherit',
            //         color: '#38bcb2',
            //         size: 4,
            //         padding: 1,
            //         stagger: true
            //     },
            //     {
            //         id: 'lines',
            //         type: 'patternLines',
            //         background: 'inherit',
            //         color: '#eed312',
            //         rotation: -45,
            //         lineWidth: 6,
            //         spacing: 10
            //     }
            // ]}
            // fill={[
            //     {
            //         match: {
            //             id: 'fries'
            //         },
            //         id: 'dots'
            //     },
            //     {
            //         match: {
            //             id: 'sandwich'
            //         },
            //         id: 'lines'
            //     }
            // ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickValues: [],
                legend: 'N° de Tablets',
                legendPosition: 'middle',
                legendOffset: 12
            }}
            axisLeft={{
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                // legend: 'Setores',
                legendPosition: 'middle',
                legendOffset: -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
        />
    )
};

export default MyResponsiveBar;