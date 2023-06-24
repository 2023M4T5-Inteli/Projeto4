import { useEffect, useState } from 'react'
import { ResponsivePie } from '@nivo/pie'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsivePie = ({ esps }) => {
    // const [colaboradores, setColaboradores] = useState([])
    // const [historico, setHistorico] = useState([])
    // const [nulls, setNulls] = useState('')
    // const [tabletsAtivos, setTabletsAtivos] = useState('')
    // const [dados, setDados] = useState([])

    let nulls = 0;
    let tabletsAtivos = 0;

    esps.forEach((esp) => {
        if (!esp.lastHistoric) {
            nulls++;
        } else {
            if (!esp.lastHistoric.online) {
                nulls++
            } else {
                tabletsAtivos++
            }
        }
    })

    const dados = [
        {
            "id": "tablets inativos",
            "label": "tablets inativos",
            "value": nulls,
            "color": "hsl(261, 70%, 50%)"
        },
        {
            "id": "tablets ativos",
            "label": "tablets ativos",
            "value": tabletsAtivos,
            "color": "#ff0000"
        },
    ];
    // useEffect(() => {
    //     fetch("https://sfqlqf-3000.csb.app/v1/esps")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setHistorico(data)
    //         })
    //         .catch((err) => {
    //             console.log(err.message)
    //         })
    // }, [])

    // useEffect(() => {


    // }, [historico]);

    const customColors = {
        "tablets inativos": "#ff0000"
    };

    return (
        <ResponsivePie
            data={dados}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={({ id }) => customColors[id] || "hsl(109, 70%, 50%)"}
            borderWidth={1}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.2
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        2
                    ]
                ]
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'ruby'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'c'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'go'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'python'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'scala'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'lisp'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'elixir'
                    },
                    id: 'lines'
                },
                {
                    match: {
                        id: 'javascript'
                    },
                    id: 'lines'
                }
            ]}
            legends={[
                {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]
                }
            ]}
        />
    )
}

export default MyResponsivePie