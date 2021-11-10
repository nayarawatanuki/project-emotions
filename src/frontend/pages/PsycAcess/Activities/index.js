import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import GlobalStyle from '../../../global/styles';
import { App, Container, Content, Table } from './styles';

import api from '../../../services/api';
import { useKidContext } from '../../../context/kidContext';
import ActivityList from '../../../components/PsycAcess/ActivityList';

function TasksKid() {

    const [list, setList] = useState([]);
    const {kid_id, kid_name, kid_photo} = useKidContext();

    console.log({kid_id, kid_name})

    useEffect(() => {
        console.log('entrou')
        if(kid_id && kid_name){
        api.get(`/tasks/${kid_id}/${kid_name}/listTasks`)
        .then((response) => {
            console.log({activity: response.data})
            setList(response.data)
        }).catch((error) => {
            console.error('error', error)
        });}
    },[kid_id, kid_name]);

    const [result, setResult] = useState([]);
  
    useEffect(() => {
        if(kid_id){
        api.get(`/tasks/${kid_id}/listTaskResult`)
        .then((response) => {
        console.log({results: response.data});
        setResult(response.data);
        }).catch((error) => {
            console.error('error', error) 
        });}
    }, [kid_id]);

    async function updateActivity({id, name, type, emotion}){ 

        if(name !== "" && type !== "" && emotion !== ""){
            await api.put(`/updatedTask/${id}`,
              { name, type, emotion }
            )
            .then(response => {
                console.log(response);
                console.log(JSON.stringify({
                    "tratamento": name,
                    "codigo": type,
                    "nome": emotion
                }));
                console.log("Atividade atualizada!");
                window.alert('Atividade atualizada!');
                document.getElementById("rows").style.backgroundColor = "#fff";
            });
        }else{
            window.alert('Prencha todos os campos')
        }
    }

    async function deleteActivity(id){
        console.log("id delete", id);

        await api.delete(`/deletedTask/${id}`)
        .then((response) => {
            console.log(response.data);
            window.alert("Atividade apagada!");

            const newList = list.filter((activity) => activity.id !== id);
            setList(newList);
        })
        .catch((error)=>{
            console.log(error);
        });
    }
  
    return (
        <App>
            <nav className="navbar navbar-light bg-light">
                <Link to="/Kids">
                    <button type="button" className="button button-info">Voltar</button>
                </Link>
                <h5 className="navbar-brand float-center">Atividades</h5>
                <h1> </h1>
            </nav>
            <Container>
                <Content>
                    <form encType='multipar/form-data' fit-content="true">
                        <div className="chip">
                            <img src={kid_photo} alt="Person" />
                            {kid_name}
                        </div>
                        <Link to="/addActivity">
                            <button type="submit" className="btn btn-outline-info d-inline-block" width="auto">
                                <i className="fas fa-plus"></i>
                            </button>
                        </Link>

                        <Table className= "table table-responsive table-selectable" >
                            <thead>
                                <tr>
                                    <th>imagem</th>
                                    <th>nome</th>
                                    <th>emoção</th>
                                    <th>status</th>
                                    <th>opções de resposta</th>
                                    <th>resultado</th>
                                    <th> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((activity, index) => {
                                    return (
                                        <ActivityList key={activity.id}
                                            activity={activity}
                                            result = {result[index]} 
                                            updateActivity={updateActivity} 
                                            deleteActivity={deleteActivity} 
                                        />
                                    );
                                })}
                            </tbody>
                        </Table>
                    </form>
                </Content>
                <GlobalStyle />
            </Container>
        </App>  
    );
}

export default TasksKid;