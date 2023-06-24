import React, { useState } from 'react';
import { Modal, Button, Dialog } from '@mui/material';
import Mapa from '../images/Mapa.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const MapaModal = () => {
    const [open, setOpen] = useState(false);
    const [coordenadas, setCoordenadas] = useState({ x: null, y: null });

    const handleAbrirModal = () => {
        setOpen(true);
    };

    const handleFecharModal = () => {
        setOpen(false);
    };

    const handleImagemClick = (event) => {
        const imageElement = event.target;
        const imageRect = imageElement.getBoundingClientRect();
        const offsetX = (event.clientX - imageRect.left) / imageRect.width;
        const offsetY = (event.clientY - imageRect.top) / imageRect.height;
        setCoordenadas({ x: offsetX, y: offsetY });
    };

    const handleSalvar = () => {
        console.log('Coordenadas:', coordenadas);
        handleFecharModal();
    };

    return (
        <div>
            <Dialog open={open} onClose={handleFecharModal} maxWidth={false}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        background: '#ffffff',
                    }}
                >
                    <div style={{ position: 'relative' }}>
                        <img
                            src={Mapa}
                            alt="Mapa da Fábrica"
                            onClick={handleImagemClick}
                            style={{ maxWidth: 900, height: 'auto', cursor: 'crosshair' }}
                        />
                        {coordenadas.x && coordenadas.y && (
                            <div
                                style={{
                                    position: 'absolute',
                                    left: coordenadas.x * 100 + '%',
                                    top: coordenadas.y * 100 + '%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <LocationOnIcon sx={{ color: '#1E90FF', fontSize: '24px' }} />
                            </div>
                        )}
                        <div style={{ position: 'absolute', bottom: '10px', display: 'flex', gap: '10px' }}>
                            <Button variant="contained" onClick={handleSalvar}>Salvar</Button>
                            <Button variant="contained" onClick={handleFecharModal}>Cancelar</Button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default MapaModal;
