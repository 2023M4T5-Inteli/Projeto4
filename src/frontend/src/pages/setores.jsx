import React, { useEffect, useState } from 'react';
import ModalCriarSetor from '../components/setor/modalCreate';
import ModalDeleteSetor from '../components/setor/modalDelete';
import CustomModalEdit from '../components/setor/modalEdit';
import TableSetor from '../components/setor/tableSetor';
import SearchBar from '../components/setor/searchbar';
import LoadingEarth from '../pages/loadingPage';
import { deleteSetor, getSetores, getSetoresWithEsps, postSetor, putSetor } from '../services/Setores';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const Setores = () => {
  const [setores, setSetores] = useState([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [setorToUpdate, setSetorToUpdate] = useState({});
  const [setorToDelete, setSetorToDelete] = useState({});
  const [filter, updateFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const setores = await getSetoresWithEsps(filter);
      setSetores(setores);
      setIsLoading(false);
    })()
  }, [filter, lastRefresh]);

  const handleClickEdit = (params) => {
    setSetorToUpdate(setores.find(setor => setor._id == params.id));
    setShowUpdateModal(true);
  }

  const handleDelete = async (id) => {
    setShowDeleteModal(false);
    setIsLoading(true);
    deleteSetor(id);
    setSetores(await getSetoresWithEsps(filter));
    setIsLoading(false);
  }

  const handleClickDelete = async (params) => {
    setSetorToDelete(setores.find(setor => setor._id == params.id));
    setShowDeleteModal(true);
  }

  const handleClickCreate = async (params) => {
    setShowCreateModal(true);
  }

  const handleClick = (params) => {
    navigate(`/sectorTablets/${params.id}`);
  }

  const handleCreateSetor = async (setor) => {
    setShowCreateModal(false);
    setIsLoading(true);
    await postSetor({
      name: setor.name,
      mapX: setor.mapX,
      mapY: setor.mapY
    });
    setSetores(await getSetoresWithEsps(filter));
    setIsLoading(false);
  }

  const handleUpdateSetor = async (setor) => {
    setShowUpdateModal(false);
    setIsLoading(true);
    await putSetor(setor._id, setor);
    setSetores(await getSetoresWithEsps(filter));
    setIsLoading(false);
  }

  return (
    <>
      <div style={{ paddingX: 110 }}>
        <h1>Setores</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: 110, alignItems: 'center', minHeight: '10vh' }} >
        {showCreateModal ? <ModalCriarSetor setores={setores} handleCreate={handleCreateSetor} handleClose={() => { setShowCreateModal(false) }} /> : (
          <Button variant="outlined" onClick={handleClickCreate} sx={{ width: 100 }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
              <AddIcon></AddIcon>
              CRIAR
            </div>
          </Button>
        )}
        {showUpdateModal ? <CustomModalEdit setores={setores} setorToUpdate={setorToUpdate} handleUpdate={handleUpdateSetor} handleClose={() => { setShowUpdateModal(false) }} /> : null}
        {showDeleteModal ? <ModalDeleteSetor handleClose={() => setShowDeleteModal(false)} handleDelete={handleDelete} setor={setorToDelete} /> : null}
        <SearchBar updateFilter={updateFilter} type="roteador" />
      </div>
      {isLoading ? <LoadingEarth /> : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '97%' }} >
          <TableSetor setores={setores} handleEdit={handleClickEdit} handleClick={handleClick} handleDelete={handleClickDelete} />
        </div>
      )}
    </>
  )
}

export default Setores;
