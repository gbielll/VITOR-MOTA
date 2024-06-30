import React, { useState, useEffect } from "react";
import {FaCheck, FaBan} from "react-icons/fa";
import "./styles.css"
import { useNoteList } from "../../context/NoteListContext";
import { useNoteForm } from "../../context/NoteFormContext";
import { useHighlight } from "../../context/HighlightContext";

export default function NoteForm(){
    
    const {noteList,setNoteList} =useNoteList();
    const {visibleForm,setVisibleForm,title,setTitle,description,setDescription,falha,setFalha,etapa,setEtapa} =useNoteForm();
    const {highlight,setHighlight} = useHighlight();
    
    // isso é apenas para chamar a  function saveLocalNotes() 
    useEffect(()=>{
      saveLocalNotes() 
    },[noteList]) //ouseja, esse array vai ta com um valor (toda vez q for atualizada ou insediro um dados), com isso vai acessar a função a cima, caso estaja null n aconetce nada


    function titleHandler(e){
        setTitle(e.target.value) //pegando o valor do digitado no input
    }

    function descriptionHander(e){
        setDescription(e.target.value) //pegando o valor do digitado no input
    }
    function falhaHander(e){
       setFalha(e.target.value)
    }
    
    function etapaHandler(e) {
        const value = parseInt(e.target.value); // Converter o valor para inteiro
        if (value >= 1 && value <= 4) {
            setEtapa(value); // Atualizar o estado apenas se for uma etapa válida (entre 1 e 4)
        } else {
            console.log("Informe uma etapa válida"); // Exibir mensagem de erro no console
        }
    }

    function submitHander(e){
        e.preventDefault(); //ajuda a nao recarregar a pagina
         
        
        //EDITAR atualizar os dados, se houver highlight
        if(highlight){
            noteList.map((note)=>{ //pecorre o array de notas, PODERIA FAZER COM O FIND E RETORNAR ALGO TB
                if(note.id === highlight){ //pega apenas com o id e muda os dados
                    note.title = title; //recebe o title que estou digitando atual
                    note.description = description;
                    note.falha = falha;
                    note.etapa = etapa;
                }
            })

            setNoteList([...noteList]); //aqui sempre vai atualizando as modificações no array do note. NAO ESQUEÇA DISSO!!

        }else{ // se n houver um highlight ele cria um novo
            setNoteList([
                ...noteList, //sprat (...) - armazena os valores em sequencia sem uma substituir a outrae em { fica os novos obj } nas notas anteriores
                {
                    id:String(Math.floor(Math.random()*1000)), //gerar um valor, arrendodar para baixo e salvar com string 
                    title: title, //mando o title - value
                    description: description, //mando a description
                    falha : falha,
                    etapa : etapa
                }
            ]);
        }
         

    }

    function cancelHandler(e){ //o e serve para nao recarregar a pagina
        e.preventDefault();
        setHighlight(false) //isso ajuda pq se eu fecho (aberto atrves do clicle de uma nota), ele tb tira o highlith da nota
        setVisibleForm(false);

    }

    //salvar os dados no localhost (ele cria um aruqivo em json la no local host), pois quando regarrega a tela todos somem e nao queremos isso
    //essa funcção é chamada la em cima
    function saveLocalNotes(){
        localStorage.setItem("notes",JSON.stringify(noteList)) //salvar nossas notas no localHost e cria um parametro com elas para q possa ser acessada
        //USO O SETITEM(NOME DO PARAMETRO) crio um json e trasnformo o obj(noteList -array) em stringjson (ou seja, trasnformo esse arrey de notas em string json)
       //esses "notes" é o parametro que posso acesar em outro componente e esse paramentro recebe essa straing de json
    }

    return(
        <form className="note-menu">
            <div>
                <label htmlFor="title">Nome do material</label>
                <input id="title" type="text" placeholder="Informe título"
                   value ={title} // valor atual do campo de entrada
                   onChange={titleHandler}
                />    
            </div>
            <div>
                <label htmlFor="note">Descrição do material</label>
                <textarea id="note" rows="5" type="text" placeholder="Informe sua nota"
                  value={description}
                  onChange={descriptionHander}

                /> {/*mesma coisa que o input, so que aquele grandao, q dou o tamanho no rows*/}
            </div>

            <div>
                <label htmlFor="falha">Informe se houve falha</label>
                <input id="falha" rows="5" type="text" placeholder="Informe as falhas"
                 value={falha}
                 onChange={falhaHander}
                />


            </div>


            <div>

               <label htmlFor="falha">
                 Etapa 1 - Recebimento<br />
                 Etapa 2 - Lavagem<br />
                 Etapa 3 - Preparo<br />
                 Etapa 4 - Distribuição
               </label>

               <input
                id="etapa"
                type="number" // Usar type="number" para restringir a entrada a números
                placeholder="Informe o número da etapa"
                value={etapa}
                onChange={etapaHandler}
               />


            </div>


            <div className="buttons">
                <button className="cancel" onClick={cancelHandler}>
                    <FaBan className="icon"/>
                </button>
                <button type="submit" className="confirm" onClick={submitHander}> {/*quando clicado, deve enviar (submeter) os dados do formulário para o servidor. Esse atributo pode ser usado explicitamente ou pode ser inferido pelo tipo do botão.*/}
                    <FaCheck className="icon"/>
                </button>
            </div>

            <p>Gráfico a baixo</p>
        </form>

    )
}